var app = getApp()
Page({
  data: {
    current: 0,
    shopList: [],
    ptype: '',
    title: '',
    page: 2,
    catId: 0,
    brandId: 0
  },
  showModal: function() {
    // 显示遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
      showModalStatus: true
    })
    setTimeout(function() {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 200)
  },
  hideModal: function() {
    // 隐藏遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
    })
    setTimeout(function() {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export(),
        showModalStatus: false
      })
    }.bind(this), 200)
  },

  //点击加载更多
  getMore: function(e) {
    var that = this;
    var page = that.data.page;
    var data = {
      page: page,
      ptype: that.data.ptype,
      cat_id: that.data.catId,
      brand_id: that.data.brandId
    };

    app.util.request(app.config.ShopList,data,'post').then(function(res){
      var prolist = res.data.pro;
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
        shopList: that.data.shopList.concat(prolist)
      });
        //endInitData
    });
  },

  onLoad: function(options) {
    console.log(options)
    //更改头部标题
    wx.setNavigationBarTitle({
      title: options.cat_name || '小史严选',
    });

    //页面初始化 options为页面跳转所带来的参数
    var cat_id = options.cat_id;
    var ptype = options.ptype;
    var brandId = options.brandId;
    var that = this;
    that.setData({
      ptype: ptype,
      catId: cat_id,
      brandId: brandId
    });

    //请求数据
    var data = {
      cat_id: cat_id,
      ptype: ptype,
      brand_id: brandId
    };
    app.util.request(app.config.ShopList, data, 'post').then(function (res) {
      var shoplist = res.data.pro;
      that.setData({
        shopList: shoplist
      })
    });

  },
  //详情页跳转
  lookdetail: function(e) {
    console.log(e)
    var lookid = e.currentTarget.dataset;
    console.log(e.currentTarget.dataset);
    wx.navigateTo({
      url: "../index/detail?id=" + lookid.id
    })
  },
  switchSlider: function(e) {
    this.setData({
      current: e.target.dataset.index
    })
  },
  changeSlider: function(e) {
    this.setData({
      current: e.detail.current
    })
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
  }

})