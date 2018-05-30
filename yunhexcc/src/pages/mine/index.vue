<template>
  <div class="page">
    <div class="header">
      <div class="userinfo">
        <div class="userPhoto">
          <open-data class="userImg" type="userAvatarUrl"></open-data>
        </div>
        <open-data class="userName" type="userNickName" lang="zh_CN"></open-data>
      </div>
      <div v-if="registerMessage" class="register" @click="registerFunc">
        <i></i><span>{{ registerMessage }}</span>
      </div>
    </div>
    <ul class="tabList">
      <li @click="goToShopCart">
        <div class="count">{{dataList.cart_total}}</div>
        <div class="type">购物车</div>
      </li>
      <li>
        <div class="count">{{dataList.collection_total}}</div>
        <div class="type">收藏单</div>
      </li>
      <li>
        <div class="count">{{dataList.like_total}}</div>
        <div class="type">点赞数</div>
      </li>
      <li>
        <div class="count">{{ dataList.cur_bal }}</div>
        <div class="type">猿币数</div>
      </li>
    </ul>
    <div class="order">
      <div class="title bor-1px-b"  @click="goToOrderList(0)">
        <span>我的订单</span>
        <i class="icon_right"></i> 
      </div>
      <ul class="orderList">
        <li @click="goToOrderList(1)">
          <i class="icon icon_order1" ></i>
          <p>待付款</p>
          <span v-if="dataList.order_waitpay != '0'" class="number">{{ dataList.order_waitpay }}</span>
        </li>
        <li @click="goToOrderList(2)">
          <i class="icon icon_order2"></i>
          <p>待发货</p>
          <span v-if="dataList.order_waitsend != '0'" class="number">{{ dataList.order_waitsend }}</span>
        </li>
        <li @click="goToOrderList(3)">
          <i class="icon icon_order3"></i>
          <p>待收货</p>
          <span v-if="dataList.order_waitreceive != '0'" class="number">{{ dataList.order_waitreceive }}</span>
        </li>
        <li @click="goToOrderList(4)">
          <i class="icon icon_order4"></i>
          <p>待评价</p>
          <span v-if="dataList.order_waitevaluate != '0'" class="number">{{ dataList.order_waitevaluate }}</span>
        </li>
        <!-- <li>
          <i class="icon icon_order5"></i>
          <p>退货售后</p>
        </li> -->
      </ul>
    </div>
    <div class="coupon" @click="addressFunc">
      <span>收货地址</span>
      <i class="icon_right"></i>
    </div>
    <div class="coupon bor-1px-b" @click="counponFunc">
      <span>我的优惠券</span>
      <i class="icon_right"></i> 
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      openId: '',
      dataList: Object,
      userInfos: Object,
      registerMessage: ''
    }
  },
  onLoad () {
    let self = this
    wx.getStorage({
      key: 'openId',
      success: function(res) {
        self.openId = res.data
      }
    })
  },
  onShow () {
    let self = this
    wx.getStorage({
      key: 'phoneRegister',
      success: function(res) {
        if(res.data === '0') {
          wx.navigateTo({
            url: '/pages/login/main'
          })
        } else {
          self.$http.customerInfo({
            'openid': self.openId
          }).then(res => {
            self.dataList = res.data.content
            if ( res.data.content.add_record_flag == '0' ) {
              self.registerMessage = '已签'
            } else {
              self.registerMessage = '签到'  
            }
          })
        }
      }
    })
  },
  methods: {
    addressFunc () {
      wx.navigateTo({
    		url:'/pages/address/main?from=1'
    	})
    },
    counponFunc () {
      wx.navigateTo({
        url: '/pages/coupon/main'
      })
    },
    goToOrderList (index) {
    	wx.navigateTo({
    		url:'/pages/order/main?currentIndex=' + index
    	})
    },
    goToShopCart () {
      wx.navigateTo({
    		url:'/pages/shopCart/main'
    	})
    },
    registerFunc () {
      if (this.dataList.add_record_flag == '0') {
        return wx.showToast({
          title: '您已签过到了！',
          icon: 'none',
          duration: 1000,
          mask: false
        })
      }
      this.$http.addrecord({
        'openid': this.openId
      }).then(res => {
        if (res.data.success) {
          this.registerMessage = '已签'
          this.dataList.cur_bal += 10
        }
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: 1000,
          mask: false
        })
      })
    }
  }
}
</script>

