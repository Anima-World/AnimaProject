import Client from "./XRPLClient";
const delay = (ms:number=100) => new Promise(resolve => setTimeout(resolve,ms));
export {Client,delay};