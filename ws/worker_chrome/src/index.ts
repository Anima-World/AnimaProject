import {Worker} from "worker_base";
import {servers, walletFromMnemonic, walletFromNumbers, Settings, defaultSettings} from "data";
import {delay} from "data";
import {dropsToXrp, Payment, Wallet, xrpToDrops} from "xrpl";
import MessageSender = chrome.runtime.MessageSender;
class ChromeWorker extends Worker {
    override handlers:{[key:string]:(data:any)=>Promise<any>} = {
        // запрос импорта кошелька
        saveWallet: async (data:{type:string,data:string,name:string}) => {
            console.log('saveWallet',data);
            try {
                let wallet;
                switch (data.type) {
                    case "seed": {
                        wallet = Wallet.fromSeed(data.data);
                        break;
                    }
                    case "mnemonic": {
                        wallet = walletFromMnemonic(data.data);
                        break;
                    }
                    case "numbers": {
                        wallet = walletFromNumbers(data.data);
                        break;
                    }
                    default:
                        return false;
                }
                this.data.wallets[wallet.address]={
                    name: data.name||"Imported wallet",
                    seed: wallet.seed,
                    address: wallet.address
                }
                this.save("wallets",this.data.wallets);
                if(!this.data.settings.wallet) {
                    this.data.settings.wallet = wallet.address;
                    this.save();
                }
                return true;
            } catch (error) {
                console.error('save wallet error',{error,data});
            }
            return false;
        },
        sendTx: async (data:any):Promise<any|{result?:any,error?:any}> => {
            const payment = data.payment as Payment;
            const wallet = Wallet.fromSeed(this.data.wallets[data.wallet].address);
            console.log('sendTx',payment);
            try {
                return await this.client.payment(payment,wallet);
            } catch (error) {
                console.error('sendTx error',{error,data});
                return {error}
            }
        },
        isConnected: async ():Promise<boolean> => {
            console.log('isConnected');
            return this.client.client?.isConnected()
        },
        prepareTx: async (data:any) => {
            console.log('prepareTx',data);
            const payment = data.payment as Payment;
            try {
                return await this.client.prepareTx(payment);
            } catch (error) {
                console.error('prepareTx error',{error,data});
                return {error}
            }
        },
        getTxHistory: async (data:{address:string,marker?:any}) => {
            console.log('getTxHistory',data);
            try {
                return await this.client.getTxHistory(data.address,data.marker);
            } catch (error) {
                console.error('getTxHistory error',{error,data});
                return {error}
            }
        },
        getAccountInfo: async (data:{address:string}) => {
            console.log('getAccountInfo',data);
            if(!data) return this.tempData.accountInfo?.data;
            try {
                const res = (await this.client.getAccountInfo(data.address)).result?.account_data as any;
                if(res) res.balance=dropsToXrp(res.Balance);
                return res;
            } catch (error) {
                console.error('getAccountInfo error',{error,data});
                return {error}
            }
        },
        getTokens: async (data:{address:string}) => {
            console.log('getTokens',data);
            if(!data) return this.tempData.tokens?.data;
            try {
                return this.client.getAllTrustLines(data.address);
            } catch (error) {
                console.error('getTokens error',{error,data});
                return {error}
            }
        },
        getSettings: async () => {
            console.log('getSettings');
            return this.data.settings;
        },
        getWallets: async () => {
            console.log('getWallets');
            return this.data.wallets;
        },
        fund: async () => {
            console.log('fundWallet');
            const wallet = Wallet.fromSeed(this.data.wallets[this.data.settings.wallet].seed);
            return this.client.fund(wallet);
        },
        updateSettings: async (data: { settings:Settings }) => {
            console.log('updateSettings',data);
            this.data.settings = data.settings;
            this.save("settings",data.settings);
        },
        clear: async () => {
            console.log('clear');
            this.clear();
        },
        generateWallet: async () => {
            console.log('generateWallet');
            return Wallet.generate();
        }
    }
    override async clear() {
        console.log('clear data');
        await chrome.storage.local.clear();
    }
    override async loadClientData() {
        console.log('[worker] load client data');
        const data = await this.load("settings","wallets","contacts");
        this.data={
            settings: data.settings||{},
            wallets: data.wallets||{},
            contacts: data.contacts||{},
            servers: servers
        }
        let needSave = false;
        for(let key of Object.keys(defaultSettings)) {
            // @ts-ignore
            if(!this.data.settings[key]) {
                needSave=true
                // @ts-ignore
                this.data.settings[key] = defaultSettings[key];
            }
        }
        if(needSave) this.save();
    }
    async load(...keys:string[]):Promise<any> {
        console.log(`[worker] try to load: [${keys.join()}]`);
        if(!chrome?.storage) {
            console.log('[worker] chrome storage not exists');
            return {};
        }
        const res = await Promise.race([
            delay(1000),
            new Promise(resolve => {
                chrome.storage.local.get(keys, (result:any) => {
                    console.log(`[worker] loaded: [${keys.join()}]`);
                    resolve(result)
                });
            })
        ]);
        return res||{};
    }
    override async save(key:string="settings",value:any=this.data.settings) {
        console.log('[worker] save data',{key,value});
        if(!chrome?.storage) {
            console.log('[worker] chrome storage not exists');
            return;
        }
        const data:any={};
        data[key]=value;
        chrome.storage.local.set(data, function() {
            console.log(`[worker] saved [${key}]`);
        });
    }
    public tempData: {
        address?:string,
        accountInfo?:{
            data:{
                name:string,
                balance:number|string,
                blocked:number
            },
            lastUpdate:number
        },
        tokens?:{
            data:any[],
            lastUpdate:number
        },
    } = {};
    async tick() {
        try {
            await this.updateTempData();
            await chrome.action.setPopup({popup: "./index.html#"+JSON.stringify({
                    settings:this.data.settings,
                    wallets:this.data.wallets,
                    tokens:this.tempData.tokens,
                    accountInfo:this.tempData.accountInfo
                })})
        } catch (e) {
            console.error('[worker] tick error',e);
        }
    }
    private async updateTempData() {
        if(
            !this.client.client?.isConnected() ||
            !this.data.settings.wallet
        ) return;
        const newAddress = this.tempData.address!=this.data.settings.wallet;
        const address = this.data.settings.wallet;
        const expired = (data?:{lastUpdate:number},timeout=3000):boolean => {
            const now = Date.now();
            return !data || newAddress || ( now - data.lastUpdate > timeout );
        }
        if(expired(this.tempData.accountInfo)) {
            const accountData = (await this.client.getAccountInfo(address))?.result?.account_data;
            this.tempData.accountInfo = {
                data:{
                    name: this.data.wallets[address].name,
                    balance:dropsToXrp(accountData?.Balance||0),
                    blocked:accountData.OwnerCount*2+10
                },
                lastUpdate:Date.now()
            };
        }
        if(expired(this.tempData.tokens)) {
            this.tempData.tokens = {
                data:await this.client.getAllTrustLines(address),
                lastUpdate:Date.now()
            };
        }
        if(newAddress) this.tempData.address=address;
    }

