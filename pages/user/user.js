// pages/user/user.js
var app = getApp()
Page( {
  data: {
    userInfo: {},
    orderInfo:{},
    projectSource: 'https://github.com/liuxuanqiang/wechat-weapp-mall',
    userListInfo: [ {
        icon: '../../images/iconfont-dingdan.png',
        text: '我的订单',
        isunread: true,
        unreadNum: 2
      }, {
        icon: '../../images/iconfont-card.png',
        text: '我的代金券',
        isunread: false,
        unreadNum: 2
      }, {
        icon: '../../images/iconfont-icontuan.png',
        text: '我的拼团',
        isunread: true,
        unreadNum: 1
      }, {
        icon: '../../images/iconfont-shouhuodizhi.png',
        text: '收货地址管理'
      }, {
        icon: '../../images/iconfont-kefu.png',
        text: '联系客服'
      }, {
        icon: '../../images/iconfont-help.png',
        text: '常见问题'
      }],
       loadingText: '加载中...',
       loadingHidden: false,
  },
  onLoad: function () {
      var that = this
      //调用应用实例的方法获取全局数据
      app.getUserInfo(function(userInfo){
        console.log('userInfo===')
        console.log(userInfo)
        //更新数据
        that.setData({
          userInfo:userInfo,
          loadingHidden: true
        })
      });

      this.loadOrderStatus();
  },
  onShow:function(){
    this.loadOrderStatus();
  },
  loadOrderStatus:function(){
    //获取用户订单数据
    var that = this;

    console.log(app.data.userId)
    app.util.request(app.config.OrderInfo, {userId: app.data.userId},'post').then(function(res){
      //--init data        
      var status = res.data.status;
      if (status == 1) {
        var orderInfo = res.data.orderInfo;
        that.setData({
          orderInfo: orderInfo
        });
      }
    });
  },
  getPhoneNumber: function(e) {   
    console.log(e.detail.errMsg)   
    console.log(e.detail.iv)   
    console.log(e.detail.encryptedData)   
    if (e.detail.errMsg == 'getPhoneNumber:fail user deny'){  
      wx.showModal({  
          title: '提示',  
          showCancel: false,  
          content: '未授权',  
          success: function (res) { }  
      })  
    } else {  
      wx.showModal({  
          title: '提示',  
          showCancel: false,  
          content: '同意授权',  
          success: function (res) { }  
      })  
    }  
  },
  onShareAppMessage: function () {
    return {
      title: '用户信息',
      path: '/pages/index/index',
      success: function (res) {
        // 分享成功
      },
      fail: function (res) {
        // 分享失败
      }
    }
  },

  getUserInfoBtnClick: function (e) {
    var that = this;

    console.log(e)

    if (e.detail.userInfo && e.detail.userInfo != '' && e.detail.userInfo != null) {
      that.setData({
        userInfo: e.detail.userInfo
      });

    } else {
      wx.showToast({
        title: e.detail.errMsg,
        icon: 'none'
      })
    }
  },
})