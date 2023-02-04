import {EventEmitter} from 'events';
import {Transaction} from "xrpl/dist/npm/models/transactions";
import {ResponseOnlyTxInfo} from "xrpl/dist/npm/models/common";
interface Events {
    'connection': (connected:boolean) => void; // connect/disconnect xrpl event
    'transaction': (tx:Transaction & ResponseOnlyTxInfo) => void; // tx event
}
interface CoreEvents extends Events {
    'tick': () => void; // loop tick - up to 10 executions per second
}
declare interface CoreEventEmitter {
    on<U extends keyof CoreEvents>(
        event: U, listener: CoreEvents[U]
    ): this;

    emit<U extends keyof CoreEvents>(
        event: U, ...args: Parameters<CoreEvents[U]>
    ): boolean;
}
class CoreEventEmitter extends EventEmitter {
    constructor() {super();}
}
export {CoreEventEmitter};