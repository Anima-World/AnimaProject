import {EventEmitter} from 'events';
interface Events {
    'connection': (connected:boolean) => void; // connect/disconnect event
    'tick': () => void; // loop tick - up to 10 executions per second
}
declare interface CoreEventEmitter {
    on<U extends keyof Events>(
        event: U, listener: Events[U]
    ): this;

    emit<U extends keyof Events>(
        event: U, ...args: Parameters<Events[U]>
    ): boolean;
}
class CoreEventEmitter extends EventEmitter {
    constructor() {super();}
}
export {CoreEventEmitter as EventEmitter,Events};