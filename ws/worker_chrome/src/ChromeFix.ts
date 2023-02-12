// Chrome Extension Manifest V3 fix
// chrome periodically tries to close/restart the worker
// if there is no permanent connection to any tab
export default () => {
    chrome.runtime.onConnect.addListener(port => {
        if (port.name === 'keepAlive') {
            setTimeout(() => port.disconnect(), 250e3);
            port.onDisconnect.addListener(() => findTab());
        }
    });
    findTab();
}
function onUpdate (tabId:any, info:any, tab:any)  {
    return /^https?:/.test(info.url) && findTab([tab]);
}
async function findTab(tabs?:any) {
    if (chrome.runtime.lastError) { /* tab was closed before setTimeout ran */ }
    for (const {id: tabId} of tabs || await chrome.tabs.query({url: '*://*/*'})) {
        try {
            await chrome.scripting.executeScript({target: {tabId}, func: connect});
            chrome.tabs.onUpdated.removeListener(onUpdate);
            return;
        } catch (e) {}
    }
    chrome.tabs.onUpdated.addListener(onUpdate);
}
function connect() {
    chrome.runtime.connect({name: 'keepAlive'})
        .onDisconnect.addListener(connect);
}