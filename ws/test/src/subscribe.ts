import {Client} from "core";
import {Transaction} from "xrpl/dist/npm/models/transactions";
import {ResponseOnlyTxInfo} from "xrpl/dist/npm/models/common";
import {
    ConsensusStream,
    LedgerStream, TransactionStream,
    ValidationStream
} from "xrpl/dist/npm/models/methods";

async function subscribe() {
    const client = new Client();
    client.eventEmitter.on("connection",(connected:boolean)=>{
        console.log(`connected: ${connected}`);
    });
    await client.connect();
    client.client.on('transaction', (txStream:TransactionStream) => {
        console.log(`transaction event`,txStream);
    });
    client.client.on('ledgerClosed', (ledger: LedgerStream) => {
        console.log(`ledgerClosed event`,ledger);
    });
    client.client.on('validationReceived', (validation: ValidationStream) => {
        console.log(`validationReceived event`,validation);
    });
    client.client.on('consensusPhase', (phase: ConsensusStream) => {
        console.log(`consensusPhase event`,phase);
    });
    await client.subscribe({
        streams: ["transactions","ledger","consensus","validations"]
    });
    setTimeout(()=>{
        client.subscribe({
            streams: ["transactions","ledger","consensus","validations"]
        },true);
        setTimeout(()=>{
            client.close();
        },3000);
    },3000);
}
export {subscribe};