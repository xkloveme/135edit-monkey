// ==UserScript==
// @name         135编辑器VIP采集
// @namespace    http://tampermonkey.net/
// @version      1.0.0
// @author       xkloveme
// @description  在用户打开135编辑器、96编辑器、主编编辑器、易点编辑器vip限制,获取VIP模版脚本.
// @icon         https://www.135editor.com/favicon.ico
// @homepage     https://github.com/xkloveme
// @homepageURL  https://github.com/xkloveme/135edit-monkey
// @updateURL    https://cdn.staticaly.com/gh/xkloveme/135edit-monkey/gh-pages/135edit-monkey.user.js
// @match        *://*.135editor.com*
// @match        *://*.135editor.com/*
// @match        *://bj.96weixin.com*
// @match        *://www.wxeditor.com*
// @match        *://www.zhubian.com*
// @require      https://cdn.jsdelivr.net/npm/jquery@3.7.0/dist/jquery.min.js
// ==/UserScript==

(function ($) {
  'use strict';

  window.onload = function() {
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
    function styleClick() {
      $(".editor-template-list > li").each(function() {
        $(this).attr("goumai", 1);
        $(this).attr("data-paid", 1);
        $(this).attr("data-id", "126887");
        $(this).removeClass("vip-style");
      });
    }
    function hack_96_ZB() {
      $("div").click(function(e) {
        $(".rich_media_content").attr("data-vip", "1");
      });
    }
    function hackED() {
      $("div").click(function(e) {
        $(".yead_editor").attr("data-use", "1");
      });
    }
    window.style_click = window.show_role_vip_dialog = function() {
    };
    window.get_vip_roles = function() {
      return [9];
    };
    window.initVipAds = function() {
      return true;
    };
    var observer = new MutationObserver(function(mutations) {
      styleClick();
    });
    var target = document.querySelector("ul.editor-template-list");
    observer.observe(target, {
      childList: true,
      // 观察子元素的变化
      subtree: false,
      // 观察后代元素的变化
      attributes: false,
      // 观察属性的变化
      characterData: false
      // 观察文本内容的变化
    });
    window.onbeforeunload = function(e) {
      return null;
    };
  };
  $("#add_xiaoshi").hide();
  $(".category-nav.editor-nav>.nav-item:nth-last-child(-n+2)").hide();
  $("#fixed-side-bar li:not(#function-settings), #fixed-bar-pack-up").hide();
  $("#editor-footer").hide();
  $("#user-login-dialog").hide();
  $("#top-style-tools").hide();
  $("#fixed-side-bar > ul > li:nth-child(5)").hide();
  $("#link-123 > div > div").hide();
  $("#nav-header > div > div.nav-box > div > ul > li:last-child").hide();
  $("#nav-header > div > div.nav-box > div > ul > li:nth-last-child(2)").hide();

})($);
