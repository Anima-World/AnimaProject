import {EventEmitter} from 'events';
interface FrontEvents {
    'connection': (connected:boolean) => void; // connect/disconnect xrpl event
}
declare interface FrontEventEmitter {
    on<U extends keyof FrontEvents>(
        event: U, listener: FrontEvents[U]
    ): this;
    once<U extends keyof FrontEvents>(
        event: U, listener: FrontEvents[U]
    ): this;

    emit<U extends keyof FrontEvents>(
        event: U, ...args: Parameters<FrontEvents[U]>
    ): boolean;
}
class FrontEventEmitter extends EventEmitter {
    constructor() {super();}
}
export {FrontEventEmitter};