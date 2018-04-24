import Vue from 'vue'
import App from './App'
import store from './store'

require ('./weui.css')
require ('./reset.css')

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue({
  store,
  App
})
app.$mount()

export default {
  // 这个字段走 app.json
  config: {
    // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
    pages: ['^pages/index/main', 'pages/details/main', 'pages/logs/main', 'pages/cjjx/main', 'pages/news/main', 'pages/mine/main'],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: '潮机店猿',
      navigationBarTextStyle: 'black'
    },
    tabBar: {
      color: '#666666',
      selectedColor: '#000000',
      borderStyle: 'white',
      backgroundColor: '#f8f9fb',
      list: [
        {
          text: '首页',
          pagePath: 'pages/index/main',
          iconPath: 'static/images/home.png',
          selectedIconPath: 'static/images/home_1.png'
        },
        // {
        //   text: '关注',
        //   pagePath: 'pages/follow/main',
        //   iconPath: 'static/images/star.png',
        //   selectedIconPath: 'static/images/star_1.png'
        // },
        // {
        //   text: '活动',
        //   pagePath: 'pages/activity/main',
        //   iconPath: 'static/images/star.png',
        //   selectedIconPath: 'static/images/star_1.png'
        // },
        // {
        //   text: '消息',
        //   pagePath: 'pages/shops/main',
        //   iconPath: 'static/images/news.png',
        //   selectedIconPath: 'static/images/news_1.png'
        // },
        {
          text: '我的',
          pagePath: 'pages/mine/main',
          iconPath: 'static/images/me.png',
          selectedIconPath: 'static/images/me_1.png'
        }
      ]
    }
  }
}