<style scoped lang="less">
  .page{
    background: #f3f5f9;
  }
  .header{
    width: 100%;
    height: 4.2rem;
    background-image: url('http://test.xclerk.com/mrsyg/YunHaiTongProject/public_tab/image/xcc/bg.jpg');
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: relative;
    .userinfo{
      width: 100%;
      position: absolute;
      top: 1rem;
      bottom: 0;
      left: 0;
      right: 0;
      margin: auto auto;
      text-align: center;
      .userPhoto{
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        margin: 0 auto;
        width: 1.7rem;
        height: 1.7rem;
        border-radius: .85rem;
        overflow: hidden;
        box-sizing: border-box;
        border: 2px solid #fff;
        .userImg{
          display: block;
          width: 100%;
          height: 100%;
          box-sizing: border-box;
        }
      }
      .userName{
        color: #222;
        font-size: .32rem;
        width: 100%;
        position: absolute;
        bottom: .8rem;
        left: 0;
        text-align: center;
      }
    }
    .register{
      position: absolute;
      bottom: .5rem;
      right: 0;
      color: #333;
      font-size: 0;
      width: 1.5rem;
      height: .8rem;
      line-height: .8rem;
      text-align: center;
      border-top-left-radius: .4rem;
      border-bottom-left-radius: .4rem;
      background: #fff;
      i{
        display: inline-block;
        width: .8rem;
        height: .8rem;
        background-image: url('../../../static/images/signIn.png');
        background-size: 60% 60%;
        background-repeat: no-repeat;
        background-position: center center;
        vertical-align: middle;
      }
      span{
        font-size: .3rem;
        margin: 0 0 0 -.1rem;
        vertical-align: middle;
      }
    }
  }
  .tabList{
    width: 100%;
    height: 1.5rem;
    background: #fff;
    display: flex;
    li{
      flex: 1;
      text-align: center;
      .count{
        color: #222;
        font-size: .36rem;
        margin: .28rem 0 0 0;
      }
      .type{
        color: #999;
        font-size: .28rem;
      }
    }
  }
  .order{
    width: 100%;
    background: #fff;
    margin: .24rem 0 0 0;
    .title{
      height: .92rem;
      line-height: .92rem;
      margin: 0 0 0 .3rem;
      display: flex;
      span{
        flex: 1;
        color: #222;
        font-size: .3rem;
      }
      .icon_right{
        display: inline-block;
        width: .92rem;
        height: .92rem;
        background-image: url('../../../static/images/right.png');
        background-size: 30% 30%;
        background-repeat: no-repeat;
        background-position: center center;
      }
    }
    .orderList{
      width: 100%;
      display: flex;
      li{
        flex: 1;
        padding: .2rem 0;
        text-align: center;
        position: relative;
        .icon{
          display: inline-block;
          width: .5rem;
          height: .5rem;
          background-size: 100% 100%;
          background-repeat: no-repeat;
          background-position: center center;
          &.icon_order1{
            background-image: url('../../../static/images/icon_order1.png');
          }
          &.icon_order2{
            background-image: url('../../../static/images/icon_order2.png');
          }
          &.icon_order3{
            background-image: url('../../../static/images/icon_order3.png');
          }
          &.icon_order4{
            background-image: url('../../../static/images/icon_order4.png');
          }
          &.icon_order5{
            background-image: url('../../../static/images/icon_order5.png');
          }
        }
        p{
          color: #222;
          font-size: .28rem;
        }
        .number{
          color: #fff;
          font-size: .22rem;
          width: .34rem;
          height: .34rem;
          border-radius: .2rem;
          line-height: .34rem;
          text-align: center;
          box-sizing: border-box;
          position: absolute;
          top: .1rem;
          right: .5rem;
          background: red;
        }
      }
    }
  }
  .coupon{
    background: #fff;
    height: .92rem;
    line-height: .92rem;
    margin: .24rem 0;
    padding: 0 0 0 .3rem;
    display: flex;
      span{
        flex: 1;
        color: #222;
        font-size: .32rem;
      }
      .icon_right{
        display: inline-block;
        width: .92rem;
        height: .92rem;
        background-image: url('../../../static/images/right.png');
        background-size: 30% 30%;
        background-repeat: no-repeat;
        background-position: center center;
      }

  }
</style>