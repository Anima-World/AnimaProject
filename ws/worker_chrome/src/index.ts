import {Worker} from "worker";
import MessageSender = chrome.runtime.MessageSender;
import fix from './ChromeFix';
import {delay} from "utils";
class ChromeWorker extends Worker {
    override async clear() {
        console.log('clear data');
        await chrome.storage.local.clear();
        await this.loadClientData();
    }
    override async load(...keys:string[]):Promise<any> {
        console.log(`try to load: [${keys.join()}]`);
        if(!chrome?.storage) {
            console.log('chrome storage not exists');
            return {};
        }
        const res = await Promise.race([
            delay(1000),
            new Promise(resolve => {
                chrome.storage.local.get(keys, (result:any) => {
                    console.log(`loaded: [${keys.join()}]`);
                    resolve(result)
                });
            })
        ]);
        return res||{};
    }
    override async save(key:string="settings",value:any=this.data.settings) {
        console.log('save data',{key,value});
        if(!chrome?.storage) {
            console.log('chrome storage not exists');
            return;
        }
        const data:any={};
        data[key]=value;
        chrome.storage.local.set(data, function() {
            console.log(`saved [${key}]`);
        });
    }
    async tick() {
        try {
            await this.updateTempData();
            await chrome.action.setPopup({popup: "./index.html#"+JSON.stringify({
                    settings:this.data.settings,
                    wallets:this.data.wallets,
                    tokens:this.tempData.tokens,
                    accountInfo:this.tempData.accountInfo
                })});
        } catch (e) {
            console.error('tick error',e);
        }
    }
    private async updateTempData() {
        // if(
        //     !this.client.client?.isConnected() ||
        //     !this.data.settings.wallet
        // ) return;
        // const newAddress = this.tempData.address!=this.data.settings.wallet;
        // const address = this.data.settings.wallet;
        // const expired = (data?:{lastUpdate:number},timeout=3000):boolean => {
        //     const now = Date.now();
        //     return !data || newAddress || ( now - data.lastUpdate > timeout );
        // }
        // if(expired(this.tempData.accountInfo)) {
        //     const accountData = (await this.client.getAccountInfo(address))?.result?.account_data;
        //     this.tempData.accountInfo = {
        //         data:{
        //             name: this.data.wallets[address].name,
        //             balance:dropsToXrp(accountData?.Balance||0),
        //             blocked:accountData.OwnerCount*2+10
        //         },
        //         lastUpdate:Date.now()
        //     };
        // }
        // if(expired(this.tempData.tokens)) {
        //     this.tempData.tokens = {
        //         data:await this.client.getAllTrustLines(address),
        //         lastUpdate:Date.now()
        //     };
        // }
        // if(newAddress) this.tempData.address=address;
    }

    override notification(title:string,message:string) {
        if(!chrome?.notifications) {
            console.log('chrome notifications not exists');
            return;
        }
        chrome.notifications.create(`ID${Math.random()}`, {
            type: "basic",
            iconUrl: "/icon.png",
            title,
            message,
            priority: 2
        });
    }
}
(async ()=>{
    const worker = new ChromeWorker();
    worker.client.eventEmitter.on("connection",(connected)=>{
        console.log("connected:",connected);
    });
    chrome.runtime.onMessage.addListener((message:{channel:string,data:any}, sender, sendResponse) => {
        console.log('data from front',{message,sender});
        handle(message,sender,sendResponse);
        return true;
    });
    await worker.start();
    async function handle(message:{channel:string,data:any}, sender:MessageSender, sendResponse:any) {
        if(worker.handlers[message.channel]) {
            const result = await worker.handlers[message.channel](message.data);
            console.log(`${message.channel} handler result`,result);
            sendResponse(result);
        } else {
            sendResponse({error: "wrong handler"});
        }
    }
})();

fix();