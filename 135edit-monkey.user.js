// ==UserScript==
// @name         135编辑器VIP采集
// @namespace    http://tampermonkey.net/
// @version      0.0.0
// @author       xkloveme
// @description  在用户打开135编辑器,获取VIP模版脚本.
// @icon         https://www.135editor.com/favicon.ico
// @homepage     https://github.com/xkloveme
// @homepageURL  https://github.com/xkloveme/135edit-monkey
// @updateURL    https://cdn.staticaly.com/gh/xkloveme/135edit-monkey/gh-pages/135edit-monkey.user.js
// @match        https://www.135editor.com/*
// @require      https://cdn.jsdelivr.net/npm/jquery@3.7.0/dist/jquery.min.js
// ==/UserScript==

(function ($) {
  'use strict';

  window.onload = function() {
    function styleClick() {
      $(".editor-template-list > li").each(function() {
        $(this).attr("goumai", 1);
        $(this).attr("data-paid", 1);
        $(this).attr("data-id", 126887);
        $(this).removeClass("vip-style");
      });
    }
    styleClick();
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
  $("#editor-footer").hide();
  $("#user-login-dialog").hide();
  $("#top-style-tools").hide();
  $("#fixed-side-bar > ul > li:nth-child(5)").hide();
  $("#link-123 > div > div").hide();
  $("#nav-header > div > div.nav-box > div > ul > li:last-child").hide();
  $("#nav-header > div > div.nav-box > div > ul > li:nth-last-child(2)").hide();

})($);
