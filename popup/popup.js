const btn = document.querySelector('.btn');
const switchBtn = document.querySelector('.switch-btn');
const switchBtnBall = document.querySelector('.b-ball');


const getStorage = async (key) => {
  return new Promise(resolve => {
    chrome.storage.sync.get([key], (res) => resolve(res[key]))
  })
};


let isShowingEgg ;

window.addEventListener("load", async()=>{
  isShowingEgg = await getStorage('showingEgg');

  if(isShowingEgg){
    switchBtn.style = `background:#6F8E67;`
    switchBtnBall.style = `transform: translateX(0px)`
    chrome.action.setBadgeText({ text:""});

  } else {
    switchBtn.style = `background:#f1f1f1;`
    switchBtnBall.style = `transform: translateX(-40.5px)`
    chrome.action.setBadgeText({ text: "off" });
    chrome.action.setBadgeBackgroundColor({  color: "#A42A28"});
  }
});

const setStorage = (obj) => {
  chrome.storage.sync.set(obj, () => {})
}

const  getCurrentTab = async () => {
  let queryOptions = { active: true, lastFocusedWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);

  return tab;
}

const showEggs = (variant) => { 
  const extensionEl = document.querySelector('.ext_container')
  console.log('extensionEl',extensionEl, variant);
  
  extensionEl.style = `display:${variant};`
  
}

const setInjectScript = async variant => {
  const tab = await getCurrentTab();
  console.log(tab.url)
  if (tab.url === "https://ithelp.ithome.com.tw/users/20139636") {
    await chrome.scripting.executeScript(
      {
        target: {
          tabId: tab.id,
        },
        func: showEggs,
        args: [variant],
      },
      () => {}
    );
  }
};


switchBtn.addEventListener('click', async() => {
  isShowingEgg = !isShowingEgg;
  await setStorage({"showingEgg": isShowingEgg});
  
  if(isShowingEgg){

    switchBtn.style = `background:#6F8E67;`
    switchBtnBall.style = `transform: translateX(0px)`
    chrome.action.setBadgeText({ text:""});

    await setInjectScript('block')

  } else {
    switchBtn.style = `background:#f1f1f1;`
    switchBtnBall.style = `transform: translateX(-40.5px)`
    chrome.action.setBadgeText({ text: "off" });
    chrome.action.setBadgeBackgroundColor({  color: "#A42A28"});
    await setInjectScript('none')
  }

})
