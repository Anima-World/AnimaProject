import {Worker} from "worker_base";
import {servers} from "data";
import {delay} from "core";
class ChromeWorker extends Worker {
    override async loadClientData() {
        console.log('load client data');
        const data = await this.load("settings","wallets","contacts","servers")
        this.data={
            settings: data.settings||{
                wallet:"",
                lang:"en",
                server:"wss://s.altnet.rippletest.net/"
            },
            wallets: data.wallets||{},
            contacts: data.contacts||{},
            servers: data.servers||servers
        }
    }
    async load(...keys:string[]):Promise<any> {
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
    override notification(title:string,message:string) {
        if(!chrome?.notifications) {
            console.log('chrome notifications not exists');
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
        console.log("connected:",connected);
    });
    await worker.start();
})();
