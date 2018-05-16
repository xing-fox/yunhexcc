<template>
  <div class="page">
    <swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration" :circular="circular" @change="swiperChange">
      <div v-for="(item, index) in dataList.goodPictures " :key="index">
      <swiper-item>
        <image :src="item.picture_url" class="slide-image" @click="previewFunc(index)"/>
      </swiper-item>
      </div>
    </swiper>
    <div class="proIntro">
      <div class="price">¥{{ dataList.price_new }}<span>¥{{ dataList.price_old }}</span></div>
      <div class="title">{{ dataList.product_name }}</div>
      <!-- <div class="content">{{ dataList.supplier_desc }}</div> -->
    </div>
    <div class="protab">
        <div class='singleList bor-1px-b' @click="changeSpecFunc">
          <span class='title'>发送</span>
          <span>{{ dataList.color }} {{ dataList.memory_capacity }} {{ dataList.supplier_desc }} {{ dataList.contract_name }}</span>
          <div class='arrow_right'></div>
        </div>
        <div class='singleList bor-1px-b' @click="chooseFunc">
          <span class='title'>送至</span>
          <span class="addr">
            <span>{{ address }}</span>
          </span>
          <div class='arrow_right'></div>
        </div>
        <div class="double">
            <div class="left">
                <span>说明</span>
            </div>
            <div class="right">
                <span>正品保障 / 货到付款 / 自提 / 7天退换货 / 迪信通发货售后</span>
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
        <img v-for="(item, index) in urlData" :key="index" :src="item.picture_url" alt="">
      </div>
    </div>
    <div class="proBuy">
      <div class="star bor-1px-t">
      </div>
      <!-- <div class="shoppingCart bor-1px-t" @click="shopCartFunc">
        <span>加入购物车</span>
      </div> -->
      <div class="buyNow" @click="changeSpecFunc">
        <span>立即购买</span>
      </div>
    </div>
    <setMeal v-if="setMealState" :detailId="detailId" :dataList="specData" :proList="dataList" :contId="contractSureId" @changeSpec="specFunc" @changeState="stateFunc"></setMeal>
    <telSure v-if="telState" @phoneChangeFunc="sure"></telSure>
  </div>
</template>

<script>
import setMeal from '@/components/setMeal'
import telSure from '@/components/phoneSure'
export default {
  data () {
    return {
      openId: '',
      detailId: '',
      productId: '',
      telState: false,
      autoplay: true,
      interval: 5000,
      duration: 900,
      circular: true,
      setMealState: false,
      indicatorDots: true,
      activeFlag: true, // 图文消息切换
      address: '',
      imgUrls: [
        'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
        'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
      ],
      urlData: [],
      dataList: [],
      colorId: '', // 颜色规格id
      memoryId: '', // 内存规格id
      supplierId: '', // 供应商规格id
      contractId: '', // 套餐规格id
      contractSureId: '', // 套餐id
      specData: ''
    }
  },
  onLoad (options) {
    let self = this
    self.activeFlag = true
    self.productId = options.id
    wx.getStorage({
      key: 'openId',
      success: function(res) {
        self.openId = res.data
        self.$http.Goodsinfo({
          'openid': res.data,
          'product_id': self.productId
        }).then(res => {
          self.dataList = res.data.content
          self.address = self.dataList.detail_address
          self.detailId = res.data.content.product_detail_id
        })
        self.Goodsdescribe()
        self.Selectparameter()
      } 
    })
  },
  components: {
    setMeal,
    telSure
  },
  methods: {
    Selectparameter () {
      this.$http.Selectparameter({
        data: JSON.stringify({
          product_id: this.productId,
          color_id: this.colorId,
          memory_id: this.memoryId,
          supplier_id: this.supplierId,
          contract_id: this.contractId
        }),
        'openid': this.openId
      }).then(res => {
        this.specData = res.data.content
      })
    },
    specFunc (e) {
      if (e.cate === 1) {
        this.colorId = e.id
      } 
      if (e.cate === 2) {
        this.memoryId = e.id
      }
      if (e.cate === 3) {
        this.supplierId = e.id
      }
      if (e.cate === 4) {
        this.contractId = e.id
      }
      this.$http.Selectparameter({
        data: JSON.stringify({
          product_id: this.productId,
          color_id: this.colorId,
          memory_id: this.memoryId,
          supplier_id: this.supplierId,
          contract_id: this.contractId
        }),
        'openid': this.openId
      }).then(res => {
        if (res.code == 'E00000') {
          return wx.showToast({
            title: '暂无此套餐商品',
            icon: 'none',
            duration: 2000,
            mask: true
          })
        } else {
          return false
        }
      })
    },
    Goodsdescribe () {
      this.$http.Goodsdescribe({
        'openid': this.openId,
        'product_id': this.productId
      }).then(res => {
        if (!res.data.content[0]) {
          return this.urlData = []
        }
        this.urlData = res.data.content
      })
    },
    Goodsparameter (openId) {
      this.$http.Goodsparameter({
        'openid': this.openId,
        'product_id': this.productId
      }).then(res => {
        if (!res.data.content[0]) {
          return this.urlData = []
        }
        this.urlData = res.data.content
      })
    },
    graphicFunc (arg) {
      this.activeFlag = arg === 0 ? true : false
      arg === 0 ? this.Goodsdescribe() : this.Goodsparameter()
    },
    previewFunc (index) {
      let imgList = []
      this.dataList.goodPictures.map((item) => {
        imgList.push(item.picture_url)
      })
      wx.previewImage({  
        current: this.dataList.goodPictures[index].picture_url, 
        urls: imgList 
      })
    },
    swiperChange(e) {
      // console.log('第' + e.mp.detail.current + '张轮播图发生了滑动')
    },
    animationfinish(e) {
      // console.log('第' + e.mp.detail.current + '张轮播图滑动结束')
    },
    chooseFunc () {
      wx.navigateTo({
    		url:'/pages/address/main'
    	})
      // let self = this
      // wx.openSetting({
      //   success: (res) => {
      //   }
      // })
      // wx.chooseAddress({
      //   success: function (res) {
      //     console.log(res)
      //     self.address = `${res.provinceName}${res.cityName}${res.countyName} ${res.detailInfo}`
      //   }
      // })
    },
    changeSpecFunc () {
      this.setMealState = true
    },
    stateFunc () {
      this.setMealState = false
    },
    shopCartFunc () {
      this.telState = true
    },
    sure () {
      this.telState = false
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
        text-decoration:line-through
      }
    }
    .title{
      color: #333;
      font-size: .34rem;
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
      .addr{
        flex: 1;
        margin: 0 2rem 0 0;
        display: table;
        height: 1rem;
        span{
          display: table-cell;
          vertical-align: middle;
          text-align: left;
          line-height: .4rem;
        }
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
    background-image: url('../../../static/images/star.png');
    background-size: 40% 40%;
    background-repeat: no-repeat;
    background-position: center center;
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
    background: #ffda44;
  }
  .proGraphic{
    width: 100%;
    background: #fff;
    margin: .24rem 0 0 0;
    padding: 0 0 1.14rem 0;
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
          color: #ffda44;
          &:after{
            content: '';
            width: 70%;
            position: absolute;
            bottom: 1px;
            left: 15%;
            right: 15%;
            border-bottom: 1px solid #ffda44;
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
