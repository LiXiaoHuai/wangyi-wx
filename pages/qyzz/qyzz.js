// pages/synopsis/synopsis.js
var app = getApp();
//引入这个插件，使html内容自动转换成wxml内容
var WxParse = require('../../wxParse/wxParse.js');
Page({
  data:{
  },

  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    //更改头部标题
    var title = options.title;
    wx.setNavigationBarTitle({
      title: title,
    });
    
    var that = this;
    var wedId = options.wedId;

    app.util.request(app.config.AboutUs,{
      web_id: 2
    },'post')
    .thne(function(res){
      var content = res.data.content;
      WxParse.wxParse('content', 'html', content, that, 10);
    })

  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})