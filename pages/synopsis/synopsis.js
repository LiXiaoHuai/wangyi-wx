// pages/synopsis/synopsis.js
var app = getApp();
//引入这个插件，使html内容自动转换成wxml内容
var WxParse = require('../../wxParse/wxParse.js');
Page({
  data:{
    web_id:''
  },
  onLoad:function(options){
   
    var that = this;
    that.setData({
      web_id: options.web_id
    })

  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    var that = this;
    app.util.request(app.config.AboutUs, { web_id: that.data.web_id },'post').then(function (res) {
      var content = res.data.content;
      WxParse.wxParse('content', 'html', content, that, 10);
    });
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})