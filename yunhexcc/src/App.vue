<script>
export default {
  onShow () {
    let self  = this
    wx.login({
      success: function(res) {
        if (res.code) {
          self.$http.Xcclogin({
            'code': res.code
          }).then(res => {
            wx.setStorage({
              key: 'openId',
              data: res.data.content.openid
            })
            wx.setStorage({
              key: 'phoneRegister',
              data: res.data.content.phone_register
            })
          })
        }
      }
    })
  }
}
</script>

<style>
page{
  height: 100%;
}
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 200rpx 0;
  box-sizing: border-box;
}
/* this rule will be remove */
* {
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
}
</style>
