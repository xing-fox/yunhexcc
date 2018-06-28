import Vue from 'vue'
import App from './App'
import store from './store'
import http from '@/utils/request'

require ('./weui.css')
require ('./reset.css')

Vue.prototype.$http = http
Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue({
  store,
  ...App
})
app.$mount()

export default {
  config: {
    pages: ['^pages/index/main', 'pages/mine/main'],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: '潮机优选',
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
        {
          text: '潮品狂欢购',
          pagePath: 'pages/activity/main',
          iconPath: 'static/images/activity.png',
          selectedIconPath: 'static/images/activity_1.png'
        },
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
