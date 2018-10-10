
// 数据请求地址
const hostUrl = 'http://www.wangyi.com/index.php';

var config = {

  // // 下面的地址配合云端 Server 工作
  // host: `https://${host}/`, 

  // // 数据请求接口地址
  // requestUrl: `https://${host}/Huod/`,

  // // 百度AK填写，用于获取地理位置 根据实际地区申请获取自己本地区的AK秘钥
  // baiduAk: ''

  //首页接口
  IndexUrl: hostUrl + '/Api/Index/index',

  //意见反馈
  Feedback: hostUrl + '/Api/User/feedback',
  //关于我们
  AboutUs: hostUrl + '/Api/Web/web',
  //卡券
  Voucher: hostUrl + '/Api/User/voucher',
  //获取地址列表
  Address: hostUrl + '/Api/Address/index',
  //设置默认地址
  SetDefaultAddress: hostUrl + '/Api/Address/set_default',
  //删除地址
  DelAddress: hostUrl + '/Api/Address/del_adds',
  //添加地址
  AddAddress: hostUrl + '/Api/Address/add_adds',
  //获取省级城市
  GetProvince: hostUrl + '/Api/Address/get_province',
  GetCity: hostUrl + '/Api/Address/get_city',
  GetArea: hostUrl + '/Api/Address/get_area',
  GetCode: hostUrl + '/Api/Address/get_code',

  //用户订单状态
  OrderStatus: hostUrl + '/Api/Login/getsessionkey',
  //获取用户订单信息
  OrderInfo: hostUrl + '/Api/User/getorder',
  //用户订单操作
  OrderAction: hostUrl + '/Api/Order/orders_edit',
  //获取订单列表
  OrderList: hostUrl + '/Api/Order/index',
  //
  LoadReturnOrderList: hostUrl + '/Api/Order/order_refund',
  //订单支付
  Wxpay: hostUrl + '/Api/Wxpay/wxpay',



  //用户登录
  Authlogin: hostUrl + '/Api/Login/authlogin',



  //获取专题数据
  TopicList: hostUrl + '/Api/Zhuti/index',



  //获取分类信息
  CatInfo: hostUrl + '/Api/Category/index',
  //根据id获取分类列表
  CatList: hostUrl + '/Api/Category/getcat',



  //获取商品列表加载更多
  ShopListGetMore: hostUrl + '/Api/Product/get_more',
  ShopList: hostUrl + '/Api/Product/lists',



  //购物车页面数据加载
  CartIndex: hostUrl + '/Api/Shopping/index',
  //获取购物车数据
  Carts: hostUrl + '/Api/Shopping/up_cart',
  //从购物车移除
  RemoveShopCard: hostUrl + '/Api/Shopping/delete',



  //商品详情页
  ProductIndex: hostUrl + '/Api/Product/index',
  //添加到收藏
  AddFavorites: hostUrl + '/Api/Product/col',
  //移除收藏
  RemoveFavorites: hostUrl + 'Api/productZBT/RemoveCollectCategory',
  //添加到购物车
  AddShopCart: hostUrl + '/Api/Shopping/add',

};

module.exports = config;



