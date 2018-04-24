<template>
    <div class="page">
    </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  mounted () {
    wx.showLoading({
      title: '玩命加载中'
    })
    setTimeout(() => {
      wx.hideLoading()
    }, 1000)
    wx.setNavigationBarTitle({ title: '关注'})
    wx.chooseAddress({
      success: function (res) {
        console.log(res.userName)
        console.log(res.postalCode)
        console.log(res.provinceName)
        console.log(res.cityName)
        console.log(res.countyName)
        console.log(res.detailInfo)
        console.log(res.nationalCode)
        console.log(res.telNumber)
      }
    })
  }
}
</script>

<style>
  page{
    background: #f3f5f9;
  }
</style>
