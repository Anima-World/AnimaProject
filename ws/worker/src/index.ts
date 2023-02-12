import {publicServers} from "data";
import {ClientData, Settings, TrustLine, WalletsUtils} from 'utils';
import {dropsToXrp, Payment, SubmitResponse, Wallet} from "xrpl";
import XRPLClient from "core/dist/XRPLClient";
import {AccountRoot} from "xrpl/dist/npm/models/ledger";
import {prefix} from "utils";
prefix("worker");

class Worker {
    public data:ClientData;
    public client:XRPLClient;
    public handlers:{[key:string]:(data?:any)=>Promise<{result?:any,error?:any}>} = {
        saveWallet: async (data:{data:string,name:string}):Promise<{result:boolean,error?:string}> => {
            console.debug('saveWallet',data);
            //todo validate wallet data
            const wallet = Wallet.fromSeed(data.data);
            console.debug('saveWallet wallet',wallet);
            this.data.wallets[wallet.classicAddress]={
                name: data.name||"Imported wallet",
                seed: wallet.seed,
                address: wallet.classicAddress
            }
            this.save("wallets",this.data.wallets);
            if(!this.data.settings.wallet) {
                this.data.settings.wallet = wallet.classicAddress;
                this.save();
            }
            return {result:true};
        },
        sendTx: async (data:{payment:Payment,wallet:string}):Promise<{result?:SubmitResponse,error?:string}> => {
            console.debug('sendTx',data);
            //todo validate payment
            const wallet = Wallet.fromSeed(this.data.wallets[data.wallet].seed);
            try {
                return {result:await this.client.payment(data.payment,wallet)};
            } catch (error) {
                console.error('sendTx error',{error,data});
                return {error};
            }
        },
        prepareTx: async (data:{payment:Payment}):Promise<{result?:Payment,error?:string}> => {
            console.debug('prepareTx',data);
            //todo validate payment
            try {
                return {result:await this.client.prepareTx(data.payment)};
            } catch (error) {
                console.error('prepareTx error',{error,data});
                return {error};
            }
        },
        getTxHistory: async (data:{address:string,pm:any}):Promise<{result?:{result:any[],pm?:any},error?:string}> => {
            console.debug('getTxHistory',data);
            try {
                return {result:await this.client.getTxHistory(data.address,data.pm)};
            } catch (error) {
                console.error('getTxHistory error',{error,data});
                return {error};
            }
        },
        fund: async ():Promise<{result?:any,error?:any}> => {
            console.debug('fundWallet');
            const wallet = Wallet.fromSeed(this.data.wallets[this.data.settings.wallet].seed);
            const fund = await this.client.fund(wallet);
            console.debug("fund result:",fund)
            return {result:fund};
        },
        getAccountInfo: async (data: { address:string }):Promise<{result?:{
                balance:number|string,
                blocked:number,
                fullInfo?:AccountRoot
            },error?:string}> => {
            console.log('getAccountInfo',data);
            try {
                if(!data) data = {address:this.data.settings.wallet};
                const accountData = this.tempData.accountInfo[data.address]?.accountData ||
                    (await this.client.getAccountInfo(data.address)).result?.account_data;
                //todo handle result errors
                return {result: {
                        fullInfo:accountData,
                        blocked:accountData?.OwnerCount,
                        balance:dropsToXrp(accountData?.Balance||0)
                }};
            } catch (error) {
                console.error('getAccountInfo error',{error,data});
                return {error};
            }
        },
        getTokens: async (data:{address:string}):Promise<{result?:TrustLine[],error?:string}> => {
            console.debug('getTokens',data);
            try {
                if(!data) data = {address:this.data.settings.wallet};
                const tokens = this.tempData.tokens[data.address]?.tokens ||
                    await this.client.getAllTrustLines(data.address);
                return {result:tokens};
            } catch (error) {
                console.error('getTokens error',{error,data});
                return {error};
            }
        },
        isConnected: async ():Promise<{result?:boolean}> => {
            console.debug('isConnected');
            return {result:this.client.client?.isConnected()};
        },
        getWallets: async ():Promise<{ result:WalletsUtils }> => {
            console.debug('getWallets');
            return { result: this.data.wallets }
        },
        getSettings: async ():Promise<{ result:Settings }> => {
            console.debug('getSettings');
            return { result: this.data.settings }
        },
        updateSettings: async (data: { settings:Settings }):Promise<any> => {
            console.debug('updateSettings',data);
            //todo validate settings
            this.data.settings = data.settings;
            this.save("settings",data.settings);
        },
        clear: async ():Promise<any> => {
            console.debug('clear');
            this.clear();
        }
    }
    public tempData: {
        accountInfo?:{ [address:string]: {
            accountData:AccountRoot,
            lastUpdate:number
        }},
        tokens?:{ [address:string]: {
                tokens:any[],
                lastUpdate:number
            }},
    } = {
        accountInfo:{},
        tokens:{}
    };
    constructor() {
        this.client = new XRPLClient();
    }
    async start() {
        await this.loadClientData();
        await this.client.connect(
            "wss://s2.ripple.com/",
            //todo this.data.settings.server
        );
        console.log("worker started");
        this.client.eventEmitter.on("tick",()=>{
            this.tick();
        });
    }
    async tick() {
        console.log('tick');
    }
    async loadClientData() {
        console.log('load client data');
        const data = await this.load("settings","wallets","contacts");
        this.data={
            settings: data.settings||{},
            wallets: data.wallets||{},
            contacts: data.contacts||{},
            servers:publicServers
        }
    }
    async save(key:string="settings",value:any=this.data.settings) {
        console.log('free save call',{key,value});
    }
    async load(...keys:string[]):Promise<any> {
        console.log(`free load call: [${keys.join()}]`);
    }
    async clear() {
        console.log('clear data');
        await this.loadClientData();
    }
    notification(title:string,message:string) {
        console.log('notification',{title,message});
    }
}
export {Worker};