<template>
<div class="page">
    <div class="page__bd page__bd_spacing">
        <swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration" :circular="circular" @change="swiperChange" @animationfinish="animationfinish">
            <div v-for="(item, index) in imgUrls" :key="index">
            <swiper-item>
                <image :src="item" class="slide-image" />
            </swiper-item>
            </div>
        </swiper>
        <div class="boxList">
            <div class="boxLeft">
                <img src="http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg">
            </div>
            <div class="boxRight">
                <div class="boxname">
                    由各种物质组成的巨型球状天体，叫做星球
                </div>
                <div class="boxSite">
                    安徽省合肥市
                </div>
                <div class="boxPrice">
                    ¥3000
                </div>
            </div>
        </div>
        <div class="boxList">
            <div class="boxLeft">
                <img src="http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg">
            </div>
            <div class="boxRight">
                <div class="boxname">
                    <text>由各种物质组成的巨型球状天体，叫做星球巨型球状天体，叫做星球巨型球状天体，叫做星球</text>
                </div>
                <div class="boxSite">
                    安徽省合肥市
                </div>
                <div class="boxPrice">
                    ¥3000
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
  data () {
    return {
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
  mounted () {
    this.init()
    wx.setNavigationBarTitle({ title: '潮机精选'})
  },
  methods: {
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

<style>
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
  .boxList{
    width: 100%;
    height: 2.72rem;
    background: #fff;
    margin-bottom: .12rem;
    display: flex;
  }
  .boxLeft{
    width: 2.2rem;
    height: 2.2rem;
    box-sizing: border-box;
    border: 1px solid #ddd;
    margin: .26rem .16rem 0 .2rem;
  }
  .boxLeft img{
    display: inline-block;
    width: 100%;
    height: 100%;
  }
  .boxRight{
    flex: 1;
  }
  .boxRight .boxname{
    width: 100%;
    color: #222;
    font-size: .32rem;
    letter-spacing: 0;
    line-height: .44rem;
    margin: .26rem 0 .24rem 0;
    display: -webkit-box;
    word-break: break-all;
    -webkit-box-orient: vertical;
    -webkit-line-clamp:2;
    overflow: hidden;
    text-overflow:ellipsis;
  }
  .boxRight .boxSite{
    color: #999;
    font-size: .26rem;
    letter-spacing: 0;
    line-height: .36rem;
  }
  .boxRight .boxPrice{
    font-size: .34rem;
    color: #FF2E2E;
    line-height: .48rem;
    margin: .24rem 0 0 0;
  }
</style>
