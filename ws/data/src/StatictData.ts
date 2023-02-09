import {Servers, Settings, TextData} from "./Types";

const servers:Servers = {
    "wss://xrpl.ws/":{
        name: "XRP Ledger Foundation",
        notes: "Mainnet",
        url: "wss://xrpl.ws/"
    },
    "wss://s2.ripple.com/":{
        name: "Ripple",
        notes: "Mainnet",
        url: "wss://s2.ripple.com/"
    },
    "wss://s.altnet.rippletest.net/":{
        name: "Ripple",
        notes: "Testnet",
        url: "wss://s.altnet.rippletest.net/"
    },
    "wss://s.devnet.rippletest.net/":{
        name: "Ripple",
        notes: "Devnet",
        url: "wss://s.devnet.rippletest.net/"
    }
}
const text:TextData = {
    wallet: {
        'en':'Wallet',
        'ru':'Кошелёк'
    }
}
const defaultSettings:Settings = {
    wallet:"",
    lang:"en",
    //server: "wss://xrpl.ws/"
    server: "wss://s.altnet.rippletest.net/"
}
const delay = (ms:number=100) => new Promise(resolve => setTimeout(resolve,ms));
export {text,servers,defaultSettings,delay}