    override notification(title:string,message:string) {
        if(!chrome?.notifications) {
            console.log('[worker] chrome notifications not exists');
            return;
        }
        chrome.notifications.create(`ID${Math.random()}`, {
            type: "basic",
            iconUrl: "/icon64.png",
            title,
            message,
            priority: 2
        });
    }
}
(async ()=>{
    const worker = new ChromeWorker();
    worker.client.eventEmitter.on("connection",(connected)=>{
        console.log("[worker] connected:",connected);
    });
    chrome.runtime.onMessage.addListener((message:{channel:string,data:any}, sender, sendResponse) => {
        console.log('[worker] data from front',{message,sender});
        handle(message,sender,sendResponse);
        return true;
    });
    await worker.start();
    async function handle(message:{channel:string,data:any}, sender:MessageSender, sendResponse:any) {
        if(worker.handlers[message.channel]) {
            const result = await worker.handlers[message.channel](message.data);
            console.log(`[worker] ${message.channel} handler result`,result);
            sendResponse(result);
        } else {
            sendResponse({error: "wrong handler"});
        }
    }
})();


//chrome v3 manifest fix
const onUpdate = (tabId:any, info:any, tab:any) => /^https?:/.test(info.url) && findTab([tab]);
findTab();
chrome.runtime.onConnect.addListener(port => {
    if (port.name === 'keepAlive') {
        setTimeout(() => port.disconnect(), 250e3);
        port.onDisconnect.addListener(() => findTab());
    }
});
async function findTab(tabs?:any) {
    if (chrome.runtime.lastError) { /* tab was closed before setTimeout ran */ }
    for (const {id: tabId} of tabs || await chrome.tabs.query({url: '*://*/*'})) {
        try {
            await chrome.scripting.executeScript({target: {tabId}, func: connect});
            chrome.tabs.onUpdated.removeListener(onUpdate);
            return;
        } catch (e) {}
    }
    chrome.tabs.onUpdated.addListener(onUpdate);
}
function connect() {
    chrome.runtime.connect({name: 'keepAlive'})
        .onDisconnect.addListener(connect);
}
