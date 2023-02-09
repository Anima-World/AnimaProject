const fs = require('fs-extra');
fs.removeSync('./dist');
fs.copySync('./ws/vue_base/dist', './dist/chrome');
fs.copySync('./ws/worker_chrome/dist', './dist/chrome');
fs.copySync('./static/chrome', './dist/chrome');