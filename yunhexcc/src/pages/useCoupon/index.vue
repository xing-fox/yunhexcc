<template>
  <div class="page">
    <div class="content">
      <ul>
        <li v-for="(item, index) in DataList" :key="index" @click="choiseFunc(index)">  
          <div class="list_main">
            <div class="price">¥<span :class="{priceFont: item.coupon_amount >= 100}">{{ item.coupon_amount }}</span></div>
            <div class="intro">
              <div class="addr">
                <span>{{ item.remarks }}</span>
              </div>
              <div class="money">
                <span>满{{ item.serve_amount }}元可用</span>
              </div>
            </div>
          </div>
          <div class="list_time">
            <span>有效期：{{ item.effective_date }}至{{ item.expire_date }}</span>
          </div>
        </li>
      </ul>
    </div>
    <div class="noData" v-if="noData">
      <Nocoupon></Nocoupon>
    </div>
  </div>
</template>

<script>
import Nocoupon from '@/components/noCoupon'
export default {
  data() {
    return {
      noData: false,
      DataList: [], // 总数据
      tabType: 0,
      pageNum: 1,
      pagCount: 8,
      openId: '',
      order_amount: ''
    }
  },
  components: {
    Nocoupon
  },
  onLoad (options) {
    this.order_amount = options.orderAmount
  },
  onShow () {
    let self = this
    wx.getStorage({
      key: 'openId',
      success: function(res) {
        self.openId = res.data
        self.init()
      } 
    })
  },
  methods: {
    init () {
      this.$http.SelectCoupon({
        'order_amount': this.order_amount,
        'pag_no': this.pageNum,
        'pag_num': this.pagCount,
        'openid': this.openId
      }).then(res => {
        this.DataList = res.data.content
        if (!res.data.content) {
          this.noData = true
        }
      })
    },
    choiseFunc (index) {
      let self = this
      wx.setStorage({
        key: 'useCoupon',
        data: self.DataList[index]
      })
      wx.navigateBack({
        delta: 1
      })
    }
  }
}
</script>

<style>
page{
  background: #f3f5f9;
}
</style>

<style lang="less" scoped>
.page {
  width: 100%;
  height: 100%;
  position: relative;
  .content {
    font-size: 0;
    width: 100%;
    padding: .2rem 0 0 0;
    ul {
      width: 100%;
      li {
        height: 2rem;
        margin: .24rem .24rem .4rem .24rem;
        padding: .26rem 0 .28rem .54rem;
        background: #fff;
        box-sizing: border-box;
        border-radius: .2rem;
        background-image: url("http://test.xclerk.com/mrsyg/YunHaiTongProject/public_tab/image/xcc/ico_coup.png");
        background-size: 100% 100%;
        background-repeat: no-repeat;
        &:nth-last-child(1){
          margin: 0 .24rem 0 .24rem;
          padding: .26rem 0 0 .54rem;
        }
        .list_main {
          width: 100%;
          display: flex;
          .price {
            color: #e2330b;
            font-size: .36rem;
            height: 1.12rem;
            line-height: 1.12rem;
            span {
              font-size: .8rem;
              margin: 0 0 0 .04rem;
            }
          }
          .priceFont {
            font-size: 0.6rem !important;
          }
          .intro {
            font-size: 0.26rem;
            color: #954f1c;
            margin: 0.22rem 0 0 0.1rem;
          }
        }
        .list_time {
          font-size: 0.24rem;
          color: #954f1c;
          letter-spacing: 0.015rem;
        }
      }
    }
  }
  .noData{
    font-size: 0;
    width: 100%;
    background: #fff;
    padding: 0.4rem 0 0 0;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1;
    overflow: hidden;
  }
}
</style>
