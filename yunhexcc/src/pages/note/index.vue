<template>
  <div class="page">
    <div class="searchNotes">
      <input type="text" placeholder="搜索笔记" @focus="focusFunc" @input="changeFunc" v-model="searchVal" />
      <span v-if="searCloseStatus" @click="blurFunc">取消</span>
    </div>
    <Note :noteList="data"></Note>
    <scroll-view scroll-y class="searchData animated fadeInUp" v-if="searCloseStatus">
      <Note :data="searchData"></Note>
      <div class="noData" v-if="noData">
        <Nocoupon></Nocoupon>
      </div>
    </scroll-view>
  </div>
</template>

<script>
import Note from '@/components/note'
import Nocoupon from '@/components/noCoupon'
export default {
  data () {
    return {
      data: '',
      noData: true,
      searchVal: '',
      searchData: [],
      changeFlag: '',
      searCloseStatus: false
    }
  },
  components: {
    Note,
    Nocoupon
  },
  methods: {
    focusFunc () {
      [this.searCloseStatus, this.searchData] = [true, []]
    },
    blurFunc () {
      [this.searCloseStatus, this.searchData, this.noData, this.searchVal] = [false, [], true, '']
    }
  },
  onLoad (options) {
    this.changeFlag = options.flag || 0 // ...个人中心flag
    let self = this
    wx.login({
      success: function(res) {
        if (res.code) {
          self.$http.Xcclogin({
            'code': res.code
          }).then(res => {
            wx.setStorage({ // ...存储openId
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
            if (self.changeFlag == 1) { // ...个人中心flag
              wx.switchTab({
                url: '/pages/mine/main'
              })
            }
          })
        }
      }
    })
  },
  onShow () {}
}
</script>

<style>
page{
  background: #f3f5f9;
}
</style>

<style lang="less" scoped>
  .page{
    width: 100%;
    background: #f3f5f9;
    .searchNotes{
      width: 100%;
      height: .9rem;
      line-height: .9rem;
      background: #fff;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1;
      border-bottom: 1px solid #eee;
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
  }
</style>
