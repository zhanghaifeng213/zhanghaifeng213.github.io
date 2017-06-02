var $body=$("body"),
    $wrap=$("#wrap"),
    $opa=$("#bg").find(".bg1").find(".flash"),
    $yss=$wrap.find(".yss"),
    $jrgw=$wrap.find(".jrgw"),
    $jrImg=$jrgw.find("img"),
    $xsjj=$wrap.find(".xsjj"),
    $play=$wrap.find(".play").find("img"),
    $videoWrap=$wrap.find(".videoWrap"),
    $close=$videoWrap.find(".close"),
    $xiazai=$wrap.find(".xiazai");
//渐入动画
$yss.animate({left:30,opacity: 1},2000);
$jrgw.animate({right:30,opacity: 1},2000);
$xsjj.animate({bottom:480,opacity: 1},1500);
$xiazai.animate({bottom:300,opacity: 1},1500);
$play.animate({opacity: 1},500);
//flash加载
setTimeout(function(){
    $opa.css("opacity",1)
},2000);
//进入官网渐入渐出
$jrgw.mouseenter(function(){
    $jrImg.eq(1).fadeIn(500);
    $jrImg.eq(0).fadeOut(500);
});
$jrgw.mouseleave(function(){
    console.log(2);
    $jrImg.eq(0).fadeIn(500);
    $jrImg.eq(1).fadeOut(500);
});
//视频播放
$play.click(function(){
    $videoWrap.show();
    $body.addClass("noscroll");
});
$close.click(function(){
    console.log(1);
    $videoWrap.hide();
    $body.removeClass("noscroll");
});
// 最新情报弹窗
(function(){
    // 显示隐藏
    var $newVersion=$(".newVersion");
        $newVersionLi=$newVersion.find(".newVersionLi ul li"),
        $pop=$newVersion.find(".popwindow"),
        $popLi=$pop.find(".content ul li"),
        $popClose=$pop.find(".close"),
        $txt=$(".newVersion").find(".popwindow").find(".content").find(".txt"),
        $txtH=$txt.height(),
        $btn=$pop.find(".content .btn"),
        index=0;
    $txt.each(function(){
        // 自定义滚动条
        var $bar=$(this).find(".bar"),
            $scroll=$(this).find(".scroll"),
            $mainTxt=$(this).find(".mainTxt"),
            $mainH=$mainTxt.height(),
            $mainTxtTop=$mainTxt.position().top,
            $barH=$txtH*$txtH/$mainH,
            topMax=$txtH-$barH;
        $bar.height($barH);
        // 点击滑块拖动
        $bar.mousedown(function(e){
        var sY=e.clientY,
            sTop=$(this).position().top,
            $This=$(this),
            top=0;
        $(document).mousemove(function(e){
            var nY=e.clientY;
            var xY=nY-sY;
            top=sTop+xY;
            top=Math.min(top,topMax);
            top=Math.max(top,0);
            var sc=top*($mainH-$txtH)/topMax;
            $mainTxt.css("top",-sc);
            $This.css("top",top);
        }).mouseup(function(){
            $(this).off("mousemove").off("mouseup");
            });
        return false;
        });
        // 鼠标滚轮事件
        $(this).mousewheel(function(e,d){
            var top=$bar.position().top;
            top-=d*10;
            top=Math.min(top,topMax);
            top=Math.max(top,0);
            var sc=top*($mainH-$txtH)/topMax;
            $mainTxt.css("top",-sc);
            $bar.css("top",top);
            return false;
        });
        // 点击滚动条动画
        $scroll.click(function(e){
            if(e.target===this){
                var y=e.clientY-$(this).offset().top+$(document).scrollTop(),
                top=$bar.position().top;
                top=y<top?top-=35:top+=35;
                top=Math.min(top,topMax);
                top=Math.max(top,0);
                var sc=top*($mainH-$txtH)/topMax;
                $mainTxt.stop().animate({"top":-sc},500);
                $bar.stop().animate({"top":top},500);
                return false;
            }
        });
    });
    $popLi.hide();
    $pop.hide().css("opacity",1);
    // 点击弹出全屏窗
    $newVersionLi.click(function(){
        index=$(this).index("li");
        $(document).find("body").addClass("noscroll");
        $pop.show();
        $popLi.eq(index).show();
        // 弹窗切换
        $btn.click(function(){
            var i=$(this).index(".btn");
            if(i){
                index++;
                index%=6;
            }else{
                if(index===0){index=6};
                index--;
            };
            $popLi.eq(index).show().siblings().hide();
        });
        //点击关闭弹窗
        $popClose.click(function(){
            $pop.hide();
            $popLi.eq(index).hide();
            $(document).find("body").removeClass("noscroll");
        });
    });

})();
// 懒加载
(function(){
    var $winH=$(window).scrollTop()+$(window).height(),
        $newVersion=$(".newVersion"),
        $nvTitle=$newVersion.find(".title"),
        $nvLi=$newVersion.find(".newVersionLi ul li"),
        $gameTitle=$(".game").find(".title"),
        $banner=$(".game").find(".bWrap"),
        $footer=$(".footer .fWrap"),
        objArr=[];
    inte($nvTitle,$nvLi,$gameTitle,$banner,$footer);
    $(window).scroll(function(){
        var length=objArr.length;
        $winH=$(window).scrollTop()+$(window).height();
        for(var i=length-1;i>=0;i--){
            var obj=objArr[i];
            if(!obj.ifshow&&$winH>obj.oldTop){
                $(obj).delay($(obj).index()%3*300).animate({
                    "top":"0px",
                    "opacity":1
                },1000);
                objArr[i].ifshow=true;
                objArr.slice(i,1);
            }
        }
    });
    function inte(){
        for(var i=0,length=arguments.length;i<length;i++){
            arguments[i].css({
                top:"100px",
                opacity:0
            });
            arguments[i].each(function(){
                this.ifshow=false;
                this.oldTop=$(this).offset().top;
                objArr.push(this);
            });
        }
    }
})();
// 游戏特色
(function(){
    var $banner=$(".game").find(".banner"),
        $bannerLi=$banner.find("ul li"),
        length=$bannerLi.length,
        $btn=$banner.find(".btn"),
        index=0,
        last=0,
        next=0;
    $btn.click(function(){
        var i=$(this).index(".banner .btn");
        if(i){
            next=index;
            index--;
            if(index<0){index=length-1};
            last=index-1;
            if(last<0){last=length-1};
        }else{
            last=index;
            index++;
            index%=length;
            next=index+1;
            next%=length;
        }
        $bannerLi.eq(index).addClass("on").siblings().removeClass("on");
        $bannerLi.eq(last).addClass("last").siblings().removeClass("last");
        $bannerLi.eq(next).addClass("next").siblings().removeClass("next");
    });
    $bannerLi.click(function(){
            index=$(this).index();
            last=index-1;
            if(last<0){last=length-1};
            next=index+1;
            next%=length;
            $bannerLi.eq(index).addClass("on").siblings().removeClass("on");
            $bannerLi.eq(last).addClass("last").siblings().removeClass("last");
            $bannerLi.eq(next).addClass("next").siblings().removeClass("next");
    });
})();
