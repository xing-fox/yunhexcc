<template>
  <div class="page">
    <div class="pageContent" :class="{bounceIn: animalClassfadeIn,animated: animalClassfadeIn,animated: animalClassfadeOut,bounceOut: animalClassfadeOut}">
      <div class="content">
        <div class="title">
          提货验证码
        </div>
        <div class="context">
          • 请输入顾客的提货验证码进行验证，通过后再交货！
        </div>
        <input class="codeInput" placeholder='提货验证码' @change="getTakenCode" />
      </div>
      <div class="botton">
        <div class="leftBtn" @click="pageFunc">
          取消
        </div>
        <div class="rightBtn" @click="sureFunc">
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
      },
      goodsId: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        animalClassfadeIn: true,
        animalClassfadeOut: false,
        takenCode: '',
        openId: '',

      }
    },
    created() {
      let self = this
      wx.getStorage({
        key: "openId",
        success: function(res) {
          self.openId = res.data
        }
      })
    },
    methods: {

      getTakenCode(e) {
        this.takenCode = e.target.value
      },

      pageFunc(e) {
        console.log("取消")
        this.animalClassfadeIn = false
        setTimeout(() => {
          this.animalClassfadeOut = true
        }, 0)
        setTimeout(() => {
          this.$emit('cancelClick')
        }, 300)
      },

      sureFunc(e) {

        if(this.takenCode.length == 0) {
          wx.showToast({
            title: '请输入提货码',
            icon: "none",
            duration: 1000,
            mask: false
          });
          return
        }

        let self = this;
        self.$http.takenorder({
          order_no: self.orderId,
          id: self.goodsId,
          token_code: self.takenCode,
          openid: self.openId
        }).then(res => {
          if(res.data.code == 'E00000') {
            wx.showToast({
              title: '提货验证码正确，提货成功！',
              icon: "none",
              duration: 1000,
              mask: false
            });
            setTimeout(() => {
              this.$emit('completeClick')
            }, 1000);

          } else {
            wx.showToast({
              title: res.data.msg,
              icon: "none",
              duration: 1000,
              mask: false
            });
          }
        })
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
      height: 5.2rem;
      border-radius: .1rem;
      background-color: white;
      position: absolute;
      top: 3rem;
      left: .45rem;
      z-index: 10;
      .content {
        width: 100%;
        height: 4.2rem;
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
          padding: 0 .3rem .3rem .3rem;
          font-family: PingFangSC-Regular;
          font-size: 15px;
          color: #333333;
        }
        .codeInput {
          width: 5.5rem;
          height: 1.5rem;
          margin-left: .55rem;
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