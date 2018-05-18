<template>
  <div class="page">
    <ul>
      <li v-for="(item, index) in dataList" :key="index" @click="choiseShopFunc(index)">
        <div class="shopName">{{ item.shop_name }}</div>
        <div class="shopStar">
         <i class="icon_all" v-for="(item, ind) in 5" :key="ind"></i>
        </div>
        <div class="shopCommit">
          <span>商品5</span>
          <span>配送5</span>
          <span>服务5</span>
          <span>满意度5</span>
        </div>
        <div class="shopAddr">
          <i class="icon_position"></i>
          <span>{{ item.shop_address }}</span>
        </div>
        <div class="shopDistance">
          <span>距离{{ item.distance }}米</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pagNo: 1,
      pagNumber: 8,
      openId: '',
      dataList: [],
      sendFlag: true
    }
  },
  components: {},
  methods: {
    init () {
      this.$http.selectShop({
        pay_no: this.pagNo,
        pag_num: this.pagNumber,
        openid: this.openId
      }).then(res => {
        this.dataList = this.dataList.concat(res.data.content)
        if (res.data.content.length < 8) {
          this.sendFlag = false
        }
      })
    },
    choiseShopFunc (index) {
      let self = this
      wx.setStorage({
        key: 'choiseShop',
        data: self.dataList[index]
      })
      this.dataList = []
      this.sendFlag = true
      wx.navigateBack({
        delta: 1
      })
    }
  },
  onLoad () {
    let self = this
    wx.getStorage({
      key: "openId",
      success: function(res) {
        self.openId = res.data
        self.init()
      }
    })
  },
  onReachBottom () {
    if (this.sendFlag) {
      this.pagNo++
      this.init()
    }
  }
}
</script>

<style>
page {
  background: #f3f5f9;
}
</style>

<style lang="less" scoped>
.page {
  width: 100%;
  ul {
    width: 100%;
    li {
      padding: 0.2rem;
      margin: 0 0 0.2rem 0;
      background: #fff;
      position: relative;
      .shopDistance{
        color: #999;
        font-size: .26rem;
        position: absolute;
        top: .25rem;
        right: .2rem;
      }
      .shopName {
        color: #333;
        font-size: 0.32rem;
        width: 75%;
      }
      .shopStar {
        color: #333;
        font-size: 0.28rem;
        width: 100%;
        line-height: 0.3rem;
        margin: .05rem 0;
        .icon_half {
          display: inline-block;
          width: 0.3rem;
          height: 0.3rem;
          margin: 0 .1rem 0 0;
          background-image: url("../../../static/images/star_half.png");
          background-size: 100% 100%;
          background-repeat: no-repeat;
          vertical-align: middle;
        }
        .icon_all {
          display: inline-block;
          width: 0.3rem;
          height: 0.3rem;
          margin: 0 .1rem 0 0;
          background-image: url("../../../static/images/star_all.png");
          background-size: 100% 100%;
          background-repeat: no-repeat;
          vertical-align: middle;
        }
      }
      .shopCommit{
        width: 100%;
        flex: 1;
        margin: .05rem 0;
        span{
          color: #aaa;
          font-size: .24rem;
          padding: 1px 3px;
          border: 1px solid #ddd;
          margin: 0 .2rem 0 0;
        }
      }
      .shopAddr {
        color: #999;
        font-size: 0.26rem;
        line-height: 0.4rem;
        i.icon_position {
          display: inline-block;
          width: 0.4rem;
          height: 0.4rem;
          background-image: url("../../../static/images/addr.png");
          background-size: 100% 100%;
          background-repeat: no-repeat;
          vertical-align: middle;
        }
        span {
          vertical-align: middle;
        }
      }
    }
  }
}
</style>
