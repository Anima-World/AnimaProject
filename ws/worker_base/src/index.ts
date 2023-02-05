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
    constructor() {
        this.client = new XRPLClient();
    }
    async start() {
        await this.loadClientData();
        await this.client.connect(this.data.settings.server);
        this.notification("Wallet","worker started");
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
    notification(title:string,message:string) {
        console.log('notification');
    }
}
export {Worker};