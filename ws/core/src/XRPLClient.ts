import {EventEmitter} from "./EventEmitter";
import * as xrpl from "xrpl";
import {SubsData, TrustLine, delay} from "utils";
import {
    AccountCurrenciesResponse,
    AccountInfoResponse,
    AccountNFTsResponse,
    AccountOffersResponse,
    Payment,
    SubmitResponse
} from "xrpl";
import {Transaction} from "xrpl/dist/npm/models/transactions";

export default class {
    public eventEmitter = new EventEmitter();
    public server?:string;
    public client?:xrpl.Client;
    private enabled = false;
    private loopPromise?:Promise<any>;
    private async loop() {
        if(this.loopPromise)
            return;
        while (true) {
            await delay();
            if(!this.enabled)
                break;
            try {
                if(!this.client?.isConnected()) {
                    console.log("reconnect")
                    await this.connect(this.server);
                }
            } catch (e) {
                console.error(`core loop reconnect error`,e);
            }
            this.eventEmitter.emit("tick");
        }
    }
    async connect(server:string="wss://s2.ripple.com/") {
        this.enabled=true;
        this.server=server;
        if(this.client)
            await this.disconnect();
        try {
            this.client = new xrpl.Client(this.server);
            this.client.on("disconnected", async (code) => {
                console.log(`client disconnected with code: ${code}`);
                this.eventEmitter.emit("connection", false);
            });
            await this.client.connect();
            this.eventEmitter.emit("connection", true);
        } catch (e) {
            console.error()
        }
        this.loop();
    }
    private async disconnect(){
        if(this.client?.isConnected())
            await this.client.disconnect();
        this.eventEmitter.emit("connection",false);
    }
    async close(){
        this.enabled=false;
        await this.disconnect();
    }
    //https://xrpl.org/subscription-methods.html
    //todo reconnect -> resubscribe?
    async subscribe(data:SubsData={},unsubscribe:boolean=false) {
        console.log(unsubscribe?"unsubscribe":"subscribe",data);
        const request = {
            "command": unsubscribe?"unsubscribe":"subscribe",
            ...data
        }
        if(Object.keys(data).length==0) request.streams=["transactions"];
        await this.request(request);
    }
    async request(request:any):Promise<any> {
        if(!this.client || !this.client.isConnected())
            throw "client is not connected";//todo requests queue & waiting for connection
        return await this.client.request(request);
    }
    async prepareTx<T extends Transaction>(transaction:T):Promise<T> {
        console.log("prepare transaction",transaction);
        if(!this.client || !this.client.isConnected())
            throw "client is not connected";
        return await this.client.autofill(transaction);
    }
    async payment(payment:Payment,wallet:xrpl.Wallet):Promise<SubmitResponse> {
        console.log("payment",payment);
        if(!this.client || !this.client.isConnected())
            throw "client is not connected";
        return await this.client.submit(payment,{wallet});
    }
    async getAllTrustLines(issuer:string, limit:number|undefined=undefined):Promise<TrustLine[]> {
        let result:any = [];
        let PlaceMarker=undefined;
        while (true) {
            try {
                console.log(`loaded lines: ${result.length}`);
                let data:any = await this.getTrustLines(issuer,PlaceMarker);
                result.push(...data.result);
                if(!data.pm || (limit && result.length>=limit))
                    break;
                PlaceMarker=data.pm;
            } catch (e) {
                console.error(`error: ${issuer}`,e);
                break;
            }
        }
        return result;
    }
    async getTrustLines(issuer:string, PlaceMarker:number|undefined=undefined):Promise<any> {
        let req_data:any  = {
            "command": "account_lines",
            "account": issuer,
            "limit": 400
        }
        if(PlaceMarker)
            req_data.marker= PlaceMarker;
        let trustlines = await this.request(req_data);
        return {result:trustlines.result.lines,pm:trustlines.result.marker};
    }
    async getTxHistory(address:string, marker:number|undefined=undefined):Promise<any> {
        let req_data:any = {
            "command": "account_tx",
            "account": address,
            "binary": false,
            "forward": true,
            "ledger_index_max": -1,
            "ledger_index_min": -1,
            "limit": 100
        }
        if(marker)
            req_data.marker = marker;
        const transactions = await this.request(req_data);
        return {result:transactions.result.transactions,pm:transactions.result.marker};
    }
    async getCurrencies(address:string):Promise<AccountCurrenciesResponse> {
        return await this.request({
            "command": "account_currencies",
            "account": address,
            "ledger_index": "validated"
        });
    }
    async getAccountInfo(address:string):Promise<AccountInfoResponse> {
        try {
            return await this.request({
                "command": "account_info",
                "account": address,
                "ledger_index": "validated"
            });
        } catch (e) {
            return null;
        }
    }
    async getOffers(address:string):Promise<AccountOffersResponse> {
        return await this.request({
            "command": "account_offers",
            "account": address
        });
    }
    async getNFT(address:string):Promise<AccountNFTsResponse> {
        return await this.request({
            "command": "account_nfts",
            "account": address
        });
    }
    async fund(wallet:xrpl.Wallet):Promise<any> {
        return await this.client.fundWallet(wallet);
    }
}