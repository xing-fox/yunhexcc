<template>
<div class="page">
  <div class="page__bd page__bd_spacing">
    <!-- <swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration" :circular="circular" @change="swiperChange" @animationfinish="animationfinish">
      <div v-for="(item, index) in imgUrls" :key="index" @click="changeDetails">
      <swiper-item>
        <image :src="item" class="slide-image"/>
      </swiper-item>
      </div>
    </swiper> -->
    <div class="newProduct" v-for="(item, index) in imgUrls" :key="index">
      <img :src="item" alt="">
      <div class="proInduce">宁波云赫科技有限公司出品</div>
      <div>
        <span>宁波云赫科技有限公司</span>
      </div>
    </div>
    <TempleList></TempleList>
  </div>
</div>
</template>

<script>
import TempleList from '@/components/yhtempIntro'
import Fly from 'flyio/dist/npm/wx' 
const fly = new Fly
export default {
  pqge () {},
  data () {
    return {
      // indicatorDots: true,
      // autoplay: true,
      // interval: 5000,
      // duration: 900,
      // circular: true,
      imgUrls: [
        'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
        'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
      ]
    }
  },
  components: {
    TempleList
  },
  created () {
    wx.setNavigationBarTitle({ title: '潮机精选'})
  },
  methods: {
    // changeDetails () {
    //   wx.navigateTo({
    //     url: '/pages/details/main'
    //   })
    // },
    init () {
      /* 登录接口 */
      wx.request({
        url: 'https://www.lexbst.com/server.php/api/v1/supplier/main?agent_id=1&main=1&scale=0',
        data: {},
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          console.log(res)
        },
        error: function (res) {
          console.log(res)    
        }
      })
    }
  },
  onLoad () {
    let self = this
    wx.login({
      success (res) {
        if (res.code) {
          self.$http.Xcclogin({
            'code': res.code
          }).then(res => {
            console.log(res)
          })
        }
      }
    })
  }
}
</script>

<style lang="less" scoped>
  .page{
    background: #f3f5f9;
  }
  .newProduct{
    font-size: 0;
    width: 100%;
    margin: 0 0 .2rem 0;
    img{
      width: 100%;
    }
    .proInduce{
      color: #333;
      font-size: .28rem;
      height: .8rem;
      line-height: .8rem;
      padding: 0 0 0 .2rem;
      background: #fff;
    }
  }
  .swiper{
    display: block;
    height: 3.52rem;
  }
  .slide-image {
    width: 100%;
    height: 100%;
  }
</style>
