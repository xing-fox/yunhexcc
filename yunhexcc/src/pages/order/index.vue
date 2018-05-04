<template>
	<div style="background-color: #f7f7f7;">
		<div class="nav-list">
			<scroll-view class="swiper-tab" scroll-x style="width: 100%">

				<view :style="menuStyle" v-for="title in titleData" :key="index" class="index == 0? swiper-selectTab-item :swiper-tab-item" :data-current="index" @tap="swichNav">{{title.text}}
					<view class="block" :style="style"></view>
				</view>

			</scroll-view>
		</div>
		<div class="content-list">
			<scroll-view class="content-scroller" scroll-y style='width: 100%'>
				<view v-for="content in orderInfo" class="content-item" @tap='contentClick' track-by="$numb">
					<view class='topView'>
						<view class='storeName'>{{content.data0}}</view>
						<view class='startDate'>{{content.data1}}</view>
					</view>
					<view class='middleView' v-for='(goodsData,subIndex) in content.goodsInfo' @tap='orderClick'>
						<img class='goodsImg'></img>
						<view class='goodNameInfo'>
							<view class='goodsName'>{{goodsData.data2}}</view>
							<view class='goodsPlans'>{{goodsData.data3}}</view>
						</view>
						<view class='goodsPriceInfo'>
							<view class='goodsPrice'>{{goodsData.data4}}</view>
							<view class='goodsCount'>{{goodsData.data5}}</view>
						</view>
					</view>
					<view class='footView'>
						<view class='totalPrice'>
							{{content.data7}}
							<span class='goodsTotalPrice'>¥3998（含运费0.00）</span>
						</view>
						<view class='sepertLine'></view>
						<view class='opertionBtn'>
							<view class='cancelOrderBtn'>取消订单</view>
							<view class='delectOrderBtn'>删除</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</div>
	</div>
</template>

<script>
	export default {

		data() {

			return {
				selectTab: 0,

				titleData: [{
						text: '全部',
					},
					{
						text: '待付款',
					},
					{
						text: '待发货',
					},
					{
						text: '待收货',
					},
					{
						text: '待评价',
					}
				],

				orderInfo: [{
						data0: '迪信通农工商店',
						data1: '2017-12-13 在线支付',
						data6: '付款',
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
						}]

					},
					{
						data0: '迪信通农工商店',
						data1: '2017-12-13 在线支付',

						goodsInfo: [{
							data2: 'iPhone 8s',
							data3: '亮黑64 电信版 套餐三 上海',
							data4: '¥ 0.27',
							data5: '2',
							data6: '付款',
							data7: '两件商品合计'
						}]

					},
					{
						data0: '迪信通农工商店',
						data1: '2017-12-13 在线支付',
						data2: 'iPhone 8s',
						goodsInfo: [{
							data2: 'iPhone 8s',
							data3: '亮黑64 电信版 套餐三 上海',
							data4: '¥ 0.27',
							data5: '2',
							data6: '付款',
							data7: '两件商品合计'
						}]

					}
				]

			}

		},
		methods: {
			swichNav(e) {

				this.selectTab = e.target.dataset.current;
				console.log(this.selectTab)

			},
			swiperChange(e) {}
		},
		computed: {
			style() {

			},
			menuStyle(e) {

				return {
					color: 'red',
					fontSize: '13px'

				}
			}

		},
		contentClick: {

		},
		orderClick: {

		}

	}
</script>

<style lang="less" scoped>
	.swiper-tab {
		width: 100%;
		text-align: center;
		line-height: 42px;
		white-space: nowrap;
		position: relative;
		background-color: white;
		.swiper-tab-item {
			transition: all 1s ease-out;
			font-size: 18px;
			height: 42px;
			display: inline-block;
			color: #777777;
			width: 20%;
			.block {
				display: block;
				position: absolute;
				left: 0;
				height: 2px;
				background: #ff9008;
				bottom: 20px;
				transition: left 50px;
				z-index: 99;
			}
		}
		.swiper-selectTab-item {
			transition: all 1s ease-out;
			font-size: 18px;
			height: 42px;
			display: inline-block;
			color: red;
			width: 20%;
			.block {
				display: block;
				position: absolute;
				left: 0;
				height: 2px;
				background: red;
				bottom: 20px;
				transition: left 50px;
				z-index: 99;
			}
		}
	}
	
	.content-item {
		width: 100%;
		position: relative;
		margin-top: 18px;
		.topView {
			display: block;
			width: 100%;
			height: 50px;
			background-color: white;
			.storeName {
				display: inline;
				text-align: right;
				font-size: 18px;
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
			padding-left: 20px;
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
				margin-left: 20px;
				width: 60%;
				.goodsName {
					font-size: 16px;
					height: 37px;
				}
				.goodsPlans {
					font-size: 12px;
					color: #999999;
				}
			}
			.goodsPriceInfo {
				display: inline-block;
				text-align: right;
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
				font-size: 12px;
				.goodsTotalPrice {}
			}
			.sepertLine {
				height: 2px;
				width: 100%;
				background: #f7f7f7;
			}
			.opertionBtn {
				height: 50px;
				width: 100%;
				display: -webkit-flex;
				display: flex;
				font-size: 12px;
				text-align: center;
				flex-direction: flex-direction;
				.cancelOrderBtn {
					padding-top: 8px;
					margin: 8px 8px;
					height: 24px;
					width: 60px;
					color: #999;
					border: 1px solid #f1f1f1;
				}
				.delectOrderBtn {
					padding-top: 8px;
					margin: 8px 8px;
					height: 24px;
					width: 60px;
					color: #222;
					background-color: #fada63;
					border: 1px solid #fada63;
				}
			}
		}
	}
</style>