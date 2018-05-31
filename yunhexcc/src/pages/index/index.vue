<template>
<div class="page">
  <div class="searchGoods">
    <input type="text" placeholder="商品搜索" @focus="focusFunc" @input="changeFunc" v-model="searchVal" />
    <span v-if="searCloseStatus" @click="blurFunc">取消</span>
  </div>
  <div class="page__bd page__bd_spacing newProBox" v-show="!searCloseStatus">
    <div class="newProduct" v-for="(item, index) in dataList" :key="index" @click="changeDetails(item.product_id)">
      <img :src="item.new_picture" mode="widthFix">
      <div class="proInduce">{{ item.new_name }}</div>
    </div>
    <templeList :data="newData"></templeList>
  </div>
  <scroll-view scroll-y class="searchData animated fadeInUp" v-if="searCloseStatus">
    <templeList :data="searchData"></templeList>
    <div class="noData" v-if="noData">
      <Nocoupon></Nocoupon>
    </div>
  </scroll-view>
</div>
</template>

<script>
import _ from 'lodash'
import Nocoupon from '@/components/noCoupon'
import templeList from '@/components/yhtempIntro'
export default {
  data () {
    return {
      pag_no: 1,
      openId: '',
      noData: true,
      newData: [],
      dataList: [],
      searchData: [],
      dataFlag: true,
      changeFlag: 0,
      searchVal: '',
      searCloseStatus: false
    }
  },
  components: {
    Nocoupon,
    templeList
  },
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
    },
    focusFunc () {
      [this.searCloseStatus, this.searchData] = [true, []]
    },
    blurFunc () {
      [this.searCloseStatus, this.searchData, this.noData, this.searchVal] = [false, [], true, '']
    },
    changeFunc: _.debounce(function (e) {
      this.$http.searchgoods({
        data: JSON.stringify({
          search_content: this.searchVal
        }),
        'openid': this.openId
      }).then(res => {
        console.log(res)
        if (res.data.code == 'E00000') {
          this.noData = false
          this.searchData = res.data.content
        } else {
          [this.noData, this.searchData] = [true, []]
          return wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 1000
          })
        }
      })
    }, 500)
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
  .newProBox{
    margin: .9rem 0 0 0;
  }
  .searchData{
    width: 100%;
    position: fixed;
    top: .9rem;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 10;
    padding: .1rem 0 0 0;
    box-sizing: border-box;
    background: #f0f0f0;
    overflow: scroll;
    .noData{
      font-size: 0;
      width: 100%;
      background: #fff;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 1;
      overflow: hidden;
    }
  }
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
  .searchGoods{
    width: 100%;
    height: .9rem;
    line-height: .9rem;
    background: #fff;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
    border: 1px solid #eee;
    display: flex;
    input{
      flex: 1;
      color: #333;
      font-size: .26rem;
      height: .6rem;
      line-height: .6rem;
      margin: .15rem .2rem;
      padding: 0 0 0 .6rem;
      border-radius: .3rem;
      background: #f0f0f0;
      overflow: hidden;
      position: relative;
      &:after{
        content: '';
        width: .6rem;
        height: .6rem;
        position: absolute;
        top: 0;
        left: 0;
        background-image: url('../../../static/images/search.png');
        background-size: 60% 60%;
        background-repeat: no-repeat;
        background-position: center center;
      }
    }
    span{
      color: #333;
      font-size: .3rem;
      margin: 0 .2rem 0 0;
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
