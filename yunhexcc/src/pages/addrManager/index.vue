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
            <span class="default" @click="defaultFunc(index)">
              <i v-if="listFlag == index" class="icon_default"></i>
              <i v-else class="icon_undefault"></i>
              <span class="introName">设为默认</span>  
            </span>
            <span class="delete" @click="deleteFunc(index)">
              <i class="icon_delete"></i><span class="introName">删除</span>  
            </span>
            <span class="edit" @click="editFunc(index)">
              <i class="icon_edit"></i><span class="introName">编辑</span>  
            </span>
          </div>
        </li>
      </ul>
      <div class="addManager">
        <span>添加</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      openId: '',
      addrList: [],
      listFlag: 0
    }
  },
  methods: {
    defaultFunc (index) {},
    deleteFunc (index) {},
    editFunc (index) {}
  },
  onShow () {
    let self = this
    wx.getStorage({
      key: 'openId',
      success: function(res) {
        self.openId = res.data
        self.$http.selectAddress({
          'openid': self.openId
        }).then(res => {
          if (!res.data.content.length) {
            return false
          } else {
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
  .addManager{
    color: #fff;
    font-size: .32rem;
    width: 100%;
    height: 1.1rem;
    line-height: 1.1rem;
    text-align: center;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    background: #ffda44;
  }
}
</style>
