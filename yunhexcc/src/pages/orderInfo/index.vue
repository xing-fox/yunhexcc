<template>
	<div class="page" style="background-color: #f7f7f7;">
		<div class=" orderState " v-if="urlData.order_status == 1">
			<i class="orderStateImg" style="background-image: url(../../../static/images/icon_unpaied.png);" /></i>
			<span id="orderStateText">
	 		 等待付款
			</span>
		</div>
		<div class=" orderState " v-else-if="urlData.order_status == 2">
			<i class="orderStateImg" style="background-image: url(../../../static/images/icon_received.png);" /></i>
			<span id="orderStateText">
	 		 已付款，待发货
			</span>
		</div>
		<div class=" orderState " v-else-if="urlData.order_status == 3">
			<i class="orderStateImg" style="background-image: url(../../../static/images/icon_waitForReceived.png);" /></i>
			<span id="orderStateText">
	 		 待收货
			</span>
		</div>
		<div class="orderAddress ">
			<div class="addressImg ">
			</div>
			<div class="noaddress" v-if="urlData.delivery_way == 0">
				到店自提
			</div>
			<div class="addressInfo " v-else="urlData.delivery_way == 1">

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
				<view class='middleView' v-for='(goodsData,subIndex) in urlData.goodsInfo' @tap='orderClick'>
					<image class='goodsImg' :src="goodsData.picture_url"></image>
					<view class='goodNameInfo'>
						<view class='goodsName'>{{goodsData.product_name}}</view>
						<view class='goodsPlans'>{{goodsData.color}} {{goodsData.memory_capacity}} {{goodsData.supplier_name}} {{goodsData.contract_name}}</view>
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
				<span>
						商品总价
					</span>
				<span>
						¥ {{urlData.pay_amount}}
					</span>
			</div>
			<div class="priceInfo-TotalPrice">
				<span>
					运费（快递）
					</span>
				<span>
						¥ {{0.00}}
					</span>
			</div>
			<div class="priceInfo-TotalPrice">
				<span>
						优惠券
				</span>
				<span>
				     	无
					</span>
			</div>
			<div class="sepertLine">

			</div>
			<div class="needPlayPrice-view">
				<span>
						需付款
					</span>
				<span>
						¥{{urlData.pay_amount}}
					</span>
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
		<div class="spaceBottom">

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
					<view class='cancelOrderBtn' @click='sureOrderClick(urlData.order_no,urlData.order_type)'>确认收货</view>
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
				orderNumb: '',
				openId: ''
			}
		},
		onLoad(options) {
			let self = this;
			this.orderNumb = options.orderNumb;
			this.urlData = {};
			console.log(options.orderNumb);
			this.$http.OrderOrderDetail({
				'order_no': self.orderNumb
			}).then(res => {
				if(res.data.code == 'E00000') {
					console.log(JSON.stringify(res));
					self.urlData = res.data.content;
				}
			})
		},
		onShow() {
			let self = this
			wx.getStorage({
				key: "openId",
				success: function(res) {
					self.openId = res.data
				}
			})
		},
		reloadData() {
			let self = this;
			this.urlData = {};
			this.$http.OrderOrderDetail({
				'order_no': self.orderNumb
			}).then(res => {
				console.log(JSON.stringify(res));
				if(res.data.code == 'E00000') {
					console.log(JSON.stringify(res));
					self.urlData = res.data.content;
				}
			})
		},
		methods: {
			/*拨打电话*/
			callDelivery(numb) {

				wx.makePhoneCall({
					phoneNumber: numb,
					success: function() {
						console.log("拨打电话成功！")
					},
					fail: function() {
						console.log("拨打电话失败！")
					}
				})
			},
			/* 订单支付 */
			payClick(orderNumb, type) {
				let self = this
				this.$http
					.OrderOrderPay({
						openid: self.openId,
						data: JSON.stringify({
							order_no: orderNumb,
							type: 2
						})
					})
					.then(res => {
						console.log("调起订单" + JSON.stringify(res));
						if(res.data.code == "E00000") {
							var data = res.data.content;
							wx.requestPayment({
								timeStamp: data.timestamp,
								nonceStr: data.noncestr,
								package: data.wxpay_package,
								signType: "MD5",
								paySign: data.sign,
								success: function(res) {
									console.log("支付状态" + res)
									wx.showToast({
										title: "支付成功",
										icon: "none",
										duration: 2000,
										mask: true
									})
									wx.navigateBack();
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
				this.$http
					.CancelOrder({
						openid: this.openId,
						order_no: orderNumb
					})
					.then(res => {
						if(res.data.code == "E00000") {
							console.log("取消订单成功" + JSON.stringify(res));

							wx.showToast({
								title: "取消订单成功",
								icon: "none",
								duration: 1000,
								mask: false
							});
							wx.navigateBack()
						}
					});
			},
			/* 提醒发货 */
			remindOrderClick(orderNumb) {
				console.log("订单号" + orderNumb + "opendi" + this.openId);
				this.$http
					.RemindeOrderPay({
						openid: this.openId,
						order_no: orderNumb
					})
					.then(res => {
						if(res.data.code == "E00000") {
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
			sureOrderClick(orderNumb, type) {
				console.log(type + "确认收货请求" + orderNumb + "订单索引" + orderIndex);
				this.$http
					.takenOrder({
						order_type: type,
						order_no: orderNumb
					})
					.then(res => {
						if(res.data.code == "E00000") {
							wx.showToast({
								title: "确认收货成功",
								icon: "none",
								duration: 1000,
								mask: false
							});
							wx.navigateBack();
						}
					});
			}
		}
	}
</script>

<style scoped lang="less">
	.orderState {
		height: 50px;
		line-height: 50px;
		font-size: 14px;
		color: #fff;
		background-color: #37495f;
		.orderStateImg {
			display: inline-block;
			height: 25px;
			width: 25px;
			vertical-align: middle;
			margin-left: 10px;
			background-size: 100% 100%;
			background-repeat: no-repeat;
		}
		#orderStateText {
			display: inline-block;
			margin-left: 6px;
		}
	}
	
	.orderAddress {
		height: 78px;
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
		.noaddress{
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
			padding: 6px 10px 6px 6px;
			#orderGoods-StoreName {
				color: #333333;
			}
			#orderGoods-PayState {
				color: #999999;
			}
		}
		.middleView {
			height: 66px;
			display: flex;
			padding-left: 10px;
			background-color: #f7f7f7;
			.goodsImg {
				display: inline-block;
				width: 46px;
				height: 46px;
				background-color: lightgray;
				margin-top: 10px;
			}
			.goodNameInfo {
				display: inline-block;
				text-align: left;
				margin-left: 20px;
				margin-top: 10px;
				width: 60%;
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
				width: 20%;
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
			padding: 6px;
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
			padding: 6px;
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
			height: 12px;
			padding: 4px 6px;
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
				padding: 6px;
				.orderOpertion-phoneImg {
					width: 20px;
					height: 20px;
					margin-top: 8px;
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
				width: 50%;
				display: inline-flex;
				font-size: 12px;
				text-align: center;
				justify-content: flex-end;
				.cancelOrderBtn {
					padding-top: 8px;
					margin: 8px 8px;
					height: 24px;
					width: 60px;
					color: #999;
					border: 1px solid #f1f1f1;
					border-radius: 3px;
				}
				.delectOrderBtn {
					padding-top: 8px;
					margin: 8px 8px;
					height: 24px;
					width: 60px;
					color: #222;
					background-color: #fada63;
					border: 1px solid #fada63;
					border-radius: 3px;
				}
			}
		}
	}
</style>