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

  window.onbeforeunload = function (e) {
    return null; // onbeforeunload 钩子中如果返回null的话，就不会弹出对话框（"系统可能不会保存您所做的更改"）。
  };


  function styleClick () {
    $(".editor-template-list > li").each(function () {
      $(this).attr('goumai', 1);
      $(this).removeClass('style-item  vip-style');
    });
  }
  // $(this).removeAttr("onClick");
  // $(this).off('click');
  // $(this).bind('click', function () {
  //   console.log("newFunction called!", $('#edui22_iframeholder > div  > textarea'), $(this).children('section')[0].outerHTML);
  //   let htmlCont = $(this).children('section')[0].outerHTML
  //   $('#edui27_body').click()
  //   setTimeout(function () {
  //     var codeMirrorEditor = $('.CodeMirror')[0].CodeMirror;
  //     var currentContent = codeMirrorEditor.getValue();
  //     var newContent = currentContent + htmlCont;
  //     codeMirrorEditor.setValue(newContent);
  //     $('#edui27_body').click()
  //   }, 1000)
  //   return false
  // });


  $('#style-categories li').on('click', function () {
    styleClick()
    console.log(22)
  });
  styleClick()
  window.get_vip_roles = function () {
    return [9]
  }
  window.initVipAds = function () {
    return true
  }
  window.publishController = {
    open_dialog: function () {
      $('.modal').remove()
      $('.modal-backdrop').remove()
    }
  }
}


$('#editor-footer').hide()
$('#user-login-dialog').hide()
$('#top-style-tools').hide()
$('#fixed-side-bar > ul > li:nth-child(5)').hide()
$('#link-123 > div > div').hide()
$('#nav-header > div > div.nav-box > div > ul > li:last-child').hide()
$('#nav-header > div > div.nav-box > div > ul > li:nth-last-child(2)').hide()