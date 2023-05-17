// @ts-ignore isolatedModules
import $ from 'jquery';

window.onload = function () {
  var host = window.location.host;
  switch (host) {
    case "www.135editor.com":
      styleClick();
      break;
    case "bj.96weixin.com":
      hack_96_ZB();
      break;
    case "www.zhubian.com":
      hack_96_ZB();
      break;
    case "www.wxeditor.com":
      hackED();
      break;
  }
  function styleClick () {
    $(".editor-template-list > li").each(function () {
      $(this).attr('goumai', 1);
      $(this).attr('data-paid', 1);
      $(this).attr('data-id', '126887'); 
      $(this).removeClass('vip-style');
    });
  }
  function hack_96_ZB () {
    $('div').click(function (e) {
      $(".rich_media_content").attr("data-vip", "1");
    });
  }

  function hackED () {
    $('div').click(function (e) {
      $('.yead_editor').attr('data-use', "1");
    });
  }

  window.style_click = window.show_role_vip_dialog = function () { };
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

$('#add_xiaoshi').hide();
// 顶部导航栏后两个按钮
$('.category-nav.editor-nav>.nav-item:nth-last-child(-n+2)').hide();
// 移除全局菜单中非功能设置按钮
$('#fixed-side-bar li:not(#function-settings), #fixed-bar-pack-up').hide();
$('#editor-footer').hide()
$('#user-login-dialog').hide()
$('#top-style-tools').hide()
$('#fixed-side-bar > ul > li:nth-child(5)').hide()
$('#link-123 > div > div').hide()
$('#nav-header > div > div.nav-box > div > ul > li:last-child').hide()
$('#nav-header > div > div.nav-box > div > ul > li:nth-last-child(2)').hide()