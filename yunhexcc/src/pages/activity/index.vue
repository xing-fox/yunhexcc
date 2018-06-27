<style lang="less" scoped>
@font-face {
  font-family: 'fox';
  src: url('../../utils/DIN Medium.ttf');
}
.page {
  width: 100%;
  position: relative;
  .headerImg {
    font-size: 0;
    width: 100%;
    img {
      width: 7.5rem;
      display: inline-block;
      &.img_1 {
        height: 6.56rem;
      }
      &.img_2 {
        height: 4.82rem;
      }
      &.img_3 {
        height: 7.88rem;
      }
      &.img_4 {
        height: 6.51rem;
      }
      &.img_5 {
        height: 2.82rem;
      }
      &.img_6 {
        height: 13.41rem;
      }
    }
  }
  .content {
    width: 100%;
    position: absolute;
    top: 6.56rem;
    z-index: 1;
    .coupon {
      margin: 0 0 0 0.65rem;
      display: flex;
      .list {
        width: 1.95rem;
        height: 2.4rem;
        position: relative;
        background-size: 100% 100%;
        background-repeat: no-repeat;
        background-image: url("../../../static/images/hd_coupon.png");
        &:nth-child(2) {
          margin: 0 0.2rem;
        }
        .text{
          color: #fb0fe2;
          font-size: .45rem;
          font-family: 'fox';
          position: absolute;
          top: .68rem;
          left: 0;
          right: 0;
          text-align: center;
        }
        .msg {
          color: #fff;
          font-size: 0.26rem;
          margin: 1.35rem 0 0 0;
          text-align: center;
        }
        .receive {
          color: #fff;
          font-size: 0.28rem;
          font-weight: bold;
          width: 100%;
          margin: .05rem 0 0 0;
          text-align: center;
        }
      }
    }
    .product {
      margin: 2.45rem 0 0 0;
      ul {
        font-size: 0;
        padding: 0 0.3rem;
        li {
          display: inline-block;
          width: 2.2rem;
          height: 3.6rem;
          overflow: hidden;
          margin: 0 0.055rem 0.3rem;
          border-radius: 10px;
          border: 1px solid #000;
          box-sizing: border-box;
          background: #fff;
          position: relative;
          .flag {
            width: 0.64rem;
            height: 0.63rem;
            position: absolute;
            top: 0;
            left: 0;
            background-size: 100% 100%;
            background-repeat: no-repeat;
            background-image: url("../../../static/images/hd_hot.png");
          }
          .img {
            width: 100%;
            height: 2.4rem;
            overflow: hidden;
            img{
              width: 100%;
              height: 100%;
              overflow: hidden;
            }
          }
          .name {
            width: 100%;
            height: 1.2rem;
            padding: .2rem 0;
            box-sizing: border-box;
            background: #f7edb3;
            .title {
              color: #d55e17;
              font-size: .3rem;
              width: 100%;
              line-height: .4rem;
              text-align: center;
              display: -webkit-box;
              word-break: break-all;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 1;
              overflow: hidden;
              text-overflow: ellipsis;
            }
            .text {
              color: #f66610;
              font-size: .24rem;
              width: 100%;
              line-height: .34rem;
              text-align: center;
              display: -webkit-box;
              word-break: break-all;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 1;
              overflow: hidden;
              text-overflow: ellipsis;
            }
          }
        }
      }
    }
    .shopping {
      margin: 2.2rem 0.3rem 0;
      display: flex;
      .list {
        width: 2.2rem;
        height: 3.9rem;
        margin: 0 0.055rem;
        overflow: hidden;
        border-radius: 10px;
        box-sizing: border-box;
        border: 1px solid #000;
        background: #fff;
        position: relative;
        .flag {
          width: 0.64rem;
          height: 0.64rem;
          position: absolute;
          top: 0;
          left: 0;
          z-index: 1;
          background-size: 100% 100%;
          background-repeat: no-repeat;
          background-image: url("../../../static/images/hd_1.png");
        }
        .img {
          width: 100%;
          height: 2.3rem;
          overflow: hidden;
          img{
            width: 100%;
            height: 100%;
            overflow: hidden;
          }
        }
        .title {
          color: #000;
          font-size: 0.3rem;
          width: 100%;
          text-align: left;
          padding: .1rem 0 0 .1rem;
          box-sizing: border-box;
          display: -webkit-box;
          word-break: break-all;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .price {
          color: #ff6001;
          font-size: .28rem;
          line-height: 0.36rem;
          margin: .1rem 0 0 .1rem;
        }
        .oldPrice {
          color: #999;
          font-size: 0.22rem;
          line-height: 0.3rem;
          text-decoration:line-through;
          margin: .05rem 0 0 .1rem;
        }
        .buy {
          width: 0.76rem;
          height: 0.76rem;
          position: absolute;
          right: 0.1rem;
          bottom: 0.1rem;
          background-size: 100% 100%;
          background-repeat: no-repeat;
          background-image: url("../../../static/images/hd_buy.png");
        }
      }
    }
    .customerIntro {
      width: 100%;
      height: 2.81rem;
      margin: 0.5rem 0 0 0;
      text-align: center;
      background-size: 100% 100%;
      background-repeat: no-repeat;
      background-image: url("http://test.xclerk.com/mrsyg/YunHaiTongProject/public_tab/image/xcc/hd_customer.jpg");
      img {
        width: 0.9rem;
        height: 0.9rem;
        margin: 0.55rem 0 0 0;
        border-radius: 0.45rem;
        background: #fff;
      }
      .name{
        color: #fff;
        font-size: .3rem;
        width: 100%;
        line-height: .4rem;
        text-align: center;
      }
      .intro {
        color: #fff;
        font-size: .3rem;
        width: 100%;
        line-height: .4rem;
        text-align: center;
      }
    }
    .goodsOff {
      width: 100%;
      background: #642daf;
      .offTop{
        width: 100%;
        height: 2.45rem;
        background-size: 100% 100%;
        background-repeat: no-repeat;
        background-image: url("http://test.xclerk.com/mrsyg/YunHaiTongProject/public_tab/image/xcc/hd_top.jpg");
      }
      .offContent{
        width: 100%;
        ul {
          padding: 0 .25rem;
          li {
            display: inline-block;
            width: 3.38rem;
            height: 4.3rem;
            margin: 0 .06rem .3rem;
            overflow: hidden;
            border-radius: 10px;
            border: 1px solid #000;
            box-sizing: border-box;
            background: #fff;
            position: relative;
            .flag {
              width: .8rem;
              height: .91rem;
              position: absolute;
              top: 0;
              right: 0;
              background-size: 100% 100%;
              background-repeat: no-repeat;
              background-image: url("../../../static/images/hd_off.png");
            }
            .img {
              width: 100%;
              height: 2.4rem;
              overflow: hidden;
              img{
                width: 100%;
                height: 100%;
                overflow: hidden;
              }
            }
            .title{
              color: #333;
              font-size: .24rem;
              width: 100%;
              height: .78rem;
              line-height: .36rem;
              padding: .1rem .15rem 0;
              margin: .08rem 0 0 0;
              box-sizing: border-box;
              display: -webkit-box;
              word-break: break-all;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 2;
              overflow: hidden;
              text-overflow: ellipsis;
              span{
                display: inline-block;
                color: #e60012;
                padding: 0 1px;
                border-radius: 4px;
                border: 1px solid #e60012;
                box-sizing: border-box;
                vertical-align: middle;
              }
            }
            .price{
              color: #cd0000;
              font-size: .3rem;
              line-height: .36rem;
              margin: .25rem 0 0 .16rem;
            }
            .buy{
              color: #fff;
              font-size: .24rem;
              width: 1.6rem;
              height: .6rem;
              line-height: .6rem;
              text-align: center;
              position: absolute;
              right: .1rem;
              bottom: .2rem;
              border-radius: .8rem;
              background: #cd0000;
            }
          }
        }
      }
      .offBottom{
        width: 100%;
        height: 2.05rem;
        background-size: 100% 100%;
        background-repeat: no-repeat;
        background-image: url("http://test.xclerk.com/mrsyg/YunHaiTongProject/public_tab/image/xcc/hd_bottom.jpg");
      }
    }
  }
}
</style>

<template>
  <div class="page">
    <div class="headerImg">
        <img class="img_1" src="http://test.xclerk.com/mrsyg/YunHaiTongProject/public_tab/image/xcc/hd_1.jpg">
        <img class="img_2" src="http://test.xclerk.com/mrsyg/YunHaiTongProject/public_tab/image/xcc/hd_2.jpg">
        <img class="img_3" src="http://test.xclerk.com/mrsyg/YunHaiTongProject/public_tab/image/xcc/hd_3.jpg">
        <img class="img_4" src="http://test.xclerk.com/mrsyg/YunHaiTongProject/public_tab/image/xcc/hd_4.jpg">
        <img class="img_5" src="http://test.xclerk.com/mrsyg/YunHaiTongProject/public_tab/image/xcc/hd_5.jpg">
        <!-- <img class="img_6" src="http://test.xclerk.com/mrsyg/YunHaiTongProject/public_tab/image/xcc/hd_6.jpg"> -->
    </div>
    <div class="content">
      <div class="coupon">
        <div class="list" v-for="(item, index) in couponList" :key="index">
          <div class="text">{{ item.serve_amount }}</div>
          <div class="msg">订单满{{ item.coupon_amount }}可用</div>
          <div class="receive" v-if="item.use_flag == '0'" @click="coupontFunc(item.coupon_standard_id, index)">立即领取</div>
          <div class="receive" v-else>已领取</div>
        </div>
      </div>
      <div class="product">
        <ul>
          <li v-for="(item, index) in fashionData" :key="index" @click="detailsFunc(item.product_id)">
            <div class="flag"></div>
            <div class="img">
              <img :src="item.picture_url" mode="aspectFit">
            </div>
            <div class="name">
              <div class="title">
                {{ item.product_desc }}
              </div>
              <div class="text">
                {{ item.category_name }}
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="shopping">
        <div class="list" v-for="(item, index) in limitData" :key="index" @click="detailsFunc(item.product_id)">
          <div class="flag"></div>
          <div class="img">
            <img :src="item.deadline_picture" mode="aspectFit">
          </div>
          <div class="title bor-1pxColor-t">
            {{ item.deadline_name }}
          </div>
          <div class="price">
            ¥{{ item.deadline_price }}
          </div>
          <div class="oldPrice">
            ¥{{ item.product_price }}
          </div>
          <div class="buy"></div>
        </div>
      </div>
      <div class="customerIntro">
        <img :src="goldList.customer_picture">
        <div class="name">{{ goldList.customer_name }}</div>
        <div class="intro">
          {{ goldList.shop_name }}金牌店员
        </div>
      </div>
      <div class="goodsOff">
        <div class="offTop"></div>
        <div class="offContent">
          <ul>
            <li v-for="(item, index) in trendData" :key="index" @click="detailsFunc(item.product_id)">
              <div class="flag"></div>
              <div class="img">
                <img :src="item.picture_url" mode="aspectFit">
              </div>
              <div class="title bor-1pxColor-t">
                <!-- <span>便携</span> -->
                {{ item.product_name }}
              </div>
              <div class="price">
                ¥{{ item.product_price }}
              </div>
              <div class="buy">
                立即购买
              </div>
            </li>
          </ul>
        </div>
        <!-- <div class="offBottom"></div> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      pagNo: 1,
      openId: '',
      limitData: [],
      couponList: [],
      fashionData: [],
      trendData: [],
      trendFlag: true,
      goldList: ''
    }
  },
  onLoad () {
    // [this.trendFlag, this.couponList, this.limitData, this.fashionData, this.trendData, this.pagNo] = [true, [], [], [], [], 1]
    let self = this
    wx.getStorage({
      key: 'openId',
      success: function (res) {
        self.openId = res.data
        self.limitTime()
        self.trendBuy()
        self.couponShow()
        self.goldManager()
      } 
    })
  },
  onShow () {
    wx.setStorage({
      key: 'productFlag',
      data: false
    })
  },
  onReachBottom () {
    if (this.trendFlag) {
      this.pagNo++
      this.trendFlag = false
      this.trendBuy()
    }
  },
  methods: {
    couponShow () { // 优惠券列表
      this.$http.cpSelectCoupon({
        'openid': this.openId
      }).then(res => {
        if (res.data.code == 'E00000') {
          this.couponList = res.data.content
        }
      })
    },
    goldManager () { // 金牌店员
      this.$http.getassistantmanager({
        'openid': this.openId
      }).then(res => {
        if (res.data.code == 'E00000') {
          console.log(res)
          this.goldList = res.data.content
        }
      })
    },
    coupontFunc (id, index) { // 领取优惠券
      this.$http.selectCpCoupon({
        data: JSON.stringify({
          coupon_standard_id: id
        }),
        'openid': this.openId
      }).then(res => {
        if (res.data.code == 'E00000') {
          this.couponList[index].use_flag = 1
          return wx.showToast({
						title: res.data.content,
						icon: "none",
						duration: 1000,
						mask: false
					})
        }
      })
    },
    limitTime () { // 限时购列表
      this.$http.deadlinegoods({
        'openid': this.openId
      }).then(res => {
        if (res.data.code == 'E00000') {
          this.limitData = res.data.content.goodsPOList
        }
      })
    },
    trendBuy () { // 潮品嗨购
      let self = this
      self.trendFlag = true
      this.$http.virtuagoodList({
        data: JSON.stringify({
          pag_no: self.pagNo,
          pag_num: 6
        }),
        'openid': this.openId
      }).then(res => {
        if (res.data.code == 'E00000') {
          self.fashionData = res.data.content.fashionList
          self.trendData = self.trendData.concat(res.data.content.goodsList)
          if (res.data.content.goodsList.length < 6) {
            self.trendFlag = false
          }
        }
      })
    },
    detailsFunc (id) {
      wx.navigateTo({
        url: '/pages/details/main?shop=1&id=' + id
      })
    }
  }
}
</script>
