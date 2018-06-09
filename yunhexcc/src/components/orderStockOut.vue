<template>
	<div class="page">
		<div class="pageContent" :class="{bounceIn: animalClassfadeIn,animated: animalClassfadeIn,animated: animalClassfadeOut,bounceOut: animalClassfadeOut}">
			<div class="content">
				<div class="title">
					提货验证码
				</div>
				<div class="context">
					• 如果门店缺货，不妨看看其他门店时候还有哦！确定后将退款给顾客，并将以消息形式通知。
				</div>
				<textarea class="explainInput" placeholder='备注说明' /></textarea>
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
			height: 7.4rem;
			border-radius: .1rem;
			background-color: white;
			position: absolute;
			top: 2rem;
			left: .45rem;
			z-index: 10;
			.content {
				width: 100%;
				height: 6.4rem;
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
					padding: .2rem;
					font-family: PingFangSC-Regular;
					font-size: 15px;
					color: #333333;
				}
				.explainInput {
					width: 5.5rem;
					height: 3rem;
					margin-left: .55rem;
					font-size: .32rem;
					border-radius: .06rem;
					border: 1px solid #DDD;
					color: #999999;
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