<template>
  <div id="tel" class="bor-1px-t fadeInUp animated">
    <div class="telTip">
      <i></i><span>请先绑定手机号，便于领取优惠券和店员提供服务时进行验证</span>
    </div>
    <input class="tel" type="tel" placeholder="请输入您的手机号" v-model="telephone">
    <div class="verfiCode">
      <input type="number" placeholder="请输入手机验证码" v-model="verfyCode">
      <span v-if="phoneSure" @click="sendCodesFunc">发送验证码</span>
      <span v-else>{{ timeLeave }}s后重新发送</span>
    </div>
    <div class="commit" @click="commitFunc">
      <span>立即绑定</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'telSure',
  data () {
    return {
      openId: '',
      timeLeave: 60,
      timeInter: '',
      phoneSure: true,
      telephone: '',
      verfyCode: ''
    }
  },
  onLoad () {
    let self = this
    wx.getStorage({
      key: 'openId',
      success: function(res) {
        self.openId = res.data
      } 
    })
  },
  methods: {
    changeTime () {
      this.timeInter = setInterval(() => {
        if (this.timeLeave === 0) {
          this.phoneSure = true
          this.timeLeave = 60
          clearInterval(this.timeInter)
          return false
        }
        this.timeLeave--
      }, 1000)
    },
    commitFunc () {
      if (!this.telephone) {
        return wx.showToast({
          title: '请输入手机号',
          icon: 'none',
          duration: 2000,
          mask: true
        })
      }
      if (!this.verfyCode) {
        return wx.showToast({
          title: '请输入手机验证码',
          icon: 'none',
          duration: 2000,
          mask: true
        })
      }
      this.$http.bindPhone({
        'phone': this.telephone,
        'identifycode': this.verfyCode,
        'openId': window.localStorage.getItem('openId')
      }).then(res => {
        if (res.success) {
          this.$alert({
            title: ' ',
            content: res.msg
          }).then(() => {
            this.$emit('phoneChangeFunc')
          })
        } else {
          this.$alert({
            title: ' ',
            content: res.msg
          })
        }
      })
    },
    sendCodesFunc () {
      if (!this.telephone) {
        return wx.showToast({
          title: '请输入手机号',
          icon: 'none',
          duration: 2000,
          mask: true
        })
      }
      if (!(/^1[3|4|5|7|8|9][0-9]\d{4,8}$/.test(this.telephone))) {
        return wx.showToast({
          title: '手机号输入错误',
          icon: 'none',
          duration: 2000,
          mask: true
        })
      }
      this.$http.getIdentifyCode({
        data: JSON.stringify({
          'phone': this.telephone
        }),
        'openid': this.openId
      }).then(res => {
        console.log(res)
        if (res.code === 'E00000') {
          wx.showToast({
            title: '发送成功',
            icon: 'none',
            duration: 2000,
            mask: true
          })
          this.phoneSure = false
          this.changeTime()
        } else {
          wx.showToast({
            title: res.msg,
            icon: 'none',
            duration: 2000,
            mask: true
          })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
  #tel{
    font-size: 0;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 1000;
    background: #fff;
    overflow: scroll;
    .telTip{
      color: #999;
      font-size: .26rem;
      width: 6.7rem;
      margin: .24rem auto .52rem;
      text-align: left;
      display: flex;
      i{
        display: inline-block;
        width: .4rem;
        height: .4rem;
        vertical-align: middle;
        background-image: url('../../static/images/light.png');
        background-size: 100% 100%;
        background-repeat: no-repeat;
      }
      span{
        line-height: .36rem;
        vertical-align: middle;
        margin: 0 0 0 .12rem;
      }
    }
    input{
      border: none;
      margin: 0;
      padding: 0 0 0 .2rem;
      width: 6.7rem;
      height: .9rem;
      text-align: left;
      box-sizing: border-box;
      -webkit-appearance: none;
      &.tel{
        color: #999;
        font-size: .3rem;
        margin: 0 auto .4rem;
        border-radius: 3px;
        border: 1px solid #ddd;
      } 
    }
    .verfiCode{
      border: none;
      width: 6.7rem;
      height: .9rem;
      margin: 0 auto;
      position: relative;
      input{
        color: #999;
        font-size: .3rem;
        border-radius: 3px;
        border: 1px solid #ddd;
      }
      span{
        color: 222;
        font-size: .3rem;
        height: .9rem;
        line-height: .9rem;
        padding: 0 .2rem;
        position: absolute;
        top: 0;
        right: 0;
        z-index: 10;
      }
    }
    .commit{
      color: #222;
      font-size: .3rem;
      width: 6.7rem;
      height: .9rem;
      line-height: .9rem;
      border-radius: 3px;
      background: #ffda44;
      margin: 1.08rem auto 0;
      text-align: center;
    }
  }
</style>
