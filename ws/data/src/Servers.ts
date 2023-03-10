import {Servers} from "utils";

const publicServers:Servers = {
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
export {publicServers}