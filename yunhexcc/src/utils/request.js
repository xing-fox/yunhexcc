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
    /* 商品详情参数描述 */
    Goodsparameter (params) {
      return request('/yunhe/wechat/good/goodsparameter', params)
    }
}