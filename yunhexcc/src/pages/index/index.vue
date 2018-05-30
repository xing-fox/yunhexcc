<template>
<div class="page">
  <div class="page__bd page__bd_spacing">
    <div class="newProduct" v-for="(item, index) in dataList" :key="index" @click="changeDetails(item.product_id)">
      <img :src="item.new_picture" mode="widthFix">
      <div class="proInduce">{{ item.new_name }}</div>
    </div>
    <templeList :data="newData"></templeList>
  </div>
</div>
</template>

<script>
import templeList from '@/components/yhtempIntro'
export default {
  data () {
    return {
      pag_no: 1,
      openId: '',
      newData: [],
      dataList: [],
      dataFlag: true,
      changeFlag: 0
    }
  },
  components: {
    templeList
  },
  created () {},
  methods: {
    changeDetails (id) {
      wx.navigateTo({
        url: '/pages/details/main?id=' + id
      })
    },
    allProduct () {
      this.$http.CJJX({
        data: JSON.stringify({
          pag_no: this.pag_no,
          pag_num: 6
        }),
        'openid': this.openId
      }).then(res => {
        this.newData = this.newData.concat(res.data.content.data)
        if (res.data.content.data.length < 5) {
          this.dataFlag = false
        }
      })
    }
  },
  onLoad (options) {
    this.changeFlag = options.flag || 0
    let self = this
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
            self.openId = res.data.content.openid
            if (self.changeFlag == 0) {
              self.$http.Allproduct({
                data: JSON.stringify({
                  pag_no: 1,
                  pag_num: 5
                }),
                'openid': self.openId
              }).then(res => {
                self.dataList = res.data.content.data
              })
              self.allProduct()
            }
            if (self.changeFlag == 1) {
              wx.switchTab({
                url: '/pages/mine/main'
              })
            }
          })
        }
      }
    })
  },
  onShow () {
    if (this.changeFlag != 0 ) {
      this.$http.Allproduct({
        data: JSON.stringify({
          pag_no: 1,
          pag_num: 5
        }),
        'openid': this.openId
      }).then(res => {
        this.dataList = res.data.content.data
      })
      this.allProduct()
    }
  },
  onReachBottom () {
    if (this.dataFlag) {
      this.pag_no++
      this.allProduct()
    }
  },
  onShareAppMessage: function (res) {
    return {
      title: '潮机优选',
      path: '/page/index'
    }
  }
}
</script>

<style>
  page{
    background: #f3f5f9;
  }
</style>
<style lang="less" scoped>
  .newProduct{
    font-size: 0;
    width: 100%;
    margin: 0 0 .2rem 0;
    img{
      width: 100%;
    }
    .proInduce{
      color: #333;
      font-size: .28rem;
      height: .8rem;
      line-height: .8rem;
      padding: 0 0 0 .2rem;
      background: #fff;
    }
  }
  .swiper{
    display: block;
    height: 3.52rem;
  }
  .slide-image {
    width: 100%;
    height: 100%;
  }
</style>
