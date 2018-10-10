
/**
 *常用工具
 */
const util = require('./utils/util.js');

/**
 * 数据接口
 */
const config = require('./utils/config.js');


App({
  data: {
    appId:"wxf1f43b8def468390",
    appKey:"b6769dd2072eb917282170dc8ee91a66",
    userId:3
  },

  util: util,
  config: config, 

  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs);
    //login
    this.getUserInfo();
  },
  getUserInfo:function(cb){
    var that = this
    if (this.globalData.userInfo) {

      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.login({
        success: function (res) {
          var code = res.code;
          //get wx user simple info
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo);
              that.getUserSessionKey(code);
            },
            error:function(res){

            }
          });
        }
      });
    }
  },
  
  getUserSessionKey:function(code){
    //用户的订单状态
    var that = this;

    util.request(config.OrderStatus,{code:code},'post').then(function(res){

      console.log('OrderStatus======')
      console.log(res)
      //--init data        
      var data = res.data;
      if(data && data != ''){
        if (data.status == 0) {
          wx.showToast({
            title: data.err,
            duration: 2000
          });
          return false;
        }
        that.globalData.userInfo['sessionId'] = data.session_key;
        that.globalData.userInfo['openid'] = data.openid;
        that.onLoginUser();
      }
    });
  },

  onLoginUser:function(){
    var that = this;
    var user = that.globalData.userInfo;
    var postData = {
      SessionId: user.sessionId,
      gender: user.gender,
      NickName: user.nickName,
      HeadUrl: user.avatarUrl,
      openid: user.openid
    };
    console.log('postData=============')
    console.log(postData)

    util.request(config.Authlogin, postData,'post').then(function(res){
      
      console.log('Authlogin============')
      console.log(res)
      //--init data        
      var data = res.data.arr;
      var status = res.data.status;
      if (status != 1) {
        wx.showToast({
          title: res.data.err,
          duration: 3000
        });
        return false;
      }
      that.globalData.userInfo['id'] = data.ID;
      that.globalData.userInfo['NickName'] = data.NickName;
      that.globalData.userInfo['HeadUrl'] = data.HeadUrl;
      var userId = data.ID;
      if (!userId) {
        wx.showToast({
          title: '登录失败！',
          duration: 3000
        });
        return false;
      }
      that.d.userId = userId;
    });
  },

  getOrBindTelPhone:function(returnUrl){
    var user = this.globalData.userInfo;
    if(!user.tel){
      wx.navigateTo({
        url: 'pages/binding/binding'
      });
    }
  },

 globalData:{
    userInfo:null
  }

});