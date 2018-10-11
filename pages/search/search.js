var app = getApp();
// pages/search/search.js
Page({
  data:{
    focus:true,
    hotKeyShow:true,
    historyKeyShow:true,
    searchValue:'',
    page:0,
    productData:[],
    historyKeyList:[],
    hotKeyList:[]
  },
  onLoad:function(options){
    var that = this;

    app.util.request(app.config.SearchIndex,{
      uid:app.data.userId
    },'post')
    .then(function(res){
      var remen = res.data.remen;
      var history = res.data.history;

      that.setData({
        historyKeyList:history,
        hotKeyList:remen,
      });
    });

  },
  onReachBottom:function(){
      //下拉加载更多多...
      this.setData({
        page:(this.data.page+10)
      })
      
      this.searchProductData();
  },
  doKeySearch:function(e){
    var key = e.currentTarget.dataset.key;
    this.setData({
      searchValue: key,
       hotKeyShow:false,
       historyKeyShow:false,
    });

    this.data.productData.length = 0;
    this.searchProductData();
  },
  doSearch:function(){
    var searchKey = this.data.searchValue;
    if (!searchKey) {
        this.setData({
            focus: true,
            hotKeyShow:true,
            historyKeyShow:true,
        });
        return;
    };

    this.setData({
      hotKeyShow:false,
      historyKeyShow:false,
    })
    
    this.data.productData.length = 0;
    this.searchProductData();

    this.getOrSetSearchHistory(searchKey);
  },
  getOrSetSearchHistory:function(key){
    var that = this;
    wx.getStorage({
      key: 'historyKeyList',
      success: function(res) {
          console.log(res.data);

          //console.log(res.data.indexOf(key))
          if(res.data.indexOf(key) >= 0){
            return;
          }

          res.data.push(key);
          wx.setStorage({
            key:"historyKeyList",
            data:res.data,
          });

          that.setData({
            historyKeyList:res.data
          });
      }
    });
  },
  searchValueInput:function(e){
    var value = e.detail.value;
    this.setData({
      searchValue:value,
    });
    if(!value && this.data.productData.length == 0){
      this.setData({
        hotKeyShow:true,
        historyKeyShow:true,
      });
    }
  },
  searchProductData:function(){
    var that = this;

    app.util.request(app.config.Searchs,{
      keyword:that.data.searchValue,
      uid: app.data.userId,
      page:that.data.page
    },'post')
    .then(function(res){
      var data = res.data.pro;
      that.setData({
        productData:that.data.productData.concat(data),
      });
    });
  }
});