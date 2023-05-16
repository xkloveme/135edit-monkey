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
    function init() {
      console.log(11);
      $(".pr").hover(function() {
        console.log(22, $(this).children(".tpl-mask > div > div:nth-child(4) > i"));
        $(this).children(".tpl-mask > div > div:nth-child(4) > i").text(function(index, curText) {
          return "免费使用";
        }).on("click", function() {
          var originalId = $(this).data("id");
          console.log("🐛 ~ file: main.js:17 ~ originalId:", originalId);
        });
      }, function() {
      });
    }
    var observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutationRecord) {
        if (mutationRecord.type === "attributes" && mutationRecord.attributeName === "class") {
          if ($(mutationRecord.target).hasClass("active")) {
            init();
          }
        }
      });
    });
    var target = document.getElementById("left-operate-menu");
    observer.observe(target, { attributes: true, childList: true, subtree: true, attributeFilter: ["class"] });
    window.onbeforeunload = function(e) {
      return null;
    };
    function styleClick() {
      $(".editor-template-list > li").each(function() {
        $(this).attr("goumai", 1);
        $(this).removeClass("style-item  vip-style");
      });
    }
    $("#style-categories li").on("click", function() {
      styleClick();
      console.log(22);
    });
    styleClick();
    window.get_vip_roles = function() {
      return [9];
    };
    window.initVipAds = function() {
      return true;
    };
    window.publishController = {
      open_dialog: function() {
        $(".modal").remove();
        $(".modal-backdrop").remove();
      }
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
