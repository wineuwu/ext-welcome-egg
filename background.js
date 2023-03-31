const setStorage = (obj) => {
  chrome.storage.sync.set(obj, () => {})
}

chrome.runtime.onInstalled.addListener(async() => { 
   await setStorage({"showingEgg": true})
 })



const injectedFunction =(msg) => { 
  console.log(msg);
 }


chrome.tabs.onUpdated.addListener(async (id, info, tab) => {
  if (tab.url === "https://ithelp.ithome.com.tw/users/20139636" && info.status === 'complete') {

    // 動態注入 
    chrome.scripting.executeScript({
      target : {tabId : id},
      func : injectedFunction, // 也可以指定檔案路徑的形式 files: ['script.js'],
      args : [ '我是動態注入' ],
    });
  }});

