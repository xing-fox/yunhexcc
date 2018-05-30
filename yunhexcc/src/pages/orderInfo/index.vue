<template>
	<div class="page" style="background-color: #f7f7f7;">
		<div class=" orderState " v-if="urlData.order_status == 1">
			<i class="orderStateImg_unpaied" />
			<span id="orderStateText">等待付款</span>
		</div>
		<div class=" orderState " v-else-if="urlData.order_status == 2">
			<i class="orderStateImg_received" />
			<span id="orderStateText">已付款，待发货</span>
		</div>
		<div class=" orderState " v-else-if="urlData.order_status == 3">
			<i class="orderStateImg_waitForReceived" />
			<span id="orderStateText">待收货</span>
		</div>
		<div class=" orderState " v-else-if="urlData.order_status == 4">
			<i class="orderStateImg_finished" />
			<span id="orderStateText">交易成功</span>
		</div>
		<div class="orderAddress ">
			<div class="addressImg ">
			</div>
			<div class="noaddress" v-if="urlData.delivery_way == 0">
				到店自提
			</div>
			<div class="addressInfo " v-else>
				<div class="receivePeopleInfo">
					<span>
						收货人：{{urlData.receiver_name}}
					</span>
					<span>
						{{urlData.receiver_phone}}
					</span>
				</div>
				<div class="receiveAddressInfo">
					收货地址：{{urlData.receiver_area}}{{urlData.detail_address}}
				</div>
			</div>
		</div>
		<div class="orderGoodsInfo">
			<div class="orderGoods-ShopInfo">
				<span id="orderGoods-StoreName">
					{{urlData.shop_name}}
				</span>
				<span id="orderGoods-PayState" v-if="urlData.pay_way == 0">
					 在线支付
				</span>
				<span id="orderGoods-PayState" v-else-if="urlData.pay_way == 1">
					 货到付款
				</span>
			</div>
			<div class="orderGoods-GoodsInfo">
				<view class='middleView' v-for='(goodsData, subIndex) in urlData.goodsInfo' :key="subIndex" @tap='orderClick'>
					<image class='goodsImg' :src="goodsData.picture_url"></image>
					<view class='goodNameInfo'>
						<view class='goodsName'>{{goodsData.product_name}}</view>
						<view class='goodsPlans'>{{goodsData.color?goodsData.color:''}}{{goodsData.memory_capacity?goodsData.memory_capacity:''}} {{goodsData.supplier_name?goodsData.supplier_name:''}} {{goodsData.contract_name?goodsData.contract_name:''}}</view>
					</view>
					<view class='goodsPriceInfo'>
						<view class='goodsPrice'>¥ {{goodsData.product_price}}</view>
						<view class='goodsCount'>{{goodsData.product_number}}</view>
					</view>
				</view>
			</div>
		</div>
		<div class="orderPriceInfo">
			<div class="priceInfo-TotalPrice">
				<span>商品总价</span>
				<span> ¥ {{urlData.pay_amount}}</span>
			</div>
			<div class="priceInfo-TotalPrice">
				<span>运费（快递</span>
				<span> ¥ {{0.00}} </span>
			</div>
			<div class="priceInfo-TotalPrice bor-1px-b">
				<span>优惠券</span>
				<span v-if="serve_amount>0"> - ¥{{serve_amount}}</span>
				<span v-else>无</span>
			</div>
			<div class="needPlayPrice-view">
				<span v-if="urlData.order_status == 1">需付款</span>
				<span v-else>已付款</span>
				<span> ¥ {{pay_amount}} </span>
			</div>
		</div>
		<div class="orderTimeInfo">
			<span class="orderNumbInfo">
			订单编号：{{urlData.order_no}}
			</span>
			<span class="orderNumbInfo">
			交易编号：{{urlData.serial_no}}
			</span>
			<span class="orderNumbInfo">
			创建时间：{{urlData.created_at}}
			</span>
		</div>
		<div class="orderOpertion">
			<div class="orderOpertion-contact">
				<div class="left-opertion" @click="callDelivery(urlData.shop_mobile)">
					<image class="orderOpertion-phoneImg" />
					<div class="orderOpertion-contacter">
						联系商家
					</div>
				</div>
				<view v-if="urlData.order_status == 1" class='opertionBtn'>
					<view class='cancelOrderBtn' @click='cancelClick(urlData.order_no)'>取消订单</view>
					<view class='delectOrderBtn' @click='payClick(urlData.order_no,urlData.order_type)'>付款</view>
				</view>
				<view v-if="urlData.order_status == 2" class='opertionBtn'>
					<view class='cancelOrderBtn' @click='remindOrderClick(urlData.order_no)'>提醒发货</view>
				</view>
				<view v-if="urlData.order_status == 3" class='opertionBtn'>
					<view class='cancelOrderBtn' @click='sureOrderClick(urlData.order_no)'>确认收货</view>
				</view>
				<view v-if="urlData.order_status == 4" class='opertionBtn'>
					<view class='cancelOrderBtn' @click='deleteClick(urlData.order_no)'>删除订单</view>
					<view class='delectOrderBtn' @click='evalClick(urlData.order_no)'>评价</view>
				</view>
			</div>
		</div>
	</div>
