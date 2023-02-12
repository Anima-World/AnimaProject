import {WalletsUtils} from "utils";
function mnemonic() {
    const str = 'novel matter final only nice cheese address cradle civil crash great flame struggle consider crowd surface purpose saddle mango endless mixed trial tape wrap';
    const wallet = WalletsUtils.walletFromMnemonic(str);
    console.log('walletFromMnemonic valid: ',wallet.address==="r9JynAPy1xUEW2bAYK36fy5dKKNNNKK1Z5");
}
function xummNumbers() {
    const str = '428501 649106 289995 030502 523220 536487 216810 026250';
    const wallet = WalletsUtils.walletFromNumbers(str);
    console.log("walletFromNumbers valid:",wallet.address==="r3WPun8KvMX4raLVDiXqdAZEH6KQ9kedn9")
}
export {xummNumbers,mnemonic};