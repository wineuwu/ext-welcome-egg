let egg ;
let chicken ;
let tags ;
let welcomeText ;
let closeBtn ;
let hint_text ;
let isClicked = false;
let isShowingEgg;
let isClear = false;


const getStorage = async (key) => {
  return new Promise(resolve => {
    chrome.storage.sync.get([key], (res) => resolve(res[key]))
  })
};
  
const div = document.createElement('div');
div.className = 'ext_container';
div.innerHTML = `
<div class="w_close_btn">X</div>
<div class="w_egg">
  <div class="egg_item">
    <div class="item clip3"></div>
    <div class="item clip4"></div>
    <div class="item clip5"></div>
    <div class="item clip6"></div>
    <div class="item clip7"></div>
    <div class="item clip8"></div>
    <div class="item clip9"></div>
    <div class="item clip10"></div>
    <div class="item clip11"></div>
    <div class="item clip12"></div>
    <div class="item clip13"></div>
    <div class="item clip15"></div>
    <div class="item clip16"></div>
    <div class="item clip17"></div>
    <div class="item clip18"></div>
    <div class="item clip19"></div>
    <div class="item clip20"></div>
    <div class="item clip21"></div>
    <div class="item clip23"></div>
    <div class="item clip24"></div>
    <div class="item clip25"></div>
    <div class="item clip26"></div>
    <div class="item clip27"></div>
    <div class="item clip28"></div>
    <div class="item clip29"></div>
    <div class="item clip31"></div>
    <div class="item clip32"></div>
    <div class="item clip33"></div>
    <div class="item clip34"></div>
    <div class="w_chicken">
      <p class="w_tag_name">Hi I am Winnie</p>
      <img  src="https://i.imgur.com/lWP1ssK.png">
    </div> 
    <div class="w_tag">Click Egg</div> 
   </div>
</div>
<p class="w_hint_text">點擊右上方工具列的按鈕，即可在重新打開 Welcome G </p>
`;

document.body.appendChild(div);
const extensionEl = document.querySelector('.ext_container') 

console.log('extensionEl', extensionEl)

if(extensionEl) {
  egg = document.querySelector('.w_egg');
  chicken = document.querySelector('.w_chicken');
  tags = document.querySelector('.w_tag');
  welcomeText = document.querySelector('.w_tag_name');
  closeBtn = document.querySelector('.w_close_btn');
  container = document.querySelector('.container');
  hint_text = document.querySelector('.w_hint_text');
}



const init = async() => {
  
  isShowingEgg = await getStorage('showingEgg');
  
  if(extensionEl && !isShowingEgg ){
    extensionEl.style = 'display:none;'
  } else if( extensionEl && isShowingEgg) {
    extensionEl.style = 'display:block;'
  } 

}




init();




egg.addEventListener('click', async (e) => {
  isClicked = true
  if (isClicked) {
    chicken.style = "display:block;"
    welcomeText.style = "display:block;"
    tags.style = "display:none;"
  }
})


closeBtn.addEventListener('click', async () => {
  isClear = true;

  if (isClear) {
    extensionEl.style = "display:none;"
  }
})


