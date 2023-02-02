interface ClientData {
    settings:Settings;
    wallets:{[key:string]:Wallet};
    contacts:{[key:string]:Contact};
    servers:Servers;
}
interface Wallet {
    seed:string;
    address:string;
    name:string;
    pinned?:boolean;
    data?:WalletData;
}
interface Contact {
    address:string;
    name:string;
    pinned?:boolean;
}
interface WalletData {
    tokens: { [key: string]: Token }
}
interface Token {
    name:string;
    address:string;
    balance:string;
}
interface Settings {
    wallet:string;
    lang:string;
    server:string;
}

interface TextData {
    [textCode:string]: {
        [langCode:string]:string;
    }
}
interface Server {
    url:string;
    name:string;
    notes:string;
}
interface Servers {
    [url:string]:Server;
}

export {TextData,Token,WalletData,Contact,Wallet,ClientData,Server,Servers}