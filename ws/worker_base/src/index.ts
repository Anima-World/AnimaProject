import {ClientData, servers} from "data";
import {Wallet} from "xrpl";
import XRPLClient from "core/dist/XRPLClient";
import {Events} from "core/dist/EventEmitter";
import {EventEmitter} from "events";

interface WorkerEvents extends Events {}
declare interface CoreEventEmitter {
    on<U extends keyof WorkerEvents>(
        event: U, listener: WorkerEvents[U]
    ): this;

    emit<U extends keyof WorkerEvents>(
        event: U, ...args: Parameters<WorkerEvents[U]>
    ): boolean;
}
class CoreEventEmitter extends EventEmitter {
    constructor() {super();}
}
export {CoreEventEmitter,Events};
class Worker {
    public data:ClientData;
    public client:XRPLClient;
    public handlers:{[key:string]:(data:any)=>Promise<any>} = {
        saveWallet: async (data:any):Promise<any> => {
            console.log('saveWallet',data);
        },
        sendTx: async (data:any):Promise<any> => {
            console.log('sendTx',data);
        },
        prepareTx: async (data:any):Promise<any> => {
            console.log('prepareTx',data);
        },
        getTxHistory: async (data:any):Promise<any> => {
            console.log('getTxHistory',data);
        },
        getAccountInfo: async (data:any):Promise<any> => {
            console.log('getAccountInfo',data);
        },
        getTokens: async (data:any):Promise<any> => {
            console.log('getTokens',data);
        },
        isConnected: async ():Promise<boolean> => {
            console.log('isConnected');
            return false;
        },
        getWallets: async (data:any):Promise<any> => {
            console.log('getWallets',data);
        },
        getSettings: async (data:any):Promise<any> => {
            console.log('getSettings',data);
        },
        updateSettings: async (data:any):Promise<any> => {
            console.log('updateSettings',data);
        },
        clear: async () => {
            console.log('clear');
        },
        generateWallet: async () => {
            console.log('generateWallet');
            return Wallet.generate();
        }
    }
    constructor() {
        this.client = new XRPLClient();
    }
    async start() {
        await this.loadClientData();
        await this.client.connect(this.data.settings.server);
        console.log("worker started");
        this.client.eventEmitter.on("tick",()=>{
            this.tick();
        });
    }
    async tick() {
        console.log('tick')
    }
    async loadClientData() {
        console.log('load client data');
        this.data={
            settings: {
                wallet:"",
                lang:"en",
                server:"wss://s.altnet.rippletest.net/"
            },
            wallets: {},
            contacts:{},
            servers:servers
        }
        const wallet = Wallet.generate();
        this.data.wallets[wallet.address]={
            seed:wallet.seed,
            address:wallet.address,
            name:"generated wallet"
        };
        this.data.settings.wallet=wallet.address;
    }
    async save(key:string="settings",value:any=this.data.settings) {
        console.log('save data',{key,value});
    }
    async clear() {
        console.log('clear data');
    }
    notification(title:string,message:string) {
        console.log('notification');
    }
}
export {Worker};