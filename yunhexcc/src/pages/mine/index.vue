<template>
  <div class="page">
    <div class="header">
      <div class="userinfo">
        <div class="userPhoto">
          <open-data class="userImg" type="userAvatarUrl"></open-data>
        </div>
        <open-data class="userName" type="userNickName" lang="zh_CN"></open-data>
      </div>
    </div>
    <ul class="tabList">
      <!-- <li @click="goToShopCart">
        <div class="count">0</div>
        <div class="type">购物车</div>
      </li> -->
      <li>
        <div class="count">0</div>
        <div class="type">收藏单</div>
      </li>
      <li>
        <div class="count">0</div>
        <div class="type">点赞数</div>
      </li>
      <li>
        <div class="count">0</div>
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
        </li>
        <li @click="goToOrderList(2)">
          <i class="icon icon_order2"></i>
          <p>待发货</p>
        </li>
        <li @click="goToOrderList(3)">
          <i class="icon icon_order3"></i>
          <p>待收货</p>
        </li>
        <!-- <li>
          <i class="icon icon_order4"></i>
          <p>待评价</p>
        </li> -->
        <li>
          <i class="icon icon_order5"></i>
          <p>退货售后</p>
        </li>
      </ul>
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
      userInfos: Object
    }
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
        }
      }
    })
  },
  methods: {
    counponFunc () {
      wx.navigateTo({
        url: '/pages/coupon/main'
      })
    },
    goToOrderList (index) {
    	wx.navigateTo({
    		url:'/pages/order/main?currentIndex='+index
    	})
    },
    goToShopCart () {
      wx.navigateTo({
    		url:'/pages/shopCart/main'
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
  }
  .tabList{
    width: 100%;
    height: 1.5rem;
    background: #fff;
    display: flex;
    li{
      width: 25%;
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
        .icon{
          display: inline-block;
          width: .4rem;
          height: .4rem;
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