<template>
	<div class="page">
		<div class="singleOrder" v-for="(content,index) in listData" :key="index">

			<div class="topdiv">
				<span class="orderNumb">
				订单编号：{{content.order_no}}
				</span>
				<span class="customerName">
				顾客：{{content.customer_name}}
				</span>
			</div>
			<div class="sepertLine">
			</div>
			<div class='middlediv' v-for='(goodsData,subIndex) in content.goodsInfo' :key="subIndex" @click='orderClick(content.order_no,content.order_type)'>
				<img class='goodsImg' :src="goodsData.picture_url" />
				<div class='goodNameInfo'>
					<div class='goodsName'>{{goodsData.product_name}}</div>
					<div class='goodsPlans'>{{goodsData.color?goodsData.color:''}}{{goodsData.memory_capacity?goodsData.memory_capacity:''}} {{goodsData.supplier_name?goodsData.supplier_name:''}} {{goodsData.contract_name?goodsData.contract_name:''}}</div>
				</div>
				<div class='goodsPriceInfo'>
					<div class='goodsPrice'>¥ {{goodsData.product_price}}</div>
					<div class='goodsCount'>x {{goodsData.product_number}}</div>
				</div>
			</div>
			<div class="bottomdiv">
				<div class="orderStatus">
					<span class="orderStatusSpan" v-if="content.order_status == 1">
				订单状态：等待付款
				</span>
					<span class="orderStatusSpan" v-else-if="content.order_status == 2">
				订单状态：已收款，待发货
				</span>
					<span class="orderStatusSpan" v-else-if="content.order_status == 3">
				订单状态：待收货
				</span>
					<span class="orderStatusSpan" v-else-if="content.order_status == 4">
				订单状态：交易成功
				</span>
					<span class="orderStatusSpan" v-else-if="content.order_status == 5">
				订单状态：评价完成
				</span>

					<span class="deliverSpan" v-if="content.delivery_way == 0">
					配送方式：到店自提
					</span>
					<span class="deliverSpan" v-else>
					配送方式：送货上门
					</span>
				</div>
				<div class="sepertLine">
				</div>
				<div class="orderOpertion">
					<div class="left-opertion" @click="callDelivery(content.shop_mobile)">
						<image class="orderOpertion-phoneImg" />
						<div class="orderOpertion-contacter">
							{{content.mobile_code}}
						</div>
					</div>

					<div class="right-opertion">

						<div v-if="content.order_status == 1" class='opertionBtn'>
						</div>
						<div v-if="content.order_status == 2" class='opertionBtn'>
							<div class='orderBtn' @click='orderDeliverClick(content.order_no)'>发货通知</div>
							<div class='orderBtn' @click='stockoutClick(content.order_no)'>缺货</div>
						</div>
						<div v-if="content.order_status == 3" class='opertionBtn'>
							<div class='orderdeliverBtn' @click='inputOrderCodeClick(content.order_no)'>提货验证码</div>
						</div>
						<div v-if="content.order_status == 4" class='opertionBtn'>
							<div class='unClickBtn' @click='deliverOutClick(content.order_no)'>已发货</div>
							<div class='orderBtn' @click='modificationRemarkClick(urlData.order_no)'>修改备注</div>
						</div>

					</div>

				</div>
			</div>
			<div class="spaceLine"></div>
		</div>
		<orderCode v-if="setCodeState == true && setModificationStata == false && setStockOutState ==false && setDeliverState == false" :orderId='selectId' @cancelClick='cancelCodeClick'></orderCode>
		<orderModifyRemark v-if="setModificationStata == true && setStockOutState == false && setCodeState == false  && setDeliverState == false" :orderId='selectId' @cancelClick='cancelCodeClick'></orderModifyRemark>
		<orderDeliver v-if="setDeliverState == true && setModificationStata == false && setStockOutState == false && setCodeState == false" :orderId='selectId' @cancelClick='cancelCodeClick'></orderDeliver>
		<orderStockOut v-if="setStockOutState == true && setModificationStata == false && setDeliverState == false && setCodeState == false" :orderId='selectId' @cancelClick='cancelCodeClick'></orderStockOut>
	</div>

</template>

