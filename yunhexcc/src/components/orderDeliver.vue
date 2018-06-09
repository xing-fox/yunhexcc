<template>
	<div class="page">
		<div class="pageContent" :class="{bounceIn: animalClassfadeIn,animated: animalClassfadeIn,animated: animalClassfadeOut,bounceOut: animalClassfadeOut}">
			<div class="content">
				<div class="title">
					修改备注
				</div>
				<div class="context">
					• 请确认商品已准备好，安排店员派送或通知顾客前来自提。
				</div>
				<div class="context">
					• 商品序列号为机身号或其他商品唯一编码，若没有可以不填写。
				</div>
				<div class="context">
					• 系统会发送提货码给顾客，交货时需验证提货码。
				</div>
				<input class="numbInput" placeholder='商品序列号' />
				<input class="numbInput" placeholder='备注说明' />
				<input class="numbInput" placeholder='配送员' />
			
			</div>
			<div class="botton">
				<div class="leftBtn" @click="pageFunc">
					取消
				</div>
				<div class="rightBtn">
					确定
				</div>

			</div>
		</div>
		<div class="zzc" @click="pageFunc"></div>
	</div>

</template>

<script>
	export default {
		props: {
			orderId: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				animalClassfadeIn: true,
				animalClassfadeOut: false
			}
		},

		onload() {},
		methods: {
			pageFunc(e) {
				console.log("取消")
				this.animalClassfadeIn = false
				setTimeout(() => {
					this.animalClassfadeOut = true
				}, 0)
				setTimeout(() => {
					this.$emit('cancelClick')
				}, 300)
			}
		}
	}
</script>

<style lang='less' scoped>
	.page {
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 1000;
		.pageContent {
			width: 6.6rem;
			height: 8.8rem;
			border-radius: .1rem;
			background-color: white;
			position: absolute;
			top: 1rem;
			left: .45rem;
			z-index: 10;
			.content {
				width: 100%;
				height: 7.8rem;
				.title {
					font-family: PingFangSC-Medium;
					font-size: .32rem;
					color: #333333;
					letter-spacing: 0;
					text-align: center;
					width: 100%;
					height: .96rem;
					line-height: .96rem;
				}
				.context {
					padding: .05rem .2rem;
					font-family: PingFangSC-Regular;
					font-size: 15px;
					color: #333333;
				}
				.numbInput {
					width: 5.5rem;
					height: 0.9rem;
					margin-left: .55rem;
					margin-bottom: .16rem;
					font-size: .32rem;
					border-radius: .06rem;
					border: 1px solid #DDD;
					color: #999999;
					text-align: center;
				}
			}
			.botton {
				width: 100%;
				height: 1rem;
				line-height: 1rem;
				display: flex;
				text-align: center;
				font-size: .32rem;
				.leftBtn {
					width: 50%;
					color: #999999;
					border-top: 1px solid #DDD;
					border-right: 1px solid #DDD;
				}
				.rightBtn {
					width: 50%;
					border-top: 1px solid #DDD;
					color: #333333;
				}
			}
		}
		.zzc {
			width: 100%;
			height: 100%;
			position: absolute;
			top: 0;
			left: 0;
			bottom: 0;
			right: 0;
			z-index: 1;
			background-color: rgba(0, 0, 0, .5);
		}
	}
</style>