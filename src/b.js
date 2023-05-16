
$(document).ready(function() {
  var arry_vip_end_soon = eval('[]'); // 即将到期会员数组

  var flag_first = true; // true: 提醒, false: 当日不再提醒
  var flag_xufei = true; // true: 提醒, false: 当日不再提醒
  var flag_hongbao = true; // true: 提醒, false: 当日不再提醒

  var flag_freevip = true; // true: 提醒, false: 当日不再提醒
  var flag_xufei15 = true; // true: 提醒, false: 当日不再提醒

  var showvip_first = getStorage('vip_first');
  var showvip_xufei = getStorage('vip_xufei');
  var showvip_hongbao = getStorage('vip_hongbao');
  var showvip_freevip = getStorage('vip_freevip');
  var showvip_xufei15 = getStorage('vip_xufei15');

  var interval_hongbao;
  var interval_xufei;
  var interval_check_code;
  var timeout_end_time;
  var scene_id = "userbind_824614077"; 

  $(document).on('click', '.vip-bg-mask', function(e) {
    e.stopPropagation(); // 阻止事件冒泡
    closeVipModal()
  });

  // 关闭弹窗
  $(document).on('click', '.vip-body .vip-close-btn', function(e) {
    e.stopPropagation(); // 阻止事件冒泡
    closeVipModal()
  });

  // 跳转新的页面
  $(document).on('click', '#vip-hongbao', function() {
    window.open("/charge-service.html?source=category-vip");
  });

  $(document).on('click', '.vip-renewal4-close-btn', function() {
    flag_xufei15 = false;
    closeVipModal()
  });

  // 关闭弹窗
  $(document).on('click', '.vip-body .vip-renewal-close', function() {
    let key = $(this).data('id')
    closeRenewalModal(key)
  });

  // 关闭弹窗
  $(document).on('click', '#vip-renewal3 .close-renewal', function() {
    $('.vip-body').removeClass('open').next().removeClass('open');
  });

  // 首充VIP
  $(document).on('click', '#vip-first .vip-first-btn', function() {
    show_role_vip_dialog(null, null, null, {
      url: '/roles/vip_order.html',
      vip_type: 8,
      vip_time: 12,
      source: 'first-pay'
    })
  });

  // 获赠会员续费
  $(document).on('click', '.vip-renewal-main .vip-renewal-go', function() {
    $(this).siblings('.close-renewal').click()
    show_role_vip_dialog(null, null, null, {
      url: '/roles/vip_order.html',
      vip_type: 8,
      vip_time: 12,
      source: 'renewal-pay '
    })
  });

  // 红包
  $(document).on('click', '#vip-hongbao .vip-hongbao-use', function() {
    show_role_vip_dialog(null, null, null, {
      url: '/roles/vip_order.html',
      vip_type: window.HONGBAO_ID,
      vip_time: 12,
      source: 'unpaid-order-popup'
    })
  });

  // 续费
  $(document).on('click', '#vip-xufei .vip-normal-btn', function() {
    show_role_vip_dialog(null, null, null, {
      url: '/roles/vip_order.html',
      vip_type: 8,
      vip_time: 12,
      source: 'again-pay'
    })
  });

  // 续费
  $(document).on('click', 'vip-renewal4-btn', function() {
    show_role_vip_dialog(null, null, null, {
      url: '/roles/vip_order.html',
      vip_type: 8,
      vip_time: 12,
      source: 'again-pay'
    })
  });

  // 刷新二维码
  $(document).on('click', '#vip-free .refresh_code i', function() {
    getCodeImg()
  });

  // 通用不再提醒
  $(document).on('click', '.vip-body .not-tips-me', function(e) {
    var flag = $(this).data('name')
    if (flag == 'flag_first') {
      flag_first = false
    } else if (flag == 'flag_xufei') {
      flag_xufei = false
    } else if (flag == 'flag_hongbao') {
      flag_hongbao = false
      e.stopPropagation(); //阻止事件冒泡
      closeVipModal()
    } else if (flag == 'flag_freevip') {
      flag_freevip = false
    }
    closeVipModal()
  });

  // 1、针对未充值过的用户措施 续费
  $(document).on('click', '#vip-money1 .vip-money-btn', function() {
    show_role_vip_dialog(null, null, null, {
      url: '/roles/vip_order.html',
      vip_type: 8,
      vip_time: 12,
      source: 'again-pay'
    })
  });

  // 2、针对低净值的过期会员 续费
  $(document).on('click', '#vip-money2 .vip-money-btn', function() {
    show_role_vip_dialog(null, null, null, {
      url: '/roles/vip_order.html',
      vip_type: 10, // 2021-10月优惠券后续可删除恢复：8
      vip_time: 12, // 2021-10月优惠券后续可删除恢复：1
      source: 'again-pay'
    })
  });

  // 3、针对高净值的过期会员 续费
  $(document).on('click', '#vip-money3 .vip-money-btn', function() {
    show_role_vip_dialog(null, null, null, {
      url: '/roles/vip_order.html',
      vip_type: 8,
      vip_time: 12,
      source: 'again-pay'
    })
  });

  if (loged_user) { 
    // 3、针对高净值的过期会员 关闭
    $(document).on('click', '#vip-money1 .vip-close-btn, #vip-money2 .vip-close-btn, #vip-money3 .vip-close-btn', function(e) {
      e.stopPropagation(); // 阻止事件冒泡
      closeVipModal();
      // showSuccessMessage('主人，优惠券已放入您的个人中心，记得48小时内使用~');
      showSuccessMessage('优惠券已帮您放入账号中，请及时使用避免过期！', 'center', 3000);

      _hmt.push(['_trackEvent', 'coupon', 'click', 'coupon_no_use']); // 百度统计关闭优惠券
    });
  }
  
  initVipAds();
  // initUserAds(3);

  // 关闭弹框
  function closeRenewalModal(key) {
    var notifymetoday_arry = window.localStorage[key]
    var tmp_arry
    if (notifymetoday_arry) {
      tmp_arry = $.parseJSON(notifymetoday_arry)
    } else {
      tmp_arry = []
    }
    var now_date = new Date().toLocaleDateString()
    tmp_arry.push(now_date)
    window.localStorage[key] = JSON.stringify(tmp_arry)
    $('.vip-body').removeClass('open').next().removeClass('open');
  }


  $(document).on('click', '.vip-flag,.vip-style', function() {
    if (RENEWAL_STATUS == 1 && nextDay('vip_renewal1')) {
      $('#vip-renewal1').addClass('open').next().addClass('open');
      window.iframe_pay_success = () => {
        window.location.reload()
      }
    } else if (RENEWAL_STATUS == 2 && nextDay('vip_renewal2')) {
      $('#vip-renewal2').addClass('open').next().addClass('open');
      window.iframe_pay_success = () => {
        window.location.reload()
      }
    } else if (RENEWAL_STATUS == 3 && nextDay('vip_renewal3')) {
      $('#vip-renewal3').addClass('open').next().addClass('open');
      window.iframe_pay_success = () => {
        window.location.reload()
      }
    }
  });

  // 弹窗广告初始判断
  function initVipAds() {
    // if (!loged_user && !sso.check_userlogin()) { return false }
    // 1: 编辑页首页 => 触发会员续费弹框
    // 2: 编辑页首页 => 触发会员首充弹框
    // 3: 编辑页首页 => 触发红包赠送弹框
    // 4: 编辑页首页 => 触发免费领会员弹框
    var show_val = $('.editor135-ads-mask').css('display') ? $('.editor135-ads-mask').css('display') : 'none';
    if (show_val == 'none' && MODAL_TYPE == 1) {
      if (showvip_xufei) {
        if (arry_vip_end_soon.length > 0) { // 是否有即将到期会员
          XUFEI_END_DATE = arry_vip_end_soon[0].ended
          renderTime_xufei(timeEnd(arry_vip_end_soon[0].ended))
          interval_xufei = setInterval(function() {
            renderTime_xufei(timeEnd(arry_vip_end_soon[0].ended))
          }, 60000) //续费倒计时
          $('#vip-xufei').addClass('open').next().addClass('open');
        }
      }
    } else if (show_val == 'none' && MODAL_TYPE == 2) {
      // $(document).on('click', '.vip-flag,.vip-style', function() {
      //  //需点击点击vip样式
      //  //if (showvip_first) {
      if (FIRST_VIP == 0) { // 是否首次充值
        $('#vip-first').addClass('open').next().addClass('open');
        var _hmt = _hmt || [];
        _hmt.push(['_trackEvent', 'shop', 'click', 'frist_popup-page'])
      }
      //  //}
      // })
    } else if (show_val == 'none' && MODAL_TYPE == 3) {
      if (showvip_hongbao) {
        $('#vip-hongbao').addClass('open').next().addClass('open');
        interval_hongbao = setInterval(function() {
          renderTime_hongbao(timeEnd(HONGBAO_END_DATE))
        }, 1000) //红包倒计时
      }
    } else if (show_val == 'none' && MODAL_TYPE == 4) {
      if (showvip_freevip) {
        getCodeImg()
        $('#vip-free').addClass('open').next().addClass('open');
      }
    } else if (show_val == 'none' && MODAL_TYPE == 5) {
      if (showvip_xufei15) {
        $('#vip-renewal4').addClass('open').next().addClass('open');
      }
    }
  }

  // 充值用户 maxDay: 为最大天数
  function initUserAds(maxDay) {
    if(!loged_user) { return false; }
    // 获取缓存记录, 最后一条记录是否是当前. 总共显示3次.
    const vipAct = getStorage('vip_augAct');
    if(!vipAct || vipAct.length >= maxDay) { return }
    if(vipAct.length > 0) {
      const last = Date.parse( new Date(vipAct[vipAct.length-1].time) );
      const nowDate = Date.parse( new Date());
      const timeder = nowDate - last;    
      if (timeder <= (1000 * 60 * 60 * 24)) { return false; }
    }
    // // 1、针对未充值过的用户措施
    // // 2、针对低净值的过期会员
    // // 3、针对高净值的过期会员
    // if(MSG_TYPE == 1) {
    //   $('#vip-money1').addClass('open').next().addClass('open');
    // } else if (MSG_TYPE == 2){
    //   $('#vip-money2').addClass('open').next().addClass('open');
    // } else if (MSG_TYPE == 3){
    //   $('#vip-money3').addClass('open').next().addClass('open');
    // } else {}
    // 存储缓存, 记得当前时间.
    const day = new Date();
    let res;
    if(vipAct.length > 0) {
      res = vipAct;
      res.push({
        number: (vipAct.length + 1),
        time: day.getFullYear() + '-' + (day.getMonth() + 1) +'-' + day.getDate(),
      });
    } else {
      res = [{
        number: 1,
        time: day.getFullYear() + '-' + (day.getMonth() + 1) +'-' + day.getDate(),
      }]
    }
    const callback = JSON.stringify(res);
    setStorage('vip_augAct', callback);
  }
//   function members(){
//       if (MSG_TYPE==0) {
//           $('#add_xiaoshi').hide();
//       }else if(MSG_TYPE==1 || MSG_TYPE==2) {
//         $('#add_xiaoshi').show();
//       }
// }
// members();
  // 通用倒计时
  function timeEnd(date) {
    date = Date.parse(date.replace(/-/g, "/"));
    var now_time = new Date();
    var end_time = new Date(date);
    var time = end_time.getTime() - now_time.getTime();

    var dd = parseInt(time / 1000 / 60 / 60 / 24, 10); // 计算剩余的天数
    var hh = parseInt(time / 1000 / 60 / 60 % 24, 10); // 计算剩余的小时数
    var mm = parseInt(time / 1000 / 60 % 60, 10); // 计算剩余的分钟数
    var ss = parseInt(time / 1000 % 60, 10); // 计算剩余的秒数

    dd = mixTxt(dd);
    hh = mixTxt(hh);
    mm = mixTxt(mm);
    ss = mixTxt(ss);

    var time_obj = {
      dd,
      hh,
      mm,
      ss,
      time
    }
    return time_obj

  }

  // 续费时间渲染
  function renderTime_xufei(time_obj) {
    $('#vip-xufei .vip-xufei-normal-main .dd').text(time_obj.dd)
    $('#vip-xufei .vip-xufei-normal-main .hh').text(time_obj.hh)
    $('#vip-xufei .vip-xufei-normal-main .mm').text(time_obj.mm)
  }

  // 红包到期时间渲染
  function renderTime_hongbao(time_obj) {
    $('.vip-hongbao-time-1').text(time_obj.dd)
    $('.vip-hongbao-time-2').text(time_obj.hh)
    $('.vip-hongbao-time-3').text(time_obj.mm)
    $('.vip-hongbao-time-4').text(time_obj.ss)
    if (time_obj.time <= 0) { //红包失效
      closeVipModal()
    }
  }

  // 关闭弹框
  function closeVipModal(e) {
    $('.vip-body').removeClass('open').next().removeClass('open')
    setStorage('vip_first', flag_first)
    setStorage('vip_xufei', flag_xufei)
    setStorage('vip_hongbao', flag_hongbao)
    setStorage('vip_freevip', flag_freevip)
    setStorage('vip_xufei15', flag_xufei15)

    // let todayFlog = true;
    // setStorage("vip_close_pop", todayFlog);

    interval_xufei ? clearInterval(interval_xufei) : '';
    interval_hongbao ? clearInterval(interval_hongbao) : '';
    timeout_end_time ? clearTimeout(timeout_end_time) : '';
    interval_check_code ? clearInterval(interval_check_code) : '';
  }

  // 设置本地存储
  function setStorage(key, value) {
    var current_time = new Date().getTime();
    localStorage.setItem(key,
      JSON.stringify({ data: value, time: current_time, expire: 86400000 })
    );
  }

  // 读取本地存储
  function getStorage(key) {
    var data = localStorage.getItem(key);
    if (data != null) {
      var dataObj = JSON.parse(data);
      if ((new Date().getTime() - dataObj.time) > dataObj.expire) {
        // console.log('信息已过期'); // 保存一天
        return true;
      } else {
        return JSON.parse(dataObj.data);
      }
    } else {
      return true;
    }
  }

  // 时间“0”补位
  function mixTxt(i) {
    if (parseInt(i) < 10) { i = "0" + i; }
    return i;
  }

  // 生成二维码
  function getCodeImg() {
    $('#scan-result').removeClass('alert alert-danger').html(
      '扫码后自动绑定微信');
    $('#vip-free .refresh_code').hide();
    ajaxAction(BASEURL + '/qrcodes/getQr?expire=86400&scene=' + scene_id, null, null, function(request) {
      if (request.ret == 0) {
        $('#vip-free .vip-free-code img').attr('src', 'https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=' + request
          .ticket);
        interval_check_code ? clearInterval(interval_check_code) : '';
        timeout_end_time ? clearTimeout(timeout_end_time) : '';
        timeout_end_time = setTimeout(function() {
          $('#vip-free .refresh_code').show();
          interval_check_code ? clearInterval(interval_check_code) : '';
        }, 60000);
        interval_check_code = setInterval(function() {
          ajaxAction(BASEURL + '/qrcodes/queryQrscan/' + scene_id + '?with_auth=1', null, null,
            function(request) {
              if (request.ret == 0) {
                if (request.Oauthbind) {
                  $('#scan-result').addClass('alert alert-danger').html(
                    '该微信号已注册或绑定过用户<br>如需换绑，请联系客服');
                  $('.refresh_code').show();
                } else {
                  ajaxAction(BASEURL + '/users/bindWx/' + request.openid + '/' +
                    request.WxQrScan.id);
                }
                interval_check_code ? clearInterval(interval_check_code) : '';
                timeout_end_time ? clearTimeout(timeout_end_time) : '';
              } else if (request.ret < 0) {
                interval_check_code ? clearInterval(interval_check_code) : '';
                timeout_end_time ? clearTimeout(timeout_end_time) : '';
                $('.refresh_code').show();
              }
            });
        }, 5000);
      } else {
        showErrorMessage('微信二维码生成错误，请联系管理员。<br/>' + request.errmsg);
      }
    });
  }

  // 优惠券弹窗（前两天每天弹一次共弹两次，每隔15天重置）
  // coupon_layer();
  function coupon_layer(){
    var coupon_data = localStorage.getItem('coupon_data');
    var dataObj = JSON.parse(coupon_data);
    var startTime = dataObj ? dataObj.time : new Date().getTime() // 开始时间
    var showNnm = dataObj ? dataObj.value : 0 // 弹出次数
    var days = (new Date().getTime() - startTime) / (24 * 60 * 60 * 1000); // 天

    // 判断小于两次并且第一天或者大于一天，或者大于15天，并且// 1、针对未充值过的用户措施，2、针对低净值的过期会员，3、针对高净值的过期会员
    if(((showNnm < 2 && (days == 0 || days > 1)) || days > 15) && (MSG_TYPE == 2 || MSG_TYPE == 3)){
      if(days > 15){ // 大于15重新存储
        var curTime = new Date().getTime();
        localStorage.setItem('coupon_data', JSON.stringify({ value: 1, time: curTime }));
      } else {
        localStorage.setItem('coupon_data', JSON.stringify({ value: showNnm + 1, time: startTime }));
      }

      $('#vip-money2').addClass('open').next().addClass('open');
      _hmt.push(['_trackEvent', 'coupon', 'click', 'coupon_show']); // 百度统计优惠券弹出
    }
  }

});

// 凌晨后为第二天
function nextDay(key) {
  var notifymetoday_arry = window.localStorage[key]
  var tmp_arry
  if (notifymetoday_arry) {
    tmp_arry = $.parseJSON(notifymetoday_arry)
  } else {
    tmp_arry = []
  }
  var now_date = new Date().toLocaleDateString()
  if (jQuery.inArray(now_date, tmp_arry) >= 0) {
    return false
  } else {
    return true
  }
}
