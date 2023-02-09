/// <reference types="chrome"/>
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import {FrontEventEmitter} from "@/EventEmitter";
import type { Settings, Wallet} from "data";
import * as domain from "domain";

const delay = (ms:number=100) => new Promise(resolve => setTimeout(resolve,ms));
const data = {
    async send(channel:string,data:any) {
        console.log(`[front] send to ${channel}:`,data);
        return new Promise((resolve,reject) => {
            let to = setTimeout(()=>{
                console.error('send timeout',{channel,data});
                reject("timeout");
            },10000);
            try {
                chrome.runtime.sendMessage({channel,data}, (response) => {
                    console.log(`[front] ${channel} response`,response);
                    clearTimeout(to);
                    resolve(response);
                });
            } catch (e) {
                reject(e);
                console.error("send to worker error",e);
            }
        })
    }
}
const clientData:{
    settings?:Settings,
    wallets?:{[key:string]:Wallet},
    tokens?:any[],
    accountInfo?:{
        name:string,
        balance:number|string,
        blocked:number
    }
} = {}
try {
    const hashData = JSON.parse(location.hash);
    clientData.settings=hashData.settings;
    clientData.wallets=hashData.wallets;
    clientData.tokens=hashData.tokens;
    clientData.accountInfo=hashData.accountInfo;
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

