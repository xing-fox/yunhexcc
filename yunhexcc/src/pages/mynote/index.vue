<template>
	<div class="page">
		<div id="content">
			<ul class='contTop'>
				<li @click="NewDataFunc(true)">
					<span :class="{active: tableFlag}">最新的</span>
				</li>
				<li @click="LatestDataFunc(true)">
					<span :class="{active: !tableFlag}">附近的</span>
				</li>
			</ul>
			<div class="options" v-if="listData">
				<WaterFall :list="listData"></WaterFall>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapActions } from 'vuex'
	import { Base64 } from 'js-base64'
	import WaterFall from '@/components/Waterfall'

	export default {
		data() {
			return {
				pagNo: 1,
				listData: [], // 列表数据,
				tableFlag: true, // true,最近的 | false,附近的
				listTotalNum: '' // 逛逛列表总数
			}

		},
		methods: {

		}
	}
</script>

<style lang='less' scoped>
	.page {
		#content {
			font-size: 0;
			width: 100%;
			background: #fff;
			margin: .06rem 0 0 0;
			.contTop {
				color: #999;
				font-size: .15rem;
				width: 100%;
				height: .42rem;
				line-height: .42rem;
				display: flex;
				li {
					flex: 1;
					height: 100%;
					text-align: center;
					span {
						height: 100%;
						padding: 0 .1rem;
						box-sizing: border-box;
						display: inline-block;
						&.active {
							color: #222;
							border-bottom: .04rem solid #ffda44;
						}
					}
				}
			}
			.listTotal {
				color: #999;
				font-size: .14rem;
				width: 100%;
				height: .42rem;
				line-height: .42rem;
				background: #f4f6fa;
				position: relative;
				.imgPoint {
					display: inline-block;
					width: .04rem;
					margin: 0 0 0 .08rem;
				}
				span {
					margin: 0 0 0 .1rem;
				}
				.imgRefresh {
					width: .16rem;
					position: absolute;
					top: .13rem;
					right: .1rem;
				}
			}
		}
		.options {
			width: 100%;
			padding: .2rem 0 0 0;
			background: #f4f6fa;
		}
	}
</style>