<template>
  <div class="page">
    <div class="pageIndex">
      <ul>
        <li v-for="(item, index) in addrList" :class="{active: fromId == 1}" :key="index">
          <div v-if="fromId != 1" class="choise" @click="choiseFunc(index, item.address_id)">
            <i v-if="listFlag == index" class="icon_select"></i>
            <i v-else class="icon_unselect"></i>
          </div>
          <div class="content">
            <div class="contName">{{ item.receiver_name }} ({{ item.receiver_phone }})</div>
            <div class="contAddr">
              <span v-if="item.address_flag == '1'">[默认地址]</span>
              {{ item.receiver_area }}{{ item.detail_address }}
            </div>
          </div>
        </li>
      </ul>
      <div class="noData" v-if="noData">
        <Nocoupon></Nocoupon>
      </div>
      <div class="addManager" @click="managerFunc">
        <span>管理地址</span>
      </div>
    </div>
  </div>
</template>

<script>
import Nocoupon from '@/components/noCoupon'
export default {
  data () {
    return {
      fromId: 0,
      openId: '',
      noData: '',
      listFlag: -1,
      addrList: []
    }
  },
  components: {
    Nocoupon
  },
  methods: {
    managerFunc () {
      wx.navigateTo({
        url:'/pages/addrManager/main'
      })
    },
    choiseFunc (index, id) {
      let self = this
      this.listFlag = index
      wx.setStorage({
        key: 'choiseAddr',
        data: self.addrList[index]
      })
      wx.navigateBack({
        delta: 1
      })
    }
  },
  onLoad (options) {
    this.fromId = options.from
  },
  onShow () {
    let self = this
    self.noData = false
    self.addrList = []
    wx.getStorage({
      key: 'openId',
      success: function(res) {
        self.openId = res.data
        self.$http.selectAddress({
          'openid': self.openId
        }).then(res => {
          if (res.data.content === null) {
            return self.noData = true
          }
          if (res.data.code == 'E00000' && res.data.content.length) {
            self.addrList = res.data.content
            self.addrList.map((item, index) => {
              if (item.address_flag == '1') {
                self.listFlag = index
              }
            })
          }
        })
      } 
    })
  }
}
</script>

<style lang="less" scoped>
.page{
  width: 100%;
  height: 100%;
  position: relative;
  background: #f3f5f9;
  .pageIndex,ul{
    width: 100%;
    li{
      width: 100%;
      padding: .2rem 0;
      margin: 0 0 .2rem 0;
      background: #fff;
      display: flex;
      .choise{
        width: 1rem;
        position: relative;
        i{
          display: inline-block;
          width: .46rem;
          height: .46rem;
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          margin: auto auto;
          background-size: 100% 100%;
          background-repeat: no-repeat;
          &.icon_unselect{
            background-image: url('../../../static/images/unselect.png');
          }
          &.icon_select{
            background-image: url('../../../static/images/select.png');
          }
        }
      }
      .content{
        flex: 1;
        font-size: .28rem;
        margin: 0 .3rem 0 0;
        .contName{
          color: #333;
          line-height: .5rem;
        }
        .contAddr{
          color: #777;
          line-height: .5rem;
          span{
            color: #ffda44;
          }
        }
      }
      &.active{
        padding: .2rem 0 .2rem .3rem;
      }
    }
  }
  ul{
    padding: 0 0 1.2rem 0; 
  }
  .noData{
    font-size: 0;
    width: 100%;
    padding: 0.4rem 0 0 0;
    background: #fff;
    position: absolute;
    top: 0;
    bottom: 1.1rem;
    left: 0;
    right: 0;
    z-index: 1;
    overflow: hidden;
  }
  .addManager{
    color: #222;
    font-size: .32rem;
    width: 100%;
    height: 1.1rem;
    line-height: 1.1rem;
    text-align: center;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    background: #ffda44;
  }
}
</style>
