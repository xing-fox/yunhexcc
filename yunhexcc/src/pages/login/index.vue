<template>
  <div id="tel" class="bor-1px-t">
    <div class="telTip">
      <i></i><span>请先微信授权绑定手机号</span>
    </div>
    <div class="telePhone">
      <label for="tel">手机号：</label>
      <input class="tel bor-1px-b" type="number" placeholder="输入您的手机号" v-model="telephone">
      <span v-if="wxInfoShow" class="bor-1px-b"><button open-type="getUserInfo">微信授权绑定手机号</button></span>
    </div> 
    <div class="verfiCode">
      <label for="verficode">验证码：</label>
      <input class="bor-1px-b" type="number" placeholder="输入短信验证码" v-model="verfyCode">
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
      verfyCode: '',
      userInfo: '',
      wxInfoShow: false
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
  onShow () {
    let self = this
    wx.getSetting({
      success: function(res){
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function(res) {
              self.userInfo = res
            }
          })
        } else {
          self.wxInfoShow = true
        }
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
      let self = this
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
      if (self.wxInfoShow) {
        wx.getUserInfo({
          success: function(res) {
            self.userInfo = res
          }
        })
      }
      if (!self.userInfo) {
        wx.showToast({
          title: '请先微信授权',
          icon: 'none',
          duration: 10000,
          mask: true
        })
      }
      this.$http.bindPhone({
        'phone': this.telephone,
        'identifycode': this.verfyCode,
        'openid': this.openId,
        'rawData': this.userInfo.rawData,
        'signature': this.userInfo.signature,
        'encryptedData': this.userInfo.encryptedData,
        'iv': this.userInfo.iv
      }).then(res => {
        if (res.data.code == 'E00000') {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 2000,
            mask: true
          })
          wx.setStorage({
            key: 'phoneRegister',
            data: '1'
          })
          setTimeout(() => {
            wx.navigateBack({
              delta: 1
            })  
          }, 1000)
        } else {
          wx.showToast({
            title: '绑定失败!',
            icon: 'none',
            duration: 2000,
            mask: true
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
        if (res.data.code === 'E00000') {
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
            title: res.data.msg,
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
      margin: .24rem auto .4rem;
      text-align: left;
      display: flex;
      i{
        display: inline-block;
        width: .4rem;
        height: .4rem;
        vertical-align: middle;
        background-image: url('../../../static/images/light.png');
        background-size: 100% 100%;
        background-repeat: no-repeat;
      }
      span{
        line-height: .36rem;
        vertical-align: middle;
        margin: .04rem 0 0 .12rem;
      }
    }
    .telePhone{
      margin: 0 .4rem 0 0;
      display: flex;
      label{
        color: #333;
        font-size: .3rem;
        height: .6rem;
        margin: 0 0 0 .4rem;
        text-align: center;
        line-height: .6rem;
        vertical-align: middle;
      }
      input{
        margin: 0;
      }
      button{
        border: none;
        -webkit-appearance: none;
        background: none;
        color: #ffda44;
        font-size: .28rem;
        height: .6rem;
        line-height: .6rem;
        padding: 0;
        &:after{
          content: none;
        }
        &:before{
          content: none;
        }
      }
    }
    input{
      flex: 1;
      border: none;
      margin: 0 .4rem 0 0;
      padding: 0 0 0 .2rem;
      height: .6rem;
      text-align: left;
      box-sizing: border-box;
      -webkit-appearance: none;
      vertical-align: middle;
      &.tel{
        color: #999;
        font-size: .3rem;
        border-radius: 3px;
      } 
    }
    .verfiCode{
      border: none;
      height: .6rem;
      margin: .3rem auto;
      display: flex;
      position: relative;
      label{
        color: #333;
        font-size: .3rem;
        height: .6rem;
        margin: 0 0 0 .4rem;
        text-align: center;
        line-height: .6rem;
        vertical-align: middle;
      }
      input{
        color: #999;
        font-size: .3rem;
        border-radius: 3px;
        margin: 0;
      }
      span{
        color: #ffda44;
        font-size: .26rem;
        height: .5rem;
        line-height: .5rem;
        padding: 0 .2rem;
        margin: 0 .4rem 0 0;
        border: 1px solid #ffda44;
        border-radius: .25rem;
        box-sizing: border-box;
      }
    }
    .commit{
      color: #fff;
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
