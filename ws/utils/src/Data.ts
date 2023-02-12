import {Wallet} from "xrpl";
import keypairs from 'ripple-keypairs';
import assert from 'assert';

class WalletsUtils {
     private static secretToEntropy(secret: Array<string>): Buffer {
        return Buffer.concat(secret.map((item, index) => {
            const value = Number(item.slice(0, 5));
            const checksum = Number(item.slice(5));
            assert.strictEqual(item.length, 6);
            assert.strictEqual(value * (index * 2 + 1) % 9 === checksum, true);
            const hex = ('0000' + value.toString(16)).slice(-4);
            return Buffer.from(hex, 'hex');
        }));
    }
    static walletFromMnemonic(mnemonic:string):Wallet {
        return Wallet.fromMnemonic(mnemonic);
    }
    static walletFromNumbers(numbers:string):Wallet {
        numbers = numbers.replace(/[^0-9]/g, '');
        if (numbers.length !== 48) {
            throw new Error('wrong length');
        }
        let secret:Array<string> = Array.apply(null, Array(8)).map((a:any, i:any) => {
            return numbers.slice(i * 6, (i + 1) * 6)
        });
        assert.strictEqual(secret.length, 8);
        secret.forEach((r, i) => {
            assert.strictEqual(r.length, 6);
        });
        const entropy = this.secretToEntropy(secret);
        return Wallet.fromSeed(keypairs.generateSeed({entropy: entropy}))
    }
}
export {WalletsUtils};