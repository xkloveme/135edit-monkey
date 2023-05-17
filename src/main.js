// @ts-ignore isolatedModules
import $ from 'jquery';

window.onload = function () {
  function init () {
    console.log(11)
    $(".pr").hover(function () {
      console.log(22, $(this).children(".tpl-mask > div > div:nth-child(4) > i"))
      $(this).children(".tpl-mask > div > div:nth-child(4) > i").text(function (index, curText) {
        return "免费使用";
      }).on("click", function () {
        var originalId = $(this).data("id"); // 获取元素的data-id属性的值
        console.log("🐛 ~ file: main.js:17 ~ originalId:", originalId);
        // myFunction(originalId); // 调用自己的函数，传入originalId作为参数
      });
    }, function () {
      // $(this).children(".tpl-mask").find("button").remove();
    });
  }




  function styleClick () {
    $(".editor-template-list > li").each(function () {
      $(this).attr('goumai', 1);
      $(this).attr('data-paid', 1);
      $(this).attr('data-id', 126887);
      $(this).removeClass('vip-style');
    });
  }
  styleClick()
  window.get_vip_roles = function () {
    return [9]
  }
  window.initVipAds = function () {
    return true
  }
  var observer = new MutationObserver(function (mutations) {
    styleClick()
  });

  var target = document.querySelector('ul.editor-template-list')
  observer.observe(target, {
    childList: true, // 观察子元素的变化
    subtree: false, // 观察后代元素的变化
    attributes: false, // 观察属性的变化
    characterData: false // 观察文本内容的变化
  });

  window.onbeforeunload = function (e) {
    return null; // onbeforeunload 钩子中如果返回null的话，就不会弹出对话框（"系统可能不会保存您所做的更改"）。
  };

}


$('#editor-footer').hide()
$('#user-login-dialog').hide()
$('#top-style-tools').hide()
$('#fixed-side-bar > ul > li:nth-child(5)').hide()
$('#link-123 > div > div').hide()
$('#nav-header > div > div.nav-box > div > ul > li:last-child').hide()
$('#nav-header > div > div.nav-box > div > ul > li:nth-last-child(2)').hide()