const fs = require('fs-extra');
const path = require("path");
fs.removeSync('./dist');
fs.copySync(path.resolve('../wallet_front/dist'), path.resolve('./dist'));
fs.copySync(path.resolve('../worker_chrome/dist'), path.resolve('./dist'));
fs.writeJsonSync("./dist/manifest.json",{
    "name": "Anima Wallet",
    "version": "1.0",
    "description": "xrpl wallet",
    "icons": {
        "64": "icon64.png"
    },
    "background": {
        "service_worker": "worker.js",
        "type": "module"
    },
    "permissions": [
        "notifications",
        "storage"
    ],
    "action": {
        "default_popup": "index.html"
    },
    "manifest_version": 3
});