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

  $(".pr").hover(function() {
    var newButton = $("<button>").css({
      "background-color": "#f00",
      "color": "#fff",
      "font-size": "16px",
      "border-radius": "5px"
    });
    newButton.text("使用模版");
    newButton.on("click", function() {
      console.log($("#edui27_body"), $(this));
      $("#edui27_body")[0].click();
    });
    $(this).children(".tpl-mask").append(newButton);
  }, function() {
    $(this).children(".tpl-mask").find("button").remove();
  });

})($);
