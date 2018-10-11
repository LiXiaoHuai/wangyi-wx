// pages/panic/panic.js
var app = getApp();
Page({
  data:{
    vou:[],
  },
   getvou:function(e){
    var vid = e.currentTarget.dataset.vid;
    var uid = app.data.userId;

    app.util.request(app.confog.GetVoucher,{
      vid:vid,uid:uid
    },'post')
    .then(function(res){
      var status = res.data.status;
      if(status==1){
        wx.showToast({
          title: '领取成功！',
          duration: 2000
        });
      }else{
        wx.showToast({
          title: res.data.err,
          duration: 2000
        });
      }
    });
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var that = this;
    app.util.request(app.config.VoucherList,{},'post')
    .then(function(res){
      var vou = res.data.vou;
      that.setData({
        vou:vou,
      });
    });
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
},
      //右上角分享按钮
    onShareAppMessage: function () {
    return {
      title: '优惠券',
	  desc: '云端易购-重庆农村电商领导品牌',
      path: '/pages/ritual/ritual',
	  data:{data}
    }
 }
})