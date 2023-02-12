import {convertHexToString, convertStringToHex} from "xrpl";

const delay = (ms:number=100) => new Promise(resolve => setTimeout(resolve,ms));
const prefix = (prefix:string) => {
    const methods = {
        log: console.log,
        error: console.error,
        warn: console.warn,
        info: console.info,
        debug: console.debug
    }
    Object.keys(methods).forEach(key => {
        const type = key as keyof typeof methods;
        (console as any)[key] = function(...args: any[]) {
            methods[type](`[${type}][${prefix}]`,...args);
        }
    });
}
//todo fix converters
const hex2str = (hexStr:string):string => {
    let str = '';
    for (let n = 0; n < hexStr.length; n += 2) {
        const item = hexStr.substr(n, 2);
        const t = parseInt(item, 16);
        if(t!=0)
            str += item;
    }
    return convertHexToString(str);
}
const str2hex = (str:string, length=40):string => {
    let result = convertStringToHex(str);
    while(result.length<length)
        result+='0';
    return result;
}
export {delay,prefix,str2hex,hex2str};