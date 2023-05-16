
$(document).ready(function(){
     $('#link-123').append('<div class="intal" style="display:none;"><div class="add_num"><div>新增样式</div> <div>'+'+132个'+'</div> <div>新增模板</div><div>+'+'207个'+'</div></div> </div>')
})
function judgeYangShiJurisdiction(event,type,id){
    // 获取点击的 div 元素及其子元素的 data-goumai 属性的值
    var goumaiValue = $(event.currentTarget).attr('goumai');
    // 打印获取到的所有 data-goumai 属性的值
    console.log(goumaiValue);
    if(goumaiValue==1){
        event.preventDefault();
        return;
    }
    // 如果用户点击素材上的悬浮物（如：收藏、屏蔽...）
    const isMapPaoBug = event.target.getAttribute('MapPaoBug');
    if(isMapPaoBug){
        return;
    }
    
    if (!loged_user && !sso.check_userlogin()) {return false;};
    // type(素材支持的VIP): 0不是会员,1是个人VIP,2是高级VIP,3是超级VIP,4是企业VIP
    // 非会员<个人VIP<高级VIP<超级VIP<企业VIP

    // 用户会员: 8个人会员，10高级会员，12超级会员，9是企业会员
    var userVip = "";
    var vip_roles = window.get_vip_roles();
    if(vip_roles.includes(9)){
        userVip = 4;
    }else if(vip_roles.includes(12)){
        userVip = 3;
    }else if(vip_roles.includes(10)){
        userVip = 2;
    }else if(vip_roles.includes(8)){
        userVip = 1;
    }else{
        // 不是VIP
        userVip = 0;
    }

    var isUse = false; // 是否符合权限

    if(userVip == 0){
        // 用户不是会员
        if(type == 0){
            // 可以使用
            isUse = true;
        }else{
            // 请升级会员
            isUse = false;
        }
    }else if(userVip == 1){
        // 用户是个人VIP,素材权限为: 非会员,个人VIP
        if([0,1].includes(type)){
            // 可以使用
            isUse = true;
        }else{
            // 请升级会员
            isUse = false;
        }
    }else if(userVip == 2){
        // 用户是高级会员,素材权限为: 非会员,个人VIP,高级VIP
        if([0,1,2].includes(type)){
            // 可以使用
            isUse = true;
        }else{
            // 请升级会员
            isUse = false;
        }
    }else if(userVip == 3){
        // 用户是超级会员,素材权限为: 非会员,个人VIP,高级VIP,超级会员
        if([0,1,2,3].includes(type)){
            // 可以使用
            isUse = true;
        }else{
            // 请升级会员
            isUse = false;
        }
    }else if(userVip == 4 ){
        // 用户是企业VIP,素材权限为: 非会员,个人VIP,高级VIP,超级会员,企业VIP
        if([0,1,2,3,4].includes(type)){
            // 可以使用
            isUse = true;
        }else{
            // 请升级会员
            isUse = false;
        }
    }

    if(!isUse){
        // 禁止通过事件执行
        event.stopPropagation()
        if(type == 1){
            publishController.open_dialog('/roles/vip_order.html?vip_type=8&source=fav_style_'+id+'&vip_time=12',{'title':'','callback':null,'id':'role-vip-dialog','width':1080,'height':790,'type':'iframe','hidden':'remove'});
        }else if(type == 2){
            publishController.open_dialog(`/Roles/vip_order?vip_type=10&vip_time=36&source=fav_style_${id}`,{'title':'会员充值','callback':null,'id':'role-vip-dialog','width':1080,'height':790,'type':'iframe','hidden':'remove'})
        }else if(type == 3 || type == 4){
            // 企业显示
            $(".styleMaterial").show();
            $(".styleMaterial").attr("pay-type",type)
            $(".styleMaterial").attr("style-id",id)
        }

        // 打开支付弹窗(1是个人VIP,2是高级VIP,3是超级VIP,4是企业VIP)
        /*
            if(type == 1){
                publishController.open_dialog('/roles/vip_order.html?vip_type=8&source=category-vip&vip_time=12',{'title':'','callback':null,'id':'role-vip-dialog','width':1080,'height':790,'type':'iframe','hidden':'remove'});
            }else if(type == 2){
                publishController.open_dialog('/Roles/vip_order?vip_type=10&vip_time=36&source=category-vip',{'title':'会员充值','callback':null,'id':'role-vip-dialog','width':1080,'height':790,'type':'iframe','hidden':'remove'})
            }else if(type == 3){
                publishController.open_dialog('/roles/vip_order.html?vip_type=12&source=category-vip&vip_time=24',{'title':'','callback':null,'id':'role-vip-dialog','width':1080,'height':790,'type':'iframe','hidden':'remove'});
            }else if(type == 4){
                publishController.open_dialog('/roles/buy_company.html?company_type=1&company_time=12&source=vip-company',{'title':'','callback':null,'id':'role-vip-dialog','width':1080,'height':790,'type':'iframe','hidden':'remove'});
            }
         */
    }
 }