</template>

<script>
export default {
  data() {
    return {
      urlData: {},
      openId: '',
      orderNumb: '', //订单编号
      serve_amount: 0, //优惠券充当金额
      pay_amount: 0, //付款金额
      voucher_flag: 0, //用于判断是否有优惠券的标识（0没有，1有）
      coupon_id: '', //优惠券id
      order_create_time: '' // 订单创建时间
    };
  },
  onShow() {
    let self = this;
    wx.getStorage({
      key: 'openId',
      success: function(res) {
        self.openId = res.data
      }
    })
  },
  onLoad(options) {
    let self = this
    this.orderNumb = options.orderNumb
    this.urlData = {}
    this.$http.OrderOrderDetail({
      order_no: self.orderNumb
    }).then(res => {
      if (res.data.code == "E00000") {
        self.urlData = res.data.content
        self.serve_amount = parseFloat(res.data.content.serve_amount)
        self.coupon_id = res.data.content.coupon_id
        if (self.serve_amount > 0) {
          self.pay_amount = parseFloat(res.data.content.pay_amount) - self.serve_amount
          self.voucher_flag = 1
        } else {
          self.pay_amount = res.data.content.pay_amount
          self.voucher_flag = 0
        }
      }
    })
  },
  methods: {
    /* 订单支付 */
    payClick(orderNumb, type) {
      let self = this
      if (this.voucher_flag == 1) {
        //验证优惠券是否过期
        this.$http
          .couponAvaliable({
            openid: self.openId,
            coupon_id: self.coupon_id
          })
          .then(res => {

            if (res.data.code == "E00000") {
            } else {
              wx.showToast({
                title: "所选优惠券已过期，订单恢复原价",
                icon: "none",
                duration: 1000,
                mask: false
              });
              self.pay_amount = self.urlData.pay_amount;
              self.serve_amount = 0;
              self.voucher_flag == 0;

              return;
            }
          });
      }
      //继续支付
      this.$http
        .OrderOrderPay({
          openid: self.openId,
          data: JSON.stringify({
            order_no: self.orderNumb,
            type: 2
          })
        })
        .then(res => {
          if (res.data.code == "E00000") {
            var data = res.data.content;
            wx.requestPayment({
              timeStamp: data.timestamp,
              nonceStr: data.noncestr,
              package: data.wxpay_package,
              signType: "MD5",
              paySign: data.sign,
              success: function(res) {
                wx.showToast({
                  title: "支付成功",
                  icon: "none",
                  duration: 2000,
                  mask: true
                });
                setTimeout(() => {
                  wx.navigateBack();
                }, 1000);
              },
              fail: function(res) {
                wx.showToast({
                  title: "支付失败",
                  icon: "none",
                  duration: 2000,
                  mask: true
                });
              }
            });
          } else {
            wx.showToast({
              title: data.msg,
              icon: "none",
              duration: 1000,
              mask: false
            });
          }
        });
    },
    /* 取消订单 */
    cancelClick(orderNumb) {
      let self = this;
      wx.showModal({
        title: "小猿提示",
        content: "确定取消订单吗?",
        success: function(res) {
          if (res.confirm) {
            self.$http
              .CancelOrder({
                openid: self.openId,
                order_no: orderNumb
              })
              .then(res => {
                if (res.data.code == "E00000") {
                  wx.showToast({
                    title: "取消订单成功",
                    icon: "none",
                    duration: 1000,
                    mask: false
                  });

                  setTimeout(() => {
                    wx.navigateBack();
                  }, 1000);
                }
              });
          } else if (res.cancel) {
            return false;
          }
        }
      });
    },
    /* 删除订单 */
    deleteClick(orderNumb, orderIndex) {
      let self = this
      wx.showModal({
        title: "小猿提示",
        content: "确定删除订单吗?",
        success: function(res) {
          if (res.confirm) {
            self.$http.deleteorder({
              openid: self.openId,
              order_no: orderNumb
            }).then(res => {
              if (res.data.code == 'E00000') {
                wx.showToast({
                  title: '删除订单成功',
                  icon: 'none',
                  duration: 1000,
                  mask: false
                })
                setTimeout(() => {
                  wx.navigateBack({
                    delta: 1
                  })
                }, 1000)
              }
            })
          } else if (res.cancel) {
            return false
          }
        }
      })
    },
    /* 评价订单 */
    evalClick(orderNumb) {
      wx.navigateTo({
        url: '/pages/evaluate/main?orderId=' + orderNumb
      })
    },
    /* 提醒发货 */
    remindOrderClick(orderNumb) {
      this.$http
        .RemindeOrderPay({
          openid: this.openId,
          order_no: orderNumb
        })
        .then(res => {
          if (res.data.code == "E00000") {
            wx.showToast({
              title: "提醒商家发货成功",
              icon: "none",
              duration: 1000,
              mask: false
            });
          }
        });
    },
    /* 确认收货 */
    sureOrderClick(orderNumb) {
      this.$http
        .takenOrder({
          order_type: 2,
          order_no: orderNumb
        })
        .then(res => {
          if (res.data.code == "E00000") {
            wx.showToast({
              title: "确认收货成功",
              icon: "none",
              duration: 1000,
              mask: false
            })
            setTimeout(() => {
              wx.navigateBack();
            }, 1000)
          }
        });
    },
    /*拨打电话*/
    callDelivery(numb) {
      wx.makePhoneCall({
        phoneNumber: numb,
        success: function() {
          console.log("拨打电话成功！");
        },
        fail: function() {
          console.log("拨打电话失败！");
        }
      });
    }
  }
};
</script>

