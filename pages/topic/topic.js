var app = getApp();
Page({
  data: {
    topiclist: []
  },

  onLoad: function(options) {
    var that = this;

    app.util.request(app.config.TopicList).then(function(res) {
      var topiclist = res.data.topiclist;
      that.setData({
        topiclist: res.data.topiclist,
      });
    });

  },
  onReady: function() {
    // 页面渲染完成
  },
  onShow: function() {
    // 页面显示
  },
  onHide: function() {
    // 页面隐藏
  },
  onUnload: function() {
    // 页面关闭
  },
  onShareAppMessage: function() {
    return {
      title: '网易严选',
      desc: '网易严选主题',
      path: '/pages/topic/topic',
      success: function(res) {
        // 分享成功
      },
      fail: function(res) {
        // 分享失败
      }
    }
  }
})