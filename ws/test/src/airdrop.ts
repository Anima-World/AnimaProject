import {Client} from "core";
import {convertStringToHex, Wallet, xrpToDrops} from "xrpl";
import {TrustLine} from "data";

async function airdrop(trustline:string,wallet:Wallet,server:string="wss://xrplcluster.com") {
    const client = new Client();
    await client.connect(server);
    const trustlines:TrustLine[] = await client.getAllTrustLines(trustline);
    for(const line of trustlines) {
        try {
            const payment = await client.prepareTx({
                Account: wallet.address,
                Destination: line.account,
                Amount: "1",
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
                wallet
            ));
        } catch (error) {
            console.error('payment error', {line,error});
        }
    }
    await client.close();
}
export {airdrop};