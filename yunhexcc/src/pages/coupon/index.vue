<template>
  <div class="page">
    <div class="title">
      <ul>
        <li v-for="(item, index) in tabList" :key="index" @click="tabChangeFunc(index)" :class="{active: tabFlag === index}">{{ item }}</li>
      </ul>
    </div>
    <scroll-view scroll-y class="content">
      <ul>
        <li v-for="(item, index) in DataList" :key="index" :class="{'list_has': tabType ==2, 'list_pass': tabType == 1}">  
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
    </scroll-view>
    <div class="noData" v-if="noData">
      <Nocoupon></Nocoupon>
    </div>
    <div class="footer">
      <span>{{ moreMessage }}</span>
      <div class="line"></div>
    </div>
  </div>
</template>

<script>
import Nocoupon from '@/components/noCoupon'
export default {
  data() {
    return {
      tabList: ["未使用", "已使用", "已过期"],
      moreMessage: '更多优惠 敬请期待',
      tabFlag: 0,
      testPrice: 500,
      noData: false,
      DataList: [], // 总数据
      tabType: 0,
      pageNum: 1,
      pagCount: 8,
      openId: ''
    }
  },
  components: {
    Nocoupon
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
      this.$http.MyCoupon({
        data: JSON.stringify({
          'status': this.tabType,
          'pag_no': this.pageNum,
          'pag_num': this.pagCount
        }),
        'openid': this.openId
      }).then(res => {
        this.DataList = res.data.content
        if (!res.data.content) {
          this.noData = true
        }
      })
    },
    tabChangeFunc (index) {
      this.pageNum = 1
      this.DataList = []
      this.tabType = index === 0 ? 0 : index === 1 ? 2 : 1
      this.tabFlag = index
      this.noData = false
      this.init()
    }
  }
}
</script>

<style lang="less" scoped>
.page {
  width: 100%;
  height: 100%;
  background: #f3f5f9;
  position: relative;
  .title {
    width: 100%;
    height: 0.8rem;
    background: #fff;
    position: absolute;
    ul {
      width: 100%;
      height: 0.8rem;
      line-height: 0.8rem;
      display: flex;
      li {
        flex: 1;
        color: #999;
        font-size: 0.3rem;
        text-align: center;
        &.active {
          color: #222;
          font-size: 0.34rem;
          position: relative;
          &:after {
            content: "";
            width: 40%;
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            margin: 0 auto;
            border: 2px solid #ffda44;
            border-radius: 2px;
          }
        }
      }
    }
  }
  .content {
    font-size: 0;
    width: 100%;
    background: #fff;
    padding: .2rem 0 0 0;
    position: absolute;
    top: 0.98rem;
    bottom: 0.6rem;
    left: 0;
    right: 0;
    overflow: scroll;
    ul {
      width: 100%;
      padding: 0 0 0.2rem 0;
      li {
        height: 2rem;
        margin: 0 .24rem .4rem .24rem;
        padding: .26rem 0 .28rem .54rem;
        box-sizing: border-box;
        background-image: url("http://test.xclerk.com/mrsyg/YunHaiTongProject/public_tab/image/xcc/ico_coup.png");
        background-size: 100% 100%;
        background-repeat: no-repeat;
        &.list_has {
          height: 2rem;
          margin: 0 0.24rem 0.4rem 0.24rem;
          padding: 0.26rem 0 0.28rem 0.54rem;
          box-sizing: border-box;
          background-image: url("http://test.xclerk.com/mrsyg/YunHaiTongProject/public_tab/image/xcc/ico_coup_used.png");
          background-size: 100% 100%;
          background-repeat: no-repeat;
          position: relative;
          &:after {
            content: "";
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            background-color: rgba(255, 255, 255, 0.6);
            z-index: 1;
          }
        }
        &.list_pass {
          height: 2rem;
          margin: 0 0.24rem 0.4rem 0.24rem;
          padding: 0.26rem 0 0.28rem 0.54rem;
          box-sizing: border-box;
          background-image: url("http://test.xclerk.com/mrsyg/YunHaiTongProject/public_tab/image/xcc/ico_coup_past.png");
          background-size: 100% 100%;
          background-repeat: no-repeat;
          position: relative;
          &:after {
            content: "";
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            background-color: rgba(255, 255, 255, 0.6);
            z-index: 1;
          }
        }
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
            width: 1.5rem;
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
    top: 0.98rem;
    bottom: 0.6rem;
    left: 0;
    right: 0;
    z-index: 1;
    overflow: hidden;
  }
  .footer {
    color: #ccc;
    font-size: .28rem;
    width: 100%;
    height: 0.6rem;
    line-height: 0.6rem;
    background: #fff;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    text-align: center;
    span {
      display: inline-block;
      width: 35%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      z-index: 1;
      margin: 0 auto;
      background: #fff;
    }
    .line {
      content: "";
      width: 70%;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: 0.3rem auto;
      border-top: 1px solid #ccc;
      -webkit-transform: scaleY(0.5);
      -webkit-transform-origin: 0 0;
    }
  }
}
</style>