<style>
page{
  background: #f3f5f9;
}
</style>

<style scoped lang="less">
.orderState {
  height: 50px;
  line-height: 50px;
  font-size: 14px;
  color: #fff;
  background-color: #37495f;
  .orderStateImg_unpaied {
    display: inline-block;
    height: 25px;
    width: 25px;
    vertical-align: middle;
    margin-left: 16px;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-image: url(../../../static/images/icon_unpaied.png);
  }
  .orderStateImg_received {
    display: inline-block;
    height: 25px;
    width: 25px;
    vertical-align: middle;
    margin-left: 16px;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-image: url(../../../static/images/icon_received.png);
  }
  .orderStateImg_waitForReceived {
    display: inline-block;
    height: 25px;
    width: 25px;
    vertical-align: middle;
    margin-left: 16px;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-image: url(../../../static/images/icon_waitForReceived.png);
  }
  .orderStateImg_finished {
    display: inline-block;
    height: 25px;
    width: 25px;
    vertical-align: middle;
    margin-left: 16px;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-image: url(../../../static/images/icon_finished.png);
  }
  #orderStateText {
    display: inline-block;
    margin-left: 10px;
  }
}

.orderAddress {
  height: 68px;
  width: 100%;
  font-size: 13px;
  color: #666;
  line-height: 20px;
  display: flex;
  padding: 9px;
  box-sizing: border-box;
  margin-top: 8px;
  background: white;
  .addressImg {
    display: inline-block;
    width: 20px;
    height: 20px;
    margin-top: 12px;
    background-image: url(../../../static/images/icon_location.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }
  .noaddress {
    margin: 14px 0px auto 10px;
    width: 90%;
  }
  .addressInfo {
    margin: auto 0px auto 10px;
    width: 90%;
    .receivePeopleInfo {
      display: flex;
      justify-content: space-between;
    }
  }
}

.orderGoodsInfo {
  margin-top: 8px;
  width: 100%;
  background: white;
  .orderGoods-ShopInfo {
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    padding: 6px 10px 6px 16px;
    #orderGoods-StoreName {
      color: #333333;
    }
    #orderGoods-PayState {
      color: #999999;
    }
  }
  .middleView {
    height: 80px;
    display: flex;
    padding-left: 16px;
    background-color: #f7f7f7;
    .goodsImg {
      display: inline-block;
      width: 46px;
      height: 46px;
      background-color: lightgray;
      margin-top: 17px;
    }
    .goodNameInfo {
      display: inline-block;
      text-align: left;
      margin-left: 20px;
      margin-top: 10px;
      width: 54%;
      .goodsName {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 16px;
        height: 25px;
      }
      .goodsPlans {
        font-size: 12px;
        color: #999999;
      }
    }
    .goodsPriceInfo {
      display: inline-block;
      text-align: right;
      margin-top: 10px;
      width: 23%;
      .goodsPrice {
        font-size: 16px;
        height: 25px;
      }
      .goodsCount {
        font-size: 12px;
        color: #999999;
      }
    }
  }
}

