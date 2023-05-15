// @ts-ignore isolatedModules
import $ from 'jquery';


function init () {
  console.log('hello world', $);
  const tplmAskList = document.querySelectorAll('.pr');
  for (let i = 0; i < tplmAskList.length; i++) {
    let id = String(tplmAskList[i].onclick).match(/\d+/g).join('')
    console.log("🐛 ~ file: App.vue:4 ~ tplmasklist:", tplmAskList[i]);
    $(tplmAskList[i]).append("<li>插入项</li>");
    // console.log(id,tplmAskList, 111)
    // tplmAskList[i].childNodes[3].appendChild(injectHTML);
  }
}
var observer = new MutationObserver(function (mutations) {
  mutations.forEach(function (mutationRecord) {
    if (mutationRecord.type === 'attributes' && mutationRecord.attributeName === 'class') {
      if ($(mutationRecord.target).hasClass('active')) {
        init()
      }
    }
  });
});

var target = document.getElementById('left-operate-menu');
observer.observe(target, { attributes: true, childList: true, subtree: true, attributeFilter: ['class'] });