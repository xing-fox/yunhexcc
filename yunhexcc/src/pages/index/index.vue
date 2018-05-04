<template>
<div class="page">
  <div class="page__bd page__bd_spacing">
    <swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration" :circular="circular" @change="swiperChange" @animationfinish="animationfinish">
      <div v-for="(item, index) in imgUrls" :key="index" @click="changeDetails">
      <swiper-item>
        <image :src="item" class="slide-image"/>
      </swiper-item>
      </div>
    </swiper>
    <TempleList></TempleList>
  </div>
</div>
</template>

<script>
// import fly from '@/utils/fly'
// import wxp from 'minapp-api-promise'
import TempleList from '@/components/yhtempIntro'
export default {
  data () {
    return {
      cusTomerData: {
        name: '你好'
      },
      indicatorDots: true,
      autoplay: true,
      interval: 5000,
      duration: 900,
      circular: true,
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
  mounted () {
    this.init()
    wx.setNavigationBarTitle({ title: '潮机精选'})
  },
  methods: {
    changeDetails () {
      wx.navigateTo({
        url: '/pages/details/main'
      })
    },
    init () {
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
  }
}
</script>

<style lang="less" scoped>
  page{
    background: #f3f5f9;
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
