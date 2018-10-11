// pages/address/user-address/user-address.js
var app = getApp()
Page({
  data: {
    address: [],
    radioindex: '',
    pro_id:0,
    num:0,
    cartId:0
  },
  onLoad: function (options) {
    var that = this;
    // 页面初始化 options为页面跳转所带来的参数
    var cartId = options.cartId;
    console.log(app.data.userId);

    that.DataonLoad();

    that.setData({
      cartId: cartId
    })
  },

  onReady: function () {
    // 页面渲染完成
  },
  setDefault: function(e) {
    var that = this;
    var addrId = e.currentTarget.dataset.id;

    app.util.request(app.config.SetDefaultAddress,{
      uid: app.data.userId,
      addr_id: addrId
    },'post')
    .then(function(res){
      // success
      var status = res.data.status;
      var cartId = that.data.cartId;
      if (status == 1) {
        if (cartId) {
          wx.redirectTo({
            url: '../../order/pay?cartId=' + cartId,
          });
          return false;
        }

        wx.showToast({
          title: '操作成功！',
          duration: 2000
        });

        that.DataonLoad();
      } else {
        wx.showToast({
          title: res.data.err,
          duration: 2000
        });
      }
    });

  },
  delAddress: function (e) {
    var that = this;
    var addrId = e.currentTarget.dataset.id;
    wx.showModal({
      title: '提示',
      content: '你确认移除吗',
      success: function(res) {

        res.confirm && app.util.request(app.config,DelAddress,{
          user_id: app.data.userId,
          id_arr: addrId
        },'post')
        .then(function(res){
          // success
          var status = res.data.status;
          if (status == 1) {
            that.DataonLoad();
          } else {
            wx.showToast({
              title: res.data.err,
              duration: 2000
            });
          }
        }); 
      }
    });

  },
  DataonLoad: function () {
    var that = this;
    // 页面初始化 options为页面跳转所带来的参数
    app.util.request(app.config.Address, {
      user_id: app.data.userId
    }, 'post')
      .then(function (res) {
        // success
        var address = res.data.adds;
        console.log(address);
        if (address == '') {
          var address = []
        }

        that.setData({
          address: address
        })
      });
    
  },
})