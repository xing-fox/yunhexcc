<template>
	<div style="background-color: #f7f7f7;">
		<div class="nav-list">
			<scroll-view class="swiper-tab" scroll-x style="width: 100%">

				<view :style="menuStyle" v-for="(title,index) in titleData" :key="index" :class="{swiperSelectTabItem:index == selectTab, swiperTabItem:index != selectTab}" :data-current="index" @tap="swichNav">{{title.text}}
				</view>

			</scroll-view>
		</div>
		<div class="content-list">
			<scroll-view class="content-scroller" scroll-y style='width: 100%'>
				<div v-for="(content, index) in urlData" :key="index" class="content-item" @click='contentClick' track-by="$numb">
					<view class='topView'>
						<view class='storeName'>{{content.shop_name}}</view>
						<view class='startDate' v-if = "content.pay_way == 0">在线支付</view>
						<view class='startDate' v-if = "content.pay_way == 1">货到付款</view>
					</view>
					<div class='middleView' v-for='(goodsData,subIndex) in content.goodsInfo' :key="subIndex" @click='orderClick(content.order_no,content.order_type)'>
						<img class='goodsImg' :src="goodsData.picture_url" />
						<view class='goodNameInfo'>
							<view class='goodsName'>{{goodsData.product_name}}</view>
							<view class='goodsPlans'>{{goodsData.color}}{{goodsData.memory_capacity}} {{goodsData.supplier_name}} {{goodsData.contract_name}}</view>
						</view>
						<view class='goodsPriceInfo'>
							<view class='goodsPrice'>¥ {{goodsData.product_price}}</view>
							<view class='goodsCount'>x {{goodsData.product_number}}</view>
						</view>
					</div>
					<view class='footView'>
						<view class='totalPrice'>
							{{content.data7}}
							<span class="goodTotalNumb">
								共{{content.goodsInfo.length}}件商品 合计： 
							</span>
							<span class='goodsTotalPrice'>¥ {{content.pay_amount}}</span>
							<span class="goodsYunfei">
								（含运费0.00）
							</span>
						</view>
						<view class='sepertLine'></view>
						<view v-if="content.order_status == 1" class='opertionBtn'>
							<view class='cancelOrderBtn' @click='cancelClick(content.order_no,index)'>取消订单</view>
							<view class='delectOrderBtn' @click='payClick(content.order_no,content.order_type)'>付款</view>
						</view>
						<view v-if="content.order_status == 2" class='opertionBtn'>
							<view class='cancelOrderBtn' @click='remindOrderClick(content.order_no)'>提醒发货</view>
						</view>
						<view v-if="content.order_status == 3" class='opertionBtn'>
							<view class='cancelOrderBtn' @click='sureOrderClick(content.order_no,content.order_type,index)'>确认收货</view>
						</view>
					</view>
				</div>
			</scroll-view>
		</div>
		<div v-if="urlData.length == 0" class="spaceDive">
			<i class="spaceImg"></i>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				selectTab: 0,
				openId: '',
				urlData: [],
				pag_no: 1,
				loadEndMore: false,
				titleData: [{
						text: "全部"
					},
					{
						text: "待付款"
					},
					{
						text: "待发货"
					},
					{
						text: "待收货"
					}
				]
			}
		},
		methods: {
			/* tap切换 */
			swichNav(e) {
				if(e.target.dataset.current == this.selectTab) {
					return
				}
				this.urlData = []
				this.pag_no = 1
				this.loadEndMore = false
				this.selectTab = e.target.dataset.current
				console.log(this.selectTab)
				this.orderMyOrder(this.selectTab)
			},
			/* 订单列表 */
			orderMyOrder(order_status) {
				let self = this;
				if(order_status == 0) {
					order_status = ''
				}
				this.$http
					.OrderMyOrder({
						openid: this.openId,
						data: JSON.stringify({
							order_status: order_status,
							pag_num: 10,
							pag_no: self.pag_no
						})
					})
					.then(res => {
						this.loadEndMore = false
						console.log("订单数据成功")
						if(res.data.code == "E00000") {
							if(self.pag_no == 1) {
								self.urlData = res.data.content.orderinfo
							} else {
								self.urlData = [...self.urlData, ...res.data.content.orderinfo]
							}
							if(self.urlData.length < 10) {
								self.loadEndMore = true
							}
						}
					})
			},
			/* 跳转订单详情页 */
			orderClick(orderNumb,orderType) {
				console.log(orderType);
				if(orderType !=2){
					return
				}
				wx.navigateTo({
					url: "/pages/orderInfo/main?orderNumb=" + orderNumb
				})
			},
			/* 订单支付 */
			payClick(orderNumb, type) {
				let self = this
				console.log(self.openId+"+"+orderNumb+"+"+type)
				this.$http
					.OrderOrderPay({
						openid: self.openId,
						data:JSON.stringify({
							order_no: orderNumb,
							type: type
						})
					})
					.then(res => {
						console.log("调起订单"+JSON.stringify(res));
						if(res.data.code == "E00000") {
							var data = res.data.content;
							wx.requestPayment({
								timeStamp: data.timestamp,
								nonceStr: data.noncestr,
								package: data.wxpay_package,
								signType: "MD5",
								paySign: data.sign,
								success: function(res) {
									console.log("支付状态"+res)
									wx.showToast({
										title: "支付成功",
										icon: "none",
										duration: 2000,
										mask: true
									})
									self.urlData = []
									self.pag_no = 1
									self.loadEndMore = false
									self.orderMyOrder(self.selectTab)
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
			cancelClick(orderNumb, orderIndex) {
				this.$http
					.CancelOrder({
						openid: this.openId,
						order_no: orderNumb
					})
					.then(res => {
						if(res.data.code == "E00000") {
							this.urlData.splice(orderIndex, 1);
							wx.showToast({
								title: "取消订单成功",
								icon: "none",
								duration: 1000,
								mask: false
							});
						}
					});
			},
			/* 提醒发货 */
			remindOrderClick(orderNumb) {
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
			sureOrderClick(orderNumb, type, orderIndex) {
				console.log(type + "确认收货请求" + orderNumb + "订单索引" + orderIndex);
				this.$http
					.takenOrder({
						order_type: type,
						order_no: orderNumb
					})
					.then(res => {
						if(res.data.code == "E00000") {
							this.urlData.splice(orderIndex, 1);
							wx.showToast({
								title: "确认收货成功",
								icon: "none",
								duration: 1000,
								mask: false
							});
						}
					});
			}
		},
		computed: {
			style() {},
			menuStyle(e) {
				return {
					color: "red",
					fontSize: "13px"
				};
			}
		},
		contentClick: {},
		/* 公共方法 */

		onLoad(e) {
			this.selectTab = parseInt(e.currentIndex)
			this.pag_no = 1;
		},
		onShow() {
			let self = this
			wx.getStorage({
				key: "openId",
				success: function(res) {
					self.openId = res.data
					self.orderMyOrder(self.selectTab)
				}
			})
		},
		onReachBottom() {
			if(!this.loadEndMore) {
				this.loadEndMore = !this.loadEndMore
				this.pag_no++
					this.orderMyOrder(this.selectTab)
			}
		}
	};
</script>

<style lang="less" scoped>
	.swiper-tab {
		width: 100%;
		text-align: center;
		line-height: 42px;
		white-space: nowrap;
		position: relative;
		background-color: white;
		position: fixed;
		top: 0;
		z-index: 100;
		.swiperTabItem {
			transition: all 0.3s ease-out;
			font-size: 16px;
			height: 42px;
			display: inline-block;
			color: #777777;
			width: 25%;
			border-bottom: 2px solid white;
		}
		.swiperSelectTabItem {
			transition: all 0.3s ease-out;
			font-size: 16px;
			height: 42px;
			display: inline-block;
			color: #fada63;
			width: 25%;
			border-bottom: 2px solid #fada63;
		}
	}
	
	.content-list {
		width: 100%;
		margin-top: 58px;
	}
	
	.spaceDive {
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: white;
		.spaceImg {
			display: inline-block;
			margin-top: 200px;
			width: 150px;
			height: 150px;
			background-image: url("../../../static/images/nodata.png");
			background-size: 100% 100%;
			background-repeat: no-repeat;
		}
	}
	
	.content-item {
		width: 100%;
		position: relative;
		margin-top: 16px;
		.topView {
			display: block;
			width: 100%;
			height: 50px;
			background-color: white;
			.storeName {
				display: inline;
				text-align: right;
				font-size: 16px;
				line-height: 50px;
				margin-left: 10px;
				color: #333;
			}
			.startDate {
				position: absolute;
				display: inline;
				text-align: left;
				right: 10px;
				font-size: 12px;
				line-height: 50px;
				color: #999;
			}
		}
		.middleView {
			width: 100%;
			height: 80px;
			display: flex;
			padding-left: 10px;
			padding-top: 20px;
			.goodsImg {
				display: inline-block;
				width: 59px;
				height: 59px;
				background-color: lightgray;
			}
			.goodNameInfo {
				display: inline-block;
				text-align: left;
				margin-left: 10px;
				width: 55%;
				.goodsName {
					font-size: 16px;
					height: 37px;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
				}
				.goodsPlans {
					font-size: 12px;
					color: #999999;
				}
			}
			.goodsPriceInfo {
				display: inline-block;
				text-align: right;
				width: 21%;
				.goodsPrice {
					font-size: 16px;
					height: 37px;
				}
				.goodsCount {
					font-size: 12px;
					color: #999999;
				}
			}
		}
		.footView {
			width: 100%;
			background-color: white;
			display: block;
			.totalPrice {
				height: 45px;
				width: 100%;
				text-align: right;
				line-height: 45px;
				.goodsTotalPrice {
					color: red;
					font-size: 16px;
				}
				.goodTotalNumb {
					font-size: 11px;
				}
				.goodsYunfei {
					font-size: 11px;
					color: red;
				}
			}
			.sepertLine {
				height: 2px;
				width: 100%;
				background: #f7f7f7;
			}
			.opertionBtn {
				height: 50px;
				width: 100%;
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