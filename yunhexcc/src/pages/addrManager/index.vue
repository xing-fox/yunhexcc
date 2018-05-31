<template>
  <div class="page">
    <div class="pageIndex">
      <ul>
        <li v-for="(item, index) in addrList" :key="index">
          <div class="content">
            <div class="contName">{{ item.receiver_name }} ({{ item.receiver_phone }})</div>
            <div class="contAddr">
              {{ item.receiver_area }}{{ item.detail_address }}
            </div>
          </div>
          <div class="contIntro bor-1px-t">
            <span class="default" @click="defaultFunc(index, item.address_id)">
              <i v-if="item.address_flag == '1'" class="icon_default"></i>
              <i v-else class="icon_undefault"></i>
              <span class="introName">设为默认</span>  
            </span>
            <span class="delete" @click="deleteFunc(index, item.address_id)">
              <i class="icon_delete"></i><span class="introName">删除</span>  
            </span>
            <span class="edit" @click="editFunc(index)">
              <i class="icon_edit"></i><span class="introName">编辑</span>  
            </span>
          </div>
        </li>
      </ul>
      <div class="noData" v-if="noData">
        <Nocoupon></Nocoupon>
      </div>
      <div class="addManager" @click="addFunc">
        <span>新增收货地址</span>
      </div>
    </div>
  </div>
</template>

<script>
import Nocoupon from '@/components/noCoupon'
export default {
  data () {
    return {
      openId: '',
      noData: '',
      addrList: []
    }
  },
  components: {
    Nocoupon
  },
  methods: {
    init () {
      this.$http.selectAddress({
        'openid': this.openId
      }).then(res => {
        if (res.data.content === null) {
          return this.noData = true
        } else {
          this.addrList = res.data.content
        }
      })
    },
    defaultFunc (index, id) {
      this.$http.defaultAddress({
        data: JSON.stringify({
          address_id: id
        }),
        'openid': this.openId
      }).then(res => {
        if (res.data.code == 'E00000') {
          this.init()
          wx.showToast({
            title: '默认地址修改成功',
            icon: 'none',
            duration: 1000
          })
        }
      })
    },
    deleteFunc (index, id) {
      let self = this
      wx.showModal({
        title: '小猿提示',
        content: '确定删除该收货地址吗?',
        success: function(res) {
          if (res.confirm) {
            self.$http.deleteAddress({
              data: JSON.stringify({
                address_id: id
              }),
              'openid': self.openId
            }).then(res => {
              self.init()  
            })
          } else if (res.cancel) {
            return false
          }
        }
      })
    },
    editFunc (index) {
      wx.navigateTo({
        url:'/pages/addrEdit/main?index=' + index
      })
    },
    addFunc () {
      wx.navigateTo({
        url:'/pages/addrEdit/main'
      })
    }
  },
  onShow () {
    let self = this
    self.addrList = []
    self.noData = false
    wx.getStorage({
      key: 'openId',
      success: function(res) {
        self.openId = res.data
        self.init()
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
      padding: .3rem 0 0 0;
      margin: 0 0 .2rem 0;
      box-sizing: border-box;
      background: #fff;
      .content{
        font-size: .28rem;
        margin: 0 0 .3rem 0;
        padding: 0 .3rem;
        .contName{
          color: #333;
          line-height: .4rem;
        }
        .contAddr{
          color: #777;
          line-height: .4rem;
          span{
            color: #ffda44;
          }
        }
      }
      .contIntro{
        color: #777;
        font-size: .26rem;
        height: .9rem;
        line-height: .9rem;
        padding: 0 .3rem;
        display: flex;
        i{
          display: inline-block;
          background-size: 100% 100%;
          background-repeat: no-repeat;
          margin: 0 .1rem 0 0;
          vertical-align: middle;
        }
        .introName{
          vertical-align: middle;
        }
        .icon_default{
          width: .46rem;
          height: .46rem;
          background-image: url('../../../static/images/select.png');
        }
        .icon_undefault{
          width: .46rem;
          height: .46rem;
          background-image: url('../../../static/images/unselect.png');
        }
        .icon_delete{
          width: .36rem;
          height: .36rem;
          background-image: url('../../../static/images/del.png');
        }
        .icon_edit{
          width: .36rem;
          height: .36rem;
          background-image: url('../../../static/images/edit.png');
        }
        .default{
          flex: 1;
        }
        .delete{
          margin: 0 .5rem 0 0;
        }
      }
    }
  }
  ul{
    padding: 0 0 1.2rem 0; 
  }
  .noData{
    font-size: 0;
    width: 100%;
    background: #fff;
    padding: 0.4rem 0 0 0;
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
