var app = getApp();
// pages/order/detail.js
Page({
  data:{
    orderId:0,
    orderData:{},
    proData:[],
  },
  onLoad:function(options){
    this.setData({
      orderId: options.orderId,
    })
    this.loadProductDetail();
  },
  loadProductDetail:function(){
    var that = this;

    app.util.request(app.config.OrderDetail,{
      order_id: that.data.orderId
    },'post')
    .then(function(res){
      var status = res.data.status;
        if(status==1){
          var pro = res.data.pro;
          var ord = res.data.ord;
          that.setData({
            orderData: ord,
            proData:pro
          });
        }else{
          wx.showToast({
            title: res.data.err,
            duration: 2000
          });
        }
    });
  },

})