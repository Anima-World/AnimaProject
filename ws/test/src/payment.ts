import {Client} from "core";
import {convertStringToHex, Wallet, xrpToDrops} from "xrpl";

async function payment() {
    const client = new Client();
    await client.connect();
    const wallet1 = Wallet.generate();
    const wallet2 = Wallet.generate();
    console.log(await client.client.fundWallet(wallet1));
    const payment = await client.prepareTx({
        Account: wallet1.address,
        Destination: wallet2.address,
        Amount: xrpToDrops(1),
        TransactionType: "Payment",
        Memos: [
            {
                "Memo": {
                    "MemoData": convertStringToHex("memo text")
                }
            }
        ]
    });
    console.log(await client.payment(
        payment,
        wallet1
    ));
    await client.close();
}
export {payment};