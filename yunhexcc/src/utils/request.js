import Fly from 'flyio/dist/npm/wx'
const fly = new Fly

fly.interceptors.request.use((config,promise)=>{
  wx.showLoading({ title: '小猿正在加载...' })
  config.headers["X-Tag"]="flyio"
  return config
})

export function request (url, params) {
  return new Promise((resolve, reject) => {
    fly.request(url, params).then(response => {
      wx.hideLoading() 
      resolve(response)
    }, err => {
      wx.hideLoading()
      wx.showToast({
        title: err.message,
        icon: 'none'
      })
      reject(err)
    }).catch((error) => {
      reject(error)
    })
  })
}

const env = process.env.NODE_ENV
if (env === 'development') {
  fly.config.baseURL='https://test.xclerk.com'
}

export default {
    /* 微信授权登录 */
    Xcclogin (params) {
      return request('/yunhe/wechat/login/wxminiLogin', params)
    },
    /* 潮机列表 */
    CJJX (params) {
      return request('/yunhe/wechat/goods/goodslist', params)
    },
    /* 所有商品列表 */
    Allproduct (params) {
      return request('/yunhe/wechat/goods/newgoods', params)
    },
    /* 所有商品详情 */
    Goodsinfo (params) {
      return request('/yunhe/wechat/good/goodinfo', params)
    },
    /* 商品详情图文介绍 */
    Goodsdescribe (params) {
      return request('/yunhe/wechat/good/goodsdescribe', params)
    },
    /* 商品详情产品规格 */
    Selectparameter (params) {
      return request('/yunhe/wechat/good/selectparameter', params)
    },
    /* 商品详情产品规格选择 */
    Productdetail (params) {
      return request('/yunhe/wechat/good/productdetail', params)
    },
    /* 商品详情参数描述 */
    Goodsparameter (params) {
      return request('/yunhe/wechat/good/goodsparameter', params)
    },
    /* 我的优惠券 */
    MyCoupon (params) {
      return request('/yunhe/wechat/customer/mycoupon', params)
    },
    /* 可用优惠券 */
    UseCoupon (params) {
      return request('/yunhe/wechat/cart/useCoupon', params)
    },
    /* 选择优惠券 */
    SelectCoupon (params) {
      return request('/yunhe/wechat/cart/selectCoupon', params)
    },
    /* 微信手机号绑定 */
    bindPhone (params) {
      return request('/yunhe/wechat/login/registerWxminiUser', params)
    },
    /* 手机验证码 */
    getIdentifyCode (params) {
      return request('/yunhe/wechat/login/getIdentifyCode', params)
    },
    /* 商品确认付款页面 */
    purchaseNow (params) {
      return request('/yunhe/wechat/cart/purchaseNow', params)
    },
    /* 创建商品订单 */
    buildOrder (params) {
      return request('/yunhe/wechat/order/buildorder', params)
    },
    /* 支付订单接口 */
    paymyOrder (params) {
      return request('/yunhe/wechat/payment/paymyorder', params)
    },
    /* 商品选择收货地址 */
    selectAddress (params) {
      return request('/yunhe/wechat/cart/selectAddress', params)
    },
    /* 收货地址修改默认接口 */
    defaultAddress (params) {
      return request('/yunhe/wechat/customer/defaultAddress', params)
    },
    /* 收货地址修改默认接口 */
    deleteAddress (params) {
      return request('/yunhe/wechat/customer/deleteAddress', params)
    },
    /* 编辑收货地址 */
    modifyAddress (params) {
      return request('/yunhe/wechat/customer/modifyAddress', params)
    },
    /* 新增收货地址 */
    addAddress (params) {
      return request('/yunhe/wechat/user/addaddress', params)
    },
    /* 门店选择 */
    selectShop (params) {
      return request('/yunhe/wechat/cart/selectShop', params)
    },  
    /*我的订单*/
    OrderMyOrder (params) {
    	return request('/yunhe/wechat/orderinfo/myorder', params)
    },
    /*订单详情*/
    OrderOrderDetail (params) {
    	return request('/yunhe/wechat/orderinfo/orderdetail', params)
    },
    /*订单物流*/
    OrderOrderLogistics (params) {
    	return request('/yunhe/wechat/orderinfo/orderlogistics', params)
    },
    /*订单支付*/
    OrderOrderPay (params) {
    	return request('/yunhe/wechat/payment/paymyorder', params)
    },
    /*取消订单*/
    CancelOrder (params) {
    	return request('/yunhe/wechat/order/concelorder', params)
    },
    /*删除订单*/
    deleteorder (params) {
    	return request('/yunhe/wechat/order/deleteorder', params)
    },
    /*确认收货*/
    takenOrder (params) {
    	return request('/yunhe/wechat/order/ordertaken', params)
    },
    /*提醒发货*/
    RemindeOrderPay (params) {
    	return request('/yunhe/wechat/order/remindorderdelivery', params)
    },
    /*我的页面*/
    customerInfo (params) {
    	return request('/yunhe/wechat/customer/customerinfo', params)
    },
    /*优惠券期是否过期*/
    couponAvaliable (params) {
    	return request('/yunhe/wechat/order/couponAvaliable', params)
    },
    /*购物车列表*/
    showCart (params) {
    	return request('/yunhe/wechat/customer/showCart', params)
    },
    /*添加购物车*/
    addCart (params) {
    	return request('/yunhe/wechat/cart/addCart', params)
    },
    /*修改商品数量*/
    modifyNumber (params) {
    	return request('/yunhe/wechat/cart/modifyNumber', params)
    },
    /*修改商品数量*/
    deleteGoods (params) {
    	return request('/yunhe/wechat/cart/deleteGoods', params)
    },
    /*提交购物车*/
    submitcart (params) {
    	return request('/yunhe/wechat/cart/submitcart', params)
    },
    /*直接购买生成订单*/
    generateOrder (params) {
    	return request('/yunhe/wechat/cart/generateOrder', params)
    },
    /*订单评价*/
    evaluateorder (params) {
    	return request('/yunhe/wechat/order/evaluateorder', params)
    },
    /*签到*/
    addrecord (params) {
    	return request('/yunhe/wechat/commonoperator/addrecord', params)
    },
    /*搜索商品*/
    searchgoods (params) {
    	return request('/yunhe/wechat/search/searchgoods', params)
    },
    /*笔记点赞*/
    zanNewNote (params) {
    	return request('/yunhe/wechat/like/like', params)
    },
    /*用户信息*/
    customerInfoUser (params) {
    	return request('/yunhe/wechat/customer/customerinfouser', params)
    },
    /*订单状态数*/
    orderTotal (params) {
    	return request('/yunhe/wechat/customer/customerinfoordertotal', params)
    },
    /*判断手机号是否注册*/
    infoCheck (params) {
    	return request('yunhe/wechat/customer/customerinfocheck', params)
    	},
    /*营业员订单管理*/
    manageorders (params) {
    	return request('yunhe/wechat/order/manageorders', params)
    	}
   
    
}
