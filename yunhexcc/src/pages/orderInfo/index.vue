<template>
	<div class="page" style="background-color: #f7f7f7;">
		<div class=" orderState ">
			<image class="orderStateImg " />
			<span id="orderStateText" v-if="urlData.order_status == 1">
	 		 等待付款
			</span>
			<span id="orderStateText" v-else-if="urlData.order_status == 2">
	 		 已付款，待发货
			</span>
			<span id="orderStateText" v-else-if="urlData.order_status == 3">
	 		 待收货
			</span>
			<span id="orderStateText" v-else-if="urlData.order_status == 4">
	 		 待评价
			</span>
		</div>
		<div class="orderAddress ">
			<div class="addressImg ">
			</div>
			<div class="addressInfo ">
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
					{{urlData.created_at}} 在线支付
				</span>
				<span id="orderGoods-PayState" v-else-if="urlData.pay_way == 1">
					{{urlData.created_at}} 货到付款
				</span>
			</div>
			<div class="orderGoods-GoodsInfo">
				<view class='middleView' v-for='(goodsData,subIndex) in urlData.goodsinfo' @tap='orderClick'>
					<image class='goodsImg' src="goodsData.picture_url"></image>
					<view class='goodNameInfo'>
						<view class='goodsName'>{{goodsData.data2}}</view>
						<view class='goodsPlans'>{{goodsData.data3}}</view>
					</view>
					<view class='goodsPriceInfo'>
						<view class='goodsPrice'>{{goodsData.data4}}</view>
						<view class='goodsCount'>{{goodsData.data5}}</view>
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
						¥{{totlePrice}}
					</span>
			</div>
			<div class="priceInfo-TotalPrice">
				<span>
					运费（快递）
					</span>
				<span>
						¥{{totlePrice}}
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
						¥{{playTotal}}
					</span>
			</div>
		</div>
		<div class="orderTimeInfo">
			<span class="orderNumbInfo">
			订单编号：1510000000
			</span>
			<span class="orderNumbInfo">
			创建时间：2018-02-24 08:21:21
			</span>
			<span class="orderNumbInfo">
			付款时间：2018-02-24 08:21:21
			</span>
			<span class="orderNumbInfo">
			发货时间：2018-02-24 08:21:21
			</span>
			<span class="orderNumbInfo">
			成交时间：2018-02-24 08:21:21
			</span>
		</div>
		<div class="spaceBottom">

		</div>
		<div class="orderOpertion">
			<div class="orderOpertion-contact">
				<div class="left-opertion">

					<image class="orderOpertion-phoneImg" />
					<div class="orderOpertion-contacter">
						联系商家
					</div>
				</div>
				<div class="right-opertion">
					提醒发货
				</div>

			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				urlData: {},
				orderState: '已付款，待发货\等待付款（剩余。。）\待收货',
				receivePerson: '小猴子',
				receivePhoneNumb: '18888888888',
				detailAddress: '收货地址：安徽省 合肥市 蜀山区 天鹅湖万达广场2号楼1702室',

				goodsStore: '嘉善主厅',

				data1: '2017-12-13 在线支付',

				goodsInfo: [{
					data2: 'iPhone 8s',
					data3: '亮黑64 电信版 套餐三 上海',
					data4: '¥ 0.27',
					data5: '2',
				}, {
					data2: 'iPhone 8s',
					data3: '亮黑64 电信版 套餐三 上海',
					data4: '¥ 0.27',
					data5: '2',
				}],
				totlePrice: '1000',
				discount: '200',
				playTotal: '800'

			}
		},
		onLoad(options) {
			let self = this;
			console.log(options.orderNumb);
			this.$http.OrderOrderDetail({
				'order_no': options.orderNumb
			}).then(res => {
				console.log(JSON.stringify(res));
				if(res.data.code == 'E00000') {
					console.log(JSON.stringify(res));
					self.urlData = res.data.content;
				}
			})
		},
		getOrderListInfo: {},
		created() {}
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
			height: 25px;
			width: 25px;
			background: antiquewhite;
			vertical-align: middle;
			margin-left: 10px;
		}
		#orderStateText {
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
		padding: 10px;
		box-sizing: border-box;
		margin-top: 8px;
		background: white;
		.addressImg {
			height: 40px;
			width: 60px;
			background: antiquewhite;
			margin-top: 9px;
		}
		.addressInfo {
			margin: auto 15px;
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
			padding: 6px 10px;
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
				width: 245px;
				.goodsName {
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
			color: #333333;
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
			padding: 6px;
			background: white;
			display: flex;
			justify-content: space-between;
			color: #999999;
			.left-opertion {
				display: flex;
				.orderOpertion-phoneImg {
					width: 20px;
					height: 20px;
					background: gainsboro;
					margin-top: 8px;
				}
				.orderOpertion-contacter {
					font-size: 14px;
					margin-left: 8px;
					margin-top: 8px;
				}
			}
			.right-opertion {
				border: 1px solid #999;
				border-radius: 3px;
				font-size: 14px;
				padding: 5px;
			}
		}
	}
</style>