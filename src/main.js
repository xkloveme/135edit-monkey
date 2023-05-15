// @ts-ignore isolatedModules
import $ from 'jquery';



$(".pr").hover(function () {
  var newButton = $("<button>").css({
    "background-color": "#f00",
    "color": "#fff",
    "font-size": "16px",
    "border-radius": "5px"
  });
  newButton.text("使用模版");
  // console.log($(this).onmouseenter)
  // let id = String($(this).onmouseenter).match(/\d+/g)
  newButton.on("click", function () {
    console.log($('#edui27_body'), $(this))
    // fetch(`https://www.135editor.com/editor_styles/view_contribute/127179.html?inajax=1&team_id=undefined`).then(r=>r.text()).then(res=>{
    //   let iframe = $(res).find('.article135')
    //   console.log("🐛 ~ file: main.js:19 ~ fetch ~ iframe:", iframe);
    // })
    $('#edui27_body')[0].click();
  });
  $(this).children(".tpl-mask").append(newButton);
}, function () {
  $(this).children(".tpl-mask").find("button").remove();
});