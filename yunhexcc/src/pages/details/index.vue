<template>
  <div class="page">
    <swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration" :circular="circular" @change="swiperChange" @animationfinish="animationfinish">
      <div v-for="(item, index) in imgUrls" :key="index">
      <swiper-item>
        <image :src="item" class="slide-image" @click="previewFunc(index)"/>
      </swiper-item>
      </div>
    </swiper>
    <div class="proIntro">
      <div class="price">¥23456<span>¥2345</span></div>
      <div class="title">苹果Iphone7</div>
      <div class="content">该片通过给孩子们一次互换身体的特别体验，告诉孩子正视、改变自己的缺点才是成长的意义</div>
    </div>
    <div class="protab">
        <div class='singleList bor-1px-b' @click="changeSpecFunc">
          <span class='title'>发送</span>
          <span>红色 128G 移动版 套餐一</span>
          <div class='arrow_right'></div>
        </div>
        <div class='singleList bor-1px-b' @click="chooseFunc">
          <span class='title'>送至</span>
          <span>{{ address }}</span>
          <div class='arrow_right'></div>
        </div>
        <div class="double">
            <div class="left">
                <span>说明</span>
            </div>
            <div class="right">
                <span>下面是tex-decoration  的使用案例，代码可以直接复制到浏览器上面进行运行</span>
            </div>
        </div>
    </div>
    <div class="proGraphic">
      <ul class="bor-1px-b">
        <li @click="graphicFunc(0)" :class="{active: activeFlag}">
          <span>图文介绍</span>
        </li>
        <li @click="graphicFunc(1)" :class="{active: !activeFlag}">
          <span>商品参数</span>
        </li>
      </ul>
      <div class='graphic'>
        <img src="http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg" alt="">
        <img src="http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg" alt="">
      </div>
    </div>
    <div class="proBuy">
      <div class="star bor-1px-t bor-1px-r">
        <image src="../../../static/images/star.png"></image>
      </div>
      <div class="shoppingCart bor-1px-t">
        <span>加入购物车</span>
      </div>
      <div class="buyNow">
        <a href="/pages/confirm/main">
          <span>立即购买</span>
        </a>
      </div>
    </div>
    <SetMeal v-if="setMealState"></SetMeal>
  </div>
</template>

<script>
import SetMeal from '@/components/setMeal'
export default {
  data () {
    return {
      autoplay: true,
      interval: 5000,
      duration: 900,
      circular: true,
      setMealState: false,
      indicatorDots: true,
      activeFlag: true, // 图文消息切换
      address: '安徽省 合肥市 蜀山区 习友路与金桂路交口8#',
      imgUrls: [
        'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
        'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
      ]
    }
  },
  mounted () {
    wx.setNavigationBarTitle({ title: '商品详情'})
  },
  components: {
    SetMeal
  },
  methods: {
    graphicFunc (arg) {
      this.activeFlag = arg === 0 ? true : false
    },
    previewFunc (arg) {
      wx.previewImage({  
        current: this.imgUrls[arg], 
        urls: this.imgUrls 
      })
    },
    chooseFunc () {
      let self = this
      wx.chooseAddress({
        success: function (res) {
          self.address = `${res.provinceName} ${res.cityName} ${res.countyName} ${res.detailInfo}`
        }
      })
    },
    changeSpecFunc () {
      this.setMealState = true
    }
  }
}
</script>

<style lang="less" scoped>
  .page{
    background: #f3f5f9;
  }
  .swiper{
    display: block;
    height: 7.1rem;
  }
  .slide-image {
    width: 100%;
    height: 100%;
  }
  .proIntro{
    background: #fff;
    padding: .3rem .2rem;
    .price{
      color: #ff5959;
      font-size: .4rem;
      line-height: .4rem;
      span{
        color: #999;
        font-size: .22rem;
        margin-left: .1rem;
      }
    }
    .title{
      color: #333;
      font-size: .34rem;
      margin: 0 0 .1rem 0;
    }
    .content{
      color: #777;
      font-size: .3rem;
      line-height: .36rem;
    }
  }
  .protab{
    width: 100%;
    background: #fff;
    margin: .24rem 0 0 0;
    .singleList{
      color: #777;
      font-size: .26rem;
      width: 100%;
      height: 1rem;
      line-height: 1rem;
      position: relative;
      display: flex;
      .title{
        color: #333;
        padding: 0 .48rem 0 .24rem;
      }
      .arrow_right{
        width: 1rem;
        height: 1rem;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        background-image: url('../../../static/images/right.png');
        background-size: 30% 30%;
        background-position: center center;
        background-repeat: no-repeat;
      }
    }
    .double{
      color: #777;
      font-size: .26rem;
      width: 100%;
      display: flex;
      .left{
        color: #333;
        padding: .3rem .48rem 0 .24rem;
      }
      .right{
        flex: 1;
        -webkit-flex: 1;
        padding: .3rem .1rem .3rem 0;
        line-height: .4rem;
      }
    }
  }
  /* .userShow{
    width: 100%;
    margin: .24rem 0 0 0;
    background:#fff;
  } */
  .proBuy{
    width: 100%;
    height: 1rem;
    line-height: 1rem;
    background: #fff;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 999;
    display: flex;
  }
  .proBuy .star{
    width: 1rem;
    box-sizing: border-box;
  }
  .proBuy .star image{
    width: 40%;
    height: 40%;
    margin: 30%;
  }
  .proBuy .shoppingCart,.proBuy .buyNow{
    font-size: .28rem;
    flex: 1;
    -webkit-flex: 1;
    text-align: center;
  }
  .proBuy .shoppingCart{
    color: #333;
  }
  .proBuy .buyNow{
    color: #fff;
    background: #ff9008;
  }
  .proGraphic{
    width: 100%;
    background: #fff;
    margin: .24rem 0 0 0;
    padding: 0 0 1rem 0;
    ul{
      width: 100%;
      height: 1rem;
      display: flex;
      li{
        flex: 1;
        color: #777;
        font-size: .28rem;
        line-height: 1rem;
        text-align: center;
        position: relative;
        &.active{
          color: #ff9008;
          &:after{
            content: '';
            width: 70%;
            position: absolute;
            bottom: 1px;
            left: 15%;
            right: 15%;
            border-bottom: 1px solid #ff9008;
          }
        }
      }
    }
    .graphic{
      font-size: 0;
      width: 100%;
      margin: .24rem 0 0 0;
      img{
        width: 100%;
      }
    }
  }
</style>
