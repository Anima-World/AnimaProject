/// <reference types="chrome"/>
import { createApp } from 'vue';
import App from '@/App.vue';
import router from '@/router';
import data from "@/communication";
import {FrontEventEmitter} from "@/EventEmitter";
import type { Settings, Wallet } from "utils";
import type {AccountRoot} from "xrpl/dist/npm/models/ledger";
import {delay, prefix} from "utils";
prefix("front");

const clientData:{
    [key:string]:any,
    settings?:Settings,
    wallets?:{[key:string]:Wallet},
    tokens?:any[],
    accountInfo?:{
        name:string,
        balance:number|string,
        blocked:number,
        accountData?:AccountRoot
    }
} = {}
try {
    const hashData = JSON.parse(location.hash.slice(1));
    for(const key of Object.keys(hashData)) {
        clientData[key]=key;
    }
    if(hashData.path) router.push(hashData.path);
} catch (e) {
    console.log('parse error',e)
}

const app = createApp(App);
app.use(router);
app.config.globalProperties.open = (path:string) => {
    router.push(path)
}
app.config.globalProperties.worker = data;
app.config.globalProperties.delay = delay;
app.config.globalProperties.events = new FrontEventEmitter();
app.config.globalProperties.clientData = clientData;
app.mount('#app');

