import {Client} from "core";
import {convertStringToHex, xrpToDrops} from "xrpl";

async function payment() {
    const client = new Client();
    await client.connect();
    const wallet1 = Client.generateWallet();
    const wallet2 = Client.generateWallet();
    console.log(await client.client.fundWallet(wallet1.xrp));
    const payment = await client.prepareTx({
        Account: wallet1.xrp.address,
        Destination: wallet2.xrp.address,
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
        wallet1.xrp
    ));
    await client.close();
}
export {payment};