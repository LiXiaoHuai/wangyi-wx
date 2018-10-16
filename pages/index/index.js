var app = getApp();

Page({
  data: {
    imgUrls: [],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    circular: true,
    goodsCount: [],
    productData: [],
    proCat: [],
    page: 2,
    index: 2,
    brand: [],
    // 滑动
    imgUrl: [],
    kbs: [],
    lastcat: [],
    category: [],
    newGoods: [],
    hotGoods: [],
    topics: [],
    floorGoods: [],
    channel: [],

    //优惠券
    isCoupon: false
  },
  //跳转商品列表页   
  listdetail: function(e) {
    console.log(e.currentTarget.dataset.title)
    wx.navigateTo({
      url: '../listdetail/listdetail?title=' + e.currentTarget.dataset.title,
      success: function(res) {
        // success
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  },

  //点击加载更多
  getMore: function(e) {
    var that = this;
    var page = that.data.page;

    app.util.request(app.config.IndexGetMore,{page},'post')
    .then(function(res){
      var prolist = res.data.prolist;
      if (prolist == '') {
        wx.showToast({
          title: '没有更多数据！',
          duration: 2000
        });
        return false;
      }
      //that.initProductData(data);
      that.setData({
        page: page + 1,
        productData: that.data.productData.concat(prolist)
      });
    });
  },

  changeIndicatorDots: function(e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },

  changeAutoplay: function(e) {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },

  intervalChange: function(e) {
    this.setData({
      interval: e.detail.value
    })
  },

  durationChange: function(e) {
    this.setData({
      duration: e.detail.value
    })
  },

  //onload 并不是每次进入界面都会运行
  onLoad: function(options) {
    var that = this;
    app.util.request(app.config.IndexUrl,{},'post').then(function(res){

      console.log('indexData===========');
      console.log(res);
      var ggtop = res.data.ggtop;
      var procat = res.data.procat;
      var prolist = res.data.prolist;
      var brand = res.data.brand;
      var goodsCount = res.data.goodsCount;
      var category = res.data.category;
      var newGoods = res.data.newGoods;
      var hotGoods = res.data.hotGoods;
      var topics = res.data.topic;
      var channel = res.data.channel;
      that.setData({
        imgUrls: ggtop,
        proCat: procat,
        productData: prolist,
        brand: brand,
        goodsCount: goodsCount,
        category: category,
        newGoods: newGoods,
        hotGoods: hotGoods,
        topics: topics || [],
        channel: channel || [],
      });
    });

  },
  onShareAppMessage: function() {
    return {
      title: '',
      desc: '',
      path: '/pages/index/index',
      success: function(res) {
        // 分享成功
      },
      fail: function(res) {
        // 分享失败
      }
    }
  }
});