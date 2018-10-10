var app = getApp();
Page({
 data: {
    shengArr: [],//省级数组
    shengId: [],//省级id数组
    shiArr: [],//城市数组
    shiId: [],//城市id数组
    quArr: [],//区数组
    shengIndex: 0,
    shiIndex: 0,
    quIndex: 0,
    mid: 0,
    sheng:0,
    city:0,
    area:0,
    code:0,
    cartId:0
  },
  formSubmit: function (e) {
    var adds = e.detail.value;
    var cartId = this.data.cartId;

    app.util.request(app.config.AddAddress,{
      user_id: app.data.userId,
      receiver: adds.name,
      tel: adds.phone,
      sheng: this.data.sheng,
      city: this.data.city,
      quyu: this.data.area,
      adds: adds.address,
      code: this.data.code,
    },'post')
    .then(function(res){
      // success
      var status = res.data.status;
      if (status == 1) {
        wx.showToast({
          title: '保存成功！',
          duration: 2000
        });
      } else {
        wx.showToast({
          title: res.data.err,
          duration: 2000
        });
      }
      wx.redirectTo({
        url: 'user-address/user-address?cartId=' + cartId
      });
    });
  },
  onLoad: function (options) {
    // 生命周期函数--监听页面加载
    var that = this;
    that.setData({
      cartId: options.cartId
    })
    //获取省级城市

    app.util.request(app.config.GetProvince,{},'post')
    .then(function(res){
      var status = res.data.status;
      var province = res.data.list;
      var sArr = [];
      var sId = [];
      sArr.push('请选择');
      sId.push('0');
      for (var i = 0; i < province.length; i++) {
        sArr.push(province[i].name);
        sId.push(province[i].id);
      }
      that.setData({
        shengArr: sArr,
        shengId: sId
      })
    });
  },

  bindPickerChangeshengArr: function (e) {
    this.setData({
      shengIndex: e.detail.value,
      shiArr: [],
      shiId: [],
      quArr:[],
      quiId: []
    });
    var that = this;

    app.util.request(app.config.GetCity, { sheng: e.detail.value},'post')
    .then(function(res){
      // success
      var status = res.data.status;
      var city = res.data.city_list;

      var hArr = [];
      var hId = [];
      hArr.push('请选择');
      hId.push('0');
      for (var i = 0; i < city.length; i++) {
        hArr.push(city[i].name);
        hId.push(city[i].id);
      }
      that.setData({
        sheng: res.data.sheng,
        shiArr: hArr,
        shiId: hId
      })
    });
  },
  bindPickerChangeshiArr: function (e) {
    this.setData({
      shiIndex: e.detail.value,
      quArr:[],
      quiId: []
    })
    var that = this;
    app.util.request(app.config.GetArea,{
      city: e.detail.value,
      sheng: this.data.sheng
    },'post')
    .then(function(res){
      var status = res.data.status;
      var area = res.data.area_list;

      var qArr = [];
      var qId = [];
      qArr.push('请选择');
      qId.push('0');
      for (var i = 0; i < area.length; i++) {
        qArr.push(area[i].name)
        qId.push(area[i].id)
      }
      that.setData({
        city: res.data.city,
        quArr: qArr,
        quiId: qId
      })
    });
  },
  bindPickerChangequArr: function (e) {
    console.log(this.data.city)
    this.setData({
      quIndex: e.detail.value
    });
    var that = this;

    app.util.request(app.config.GetCode,{
      quyu: e.detail.value,
      city: this.data.city
    },'post')
    .then(function(res){
      that.setData({
        area: res.data.area,
        code: res.data.code
      });
    });
  }
});