<script>
	import orderCode from '@/components/orderCode'
	import orderModifyRemark from '@/components/orderModifyRemark'
	import orderDeliver from '@/components/orderDeliver'
	import orderStockOut from '@/components/orderStockOut'
	export default {
		data() {
			return {
				openId: '',
				listData: [],
				selectId: '',
				setCodeState: false,
				setStockOutState: false,
				setDeliverState: false,
				setModificationStata: false

			}
		},

		onLoad() {},

		onShow() {
			let self = this;
			wx.getStorage({
				key: "openId",
				success: function(res) {
					self.openId = res.data
					self.$http.manageorders({
						openid: self.openId
					}).then(res => {
						if(res.data.code == 'E00000') {
							console.log(JSON.stringify(res.data))
							self.listData = res.data.content
						}
					})
				}
			})
		},
		components: {
			orderCode,
			orderModifyRemark,
			orderDeliver,
			orderStockOut
		},
		methods: {
			/* 发货 */
			orderDeliverClick(e) {
				this.setDeliverState = true,
				this.selectId = e
			},
			/* 缺货 */
			stockoutClick(e) {
				this.setStockOutState = true,
				this.selectId = e
			},
			/* 提货码 */
			inputOrderCodeClick(e) {
				this.setCodeState = true,
				this.selectId = e
			},
			/* 修改备注 */
			modificationRemarkClick(e) {
				this.setModificationStata = true,
				this.selectId = e
			},
			cancelCodeClick() {
				console.log('取消+')
				this.setCodeState = false,
				this.setModificationStata = false,
				this.setDeliverState = false,
				this.setStockOutState = false
			},

			/*拨打电话*/
			callDelivery(numb) {
				wx.makePhoneCall({
					phoneNumber: numb,
					success: function() {},
					fail: function() {}
				});
			}

		},
		created() {}
	}
</script>

<style scoped lang="less">
	.singleOrder {
		margin-top: .12rem;
		.topdiv {
			height: .6rem;
			font-family: PingFangSC-Regular;
			font-size: .26rem;
			color: #999999;
			line-height: .6rem;
			display: flex;
			overflow: hidden;
			text-overflow: ellipsis;
			.orderNumb {
				padding-left: .16rem;
				text-align: left;
				width: 58%;
			}
			.customerName {
				padding-right: .16rem;
				text-align: right;
				width: 42%;
			}
		}
		.sepertLine {
			width: 100%;
			height: .02rem;
			background-color: #F4F4F4;
		}
		.middlediv {
			width: 100%;
			height: 1.6rem;
			display: flex;
			padding-top: .4rem;
			.goodsImg {
				display: inline-block;
				width: 1.18rem;
				height: 1.18rem;
				background-color: lightgray;
				margin-left: .2rem;
			}
			.goodNameInfo {
				display: inline-block;
				text-align: left;
				margin-left: .2rem;
				width: 55%;
				.goodsName {
					font-size: .32rem;
					height: .74rem;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
				}
				.goodsPlans {
					font-size: .24rem;
					color: #999999;
				}
			}
			.goodsPriceInfo {
				display: inline-block;
				text-align: right;
				width: 21%;
				.goodsPrice {
					font-size: .32rem;
					height: .74rem;
				}
				.goodsCount {
					font-size: .24rem;
					color: #999999;
				}
			}
		}
		.bottomdiv {
			.orderStatus {
				height: .8rem;
				font-family: PingFangSC-Regular;
				font-size: .24rem;
				color: #999999;
				line-height: .8rem;
				display: flex;
				overflow: hidden;
				text-overflow: ellipsis;
				.orderStatusSpan {
					padding-left: .16rem;
					text-align: left;
					width: 50%;
				}
				.deliverSpan {
					padding-right: .16rem;
					text-align: right;
					width: 50%;
				}
			}
			.sepertLine {
				width: 100%;
				height: .02rem;
				background-color: #F4F4F4;
			}
			.orderOpertion {
				height: 1rem;
				background: white;
				display: flex;
				justify-content: space-between;
				color: #999999;
				.left-opertion {
					display: flex;
					padding: .12rem .32rem;
					.orderOpertion-phoneImg {
						width: .32rem;
						height: .32rem;
						margin-top: .2rem;
						background-size: 100% 100%;
						background-repeat: no-repeat;
						background-image: url(../../../static/images/icon_callup.png);
					}
					.orderOpertion-contacter {
						font-size: .26rem;
						color: #222222;
						font-size: .28rem;
						margin-left: .16rem;
						margin-top: .16rem;
					}
				}
				.right-opertion {
					.opertionBtn {
						height: 1rem;
						display: inline-flex;
						font-size: .28rem;
						text-align: center;
						justify-content: flex-end;
						.orderBtn {
							margin: .16rem .16rem;
							height: .64rem;
							line-height: .64rem;
							width: 1.48rem;
							color: #333;
							box-sizing: border-box;
							border: .02rem solid #333;
							border-radius: .06rem;
						}
						.unClickBtn {
							margin: .16rem .16rem;
							height: .64rem;
							line-height: .64rem;
							width: 1.48rem;
							color: crimson;
						}
						.orderdeliverBtn {
							margin: .16rem .16rem;
							height: .64rem;
							line-height: .64rem;
							width: 2.5rem;
							color: #333;
							box-sizing: border-box;
							border: .02rem solid #333;
							border-radius: .06rem;
						}
					}
				}
			}
		}
		.spaceLine {
			width: 100%;
			height: .12rem;
			background-color: #F4F4F4;
		}
	}
</style>