.orderPriceInfo {
  background: white;
  .priceInfo-TotalPrice {
    display: flex;
    justify-content: space-between;
    color: #999999;
    font-size: 12px;
    height: 16px;
    padding: 6px 16px;
  }
  .sepertLine {
    height: 2px;
    background: #f7f7f7;
    width: 100%;
  }
  .needPlayPrice-view {
    display: flex;
    justify-content: space-between;
    color: red;
    font-size: 14px;
    height: 25px;
    padding: 6px 16px;
  }
}

.orderTimeInfo {
  margin-top: 8px;
  padding-bottom: 10px;
  background: white;
  .orderNumbInfo {
    display: block;
    color: #999999;
    font-size: 12px;
    height: 15px;
    padding: 6px 16px;
  }
}

.spaceBottom {
  width: 100%;
  height: 200px;
}

.orderOpertion {
  height: 50px;
  width: 100%;
  position: fixed;
  bottom: 0;
  z-index: 100;
  .orderOpertion-contact {
    background: white;
    display: flex;
    justify-content: space-between;
    color: #999999;
    .left-opertion {
      display: flex;
      padding: 6px 16px;
      .orderOpertion-phoneImg {
        width: 16px;
        height: 16px;
        margin-top: 12px;
        background-size: 100% 100%;
        background-repeat: no-repeat;
        background-image: url(../../../static/images/icon_callup.png);
      }
      .orderOpertion-contacter {
        font-size: 14px;
        margin-left: 8px;
        margin-top: 8px;
      }
    }
    .opertionBtn {
      height: 50px;
      display: inline-flex;
      font-size: 14px;
      text-align: center;
      justify-content: flex-end;
      .cancelOrderBtn {
        margin: 8px 8px;
        height: 32px;
        line-height: 32px;
        width: 74px;
        color: #999;
        box-sizing: border-box;
        border: 1px solid #eee;
        border-radius: 3px;
      }
      .delectOrderBtn {
        margin: 8px 8px;
        height: 32px;
        line-height: 32px;
        width: 74px;
        color: #222;
        box-sizing: border-box;
        background-color: #ffda44;
        border: 1px solid #ffda44;
        border-radius: 3px;
      }
    }
  }
}
</style>