var app = getApp();
// pages/user/shoucang.js
Page({
  data:{
    page:1,
    productData:[],
  },
  onLoad:function(options){
    this.loadProductData();
  },
  onShow:function(){
    // 页面显示
    this.loadProductData();
  },
  removeFavorites:function(e){
    var that = this;
    var ccId = e.currentTarget.dataset.favId;

    wx.showModal({
      title: '提示',
      content: '你确认移除吗',
      success: function(res) {

        res.confirm && app.util.request(app.config.RemoveFavorites,{
          ccId: ccId
        },'post')
        .then(function(res){
          //--init data
          var data = res.data;
          console.log(data);
          //todo
          if (data.result == 'ok') {
            that.data.productData = 0;
            that.loadProductData();
          }
        });
      }
    });
  },

  loadProductData:function(){
    // var that = this;
    // console.log(this.data);

    // app.util.request(app.config.AddFavorites,)
    // wx.request({
    //   url: app.data.hostUrl + '/Api/Product/col',
    //   method:'post',
    //   data: {
    //     userId: app.data.userId,
    //     pageindex: that.data.page,
    //     pagesize:100,
    //   },
    //   header: {
    //     'Content-Type':  'application/x-www-form-urlencoded'
    //   },
    //   success: function (res) {
    //     console.log(res);
    //     //--init data
    //     var data = res.data.data;
    //     that.initProductData(data);

    //     that.setData({
    //       productData:that.data.productData.concat(data),
    //     });
    //     //endInitData
    //   },
    // });
  },
  initProductData: function (data){
    for(var i=0; i<data; i++){
      //console.log(data[i]);
      var item = data[i];

      item.Price = item.Price/100;
      item.ImgUrl = app.data.hostImg + item.ImgUrl;

    }
  },
});