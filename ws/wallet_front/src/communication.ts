export default {
    async send(channel:string,data:any) {
        console.log(`[front] send to ${channel}:`,data);
        return new Promise((resolve,reject) => {
            let to = setTimeout(()=>{
                console.error('send timeout',{channel,data});
                reject("timeout");
            },10000);
            try {
                chrome.runtime.sendMessage({channel,data}, (response) => {
                    console.log(`[front] ${channel} response`,response);
                    clearTimeout(to);
                    resolve(response);
                });
            } catch (e) {
                reject(e);
                console.error("send to worker error",e);
            }
        })
    }
}