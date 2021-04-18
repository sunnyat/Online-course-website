window.addEventListener("load", function () {
  var videoflag = true;
  var video = document.querySelector("video");   //获取视频
  var video_duration;            //声明一个全局变量 （视频总时长）
  video.addEventListener("canplay", function () {      //视频加载完成事件
    video_duration = video.duration;        //获取视频总时长  (vd  video duration)
    vd_m = Math.floor(video_duration / 60);   //得到分钟
    vd_s = Math.floor(video_duration % 60);   //得到秒
    vd_m = vd_m >= 10 ? vd_m : "0" + vd_m;    //当结果为一位数时，在前面加一个字符0
    vd_s = vd_s >= 10 ? vd_s : "0" + vd_s;
    $(".duration").text(vd_m + ":" + vd_s);
  })
  video.addEventListener("timeupdate", function () {         //视频播放事件
    vc_m = Math.floor(this.currentTime / 60);
    vc_s = Math.floor(this.currentTime % 60);
    vc_m = vc_m >= 10 ? vc_m : "0" + vc_m;
    vc_s = vc_s >= 10 ? vc_s : "0" + vc_s;
    $(".currentTime").text(vc_m + ":" + vc_s);
    $(".playprogress").width(this.currentTime / video_duration * 100 + "%")   //更改进度条遮罩的尺寸
  })

  video.addEventListener("ended",function(){   //视频播放完成事件
    videoflag = true;
      $(".play").show();
      $(".switch").html('&#xe623')
  })

  // 视频播放控制
  $(".video_box video").click(function () {
    if (videoflag) {
      $(this).trigger("play");      //播放视频
      videoflag = false;
      $(".play").hide();
      $(".switch").html('&#xe693');
    } else {
      $(this).trigger("pause");     //暂停视频
      videoflag = true;
      $(".play").show();
      $(".switch").html('&#xe623')
    }
  })
  $(".play").click(function () {
    $(".video_box video").trigger("play");
    videoflag = false;
    $(".play").hide();
    $(".switch").html('&#xe693');
  })
  $(".switch").click(function () {
    if (videoflag) {
      $(".video_box video").trigger("play");      //播放视频
      videoflag = false;
      $(".play").hide();
      $(".switch").html('&#xe693');
    } else {
      $(".video_box video").trigger("pause");     //暂停视频
      videoflag = true;
      $(".play").show();
      $(".switch").html('&#xe623')
    }
  })

  var enlarge_flag = true;      //判断放大缩小变量
  var video_box = document.querySelector(".video");   //获取视频和控件盒子（不包括标题）
  var time=document.querySelector(".time");      //获取进度条盒子
  var time_w=0;        
  var page_w=document.body.offsetWidth;
  
  for(var i=0;;i++){             //获取控件盒子中除了进度条以外其他盒子的大小（放大之后要用到）
    var s_w=$(".time").siblings().eq(i).width();       
    if(typeof(s_w)=="number"){
      time_w+=s_w;
    }else{
      break;
    }
  };  
  
  
  var m_timer=null;    
  $(".enlarge").click(function () {
    if (enlarge_flag) {
      video_box.requestFullscreen();  //全屏
      $(this).html("&#xe6db;");     //更改图标
      video.style.height = '100%';   //因为放大的是盒子所以要将视频高度设置成100%
      enlarge_flag = false;       
      time.style.width=page_w-time_w-16+'px';    //进度条盒子的宽度
      $(".video").mousemove(function(){     //全屏状态下鼠标移动事件
        $(".controls").show();              //先将控件显示
        clearInterval(m_timer);             //移动时清除定时器
        m_timer=setInterval(function(){     //判断鼠标是否静止（静止2.5s时就隐藏控件）
          $(".controls").hide();
        },2500)
      })
    }else{
      video.style.height='';                 //清除行内样式（也就是恢复默认样式）
      enlarge_flag = true;
      $(this).html("&#xe63d;")
      document.exitFullscreen();
    }
  })
  window.addEventListener("resize",function(){    //因为按下esc也可以退出全屏
    if(video.clientWidth<page_w){                 //判断当前是进入全屏还是取消全屏
      video.style.height = '';         //恢复高度
      enlarge_flag = true;
      $(this).html("&#xe63d;")
      time.style.width='';             //恢复默认宽度
      clearInterval(m_timer);
      $(".video").off("mousemove");    //解绑鼠标移动事件
      $(".controls").show();
    }
  })


  //进度条
  $(".progress").mouseenter(function(){
    $(".slider").show();              //鼠标经过时显示滑块
  })
  $(".progress").mouseleave(function(){
    $(".slider").hide();
  })
  $(".progress").click(function (e) {
    var ps_w = $(this).width();
    var ps_x = $(this).offset().left;   //获取进度条的距离窗口左边的距离(后面的数字是进度条的在父元素中的左定位)
    var w = e.pageX - ps_x;   //获取鼠标点击在进度条的位置
    $(".playprogress").width(w + "px");
    video.currentTime = w / ps_w * video_duration;    //改变视频的播放位置
  })

  // 音量控制
  var volume_flag = true;
  var volume;
  $(".volume_btn").click(function () {   //声音开关
    if (volume_flag) {
      volume = video.volume;
      volume_flag = false;
      video.volume = 0;
      $(this).html("&#xe63f;")
      $(".volume_range").val(0);
    } else {
      volume_flag = true;
      video.volume = volume;
      $(".volume_range").val(volume * 100);
      $(this).html("&#xe63e;")
    }
  })
  $(".volume_range").change(function () {    //range表单调整音量
    volume = $(this).val() / 100;
    if (volume == 0) {         //当音量为0时改变图标
      $(".volume_btn").html("&#xe63f;")
    } else {
      $(".volume_btn").html("&#xe63e;")
    }
    video.volume = volume;
  })

  //播放倍速
  $(".speed").mouseenter(function () {
    $(".speed ul").show();
  })
  $(".speed").mouseleave(function () {
    $(".speed ul").hide();
  })
  $(".speed_btn ul li").click(function () {
    var speed = $(this).html();
    $(".speed span").html(speed)
    speed = parseFloat(speed.split("x")[0]);    //将x作为分隔符，分割成字符串数组
    video.playbackRate = speed;
  })
})