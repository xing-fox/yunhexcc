<template>
  <div class="page">
    <div class="pageContent" :class="{fadeIn: animalClassfadeIn,animated: animalClassfadeIn,animated: animalClassfadeOut,fadeOut: animalClassfadeOut}">
      <div class="content">
        <div class="title">
          发货通知
        </div>
        <div class="context">
          • 请确认商品已准备好，安排店员派送或通知顾客前来自提。
        </div>
        <div class="context">
          • 商品序列号为机身号或其他商品唯一编码，若没有可以不填写。
        </div>
        <div class="context">
          • 系统会发送提货码给顾客，交货时需验证提货码。
        </div>
        <input class="numbInput" placeholder='商品序列号' :value="selectSequence" @change="sequenceChange" />
        <input class="numbInput" placeholder='备注说明' :value="selectRemark" @change="remarkChange" />
        <picker @change="bindPickerChange" :value="index" :range="clerkList" range-key="real_name">
          <input class="numbInput" placeholder='配送员' :value="selectClertlect" disabled="true">
        </picker>
      </div>
      <div class="botton">
        <div class="leftBtn" @click="cancelFunc">
          取消
        </div>
        <div class="rightBtn" @click="sureFunc">
          确定
        </div>

      </div>
    </div>
    <div class="zzc" @click="pageFunc"></div>
  </div>
</template>

<script>
  export default {
    props: {
      orderId: {
        type: String,
        default: ''
      },
      goodsId: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        openId: '',
        clerkList: [],
        animalClassfadeIn: true,
        animalClassfadeOut: false,
        selectSequence: '',
        selectRemark: '',
        selectClertlect: '',
        selectClertId: ''

      }
    },

    created() {
      let self = this
      wx.getStorage({
        key: "openId",
        success: function(res) {
          self.openId = res.data
          self.$http.getcommonshopassistants({
            openid: self.openId
          }).then(res => {
            if(res.data.code == 'E00000') {
              self.clerkList = res.data.content
            }
          })
        }
      })
    },
    methods: {
    	
      sequenceChange(e) {
        this.selectSequence = e.target.value;
      },
      
      remarkChange(e) {
        this.selectRemark = e.target.value;
      },
      
      bindPickerChange(e) {
        this.selectClertlect = this.clerkList[parseInt(e.mp.detail.value)].real_name;
        this.selectClertId = this.clerkList[parseInt(e.mp.detail.value)].assistant_id;

      },

      cancelFunc(e) {
        this.animalClassfadeIn = false
        setTimeout(() => {
          this.animalClassfadeOut = true
        }, 0)
        setTimeout(() => {
          this.$emit('cancelClick')
        }, 300)
      },
      
      sureFunc(e) {
      	
       if(this.selectRemark.length == 0) {
          wx.showToast({
            title: '请填写备注说明',
            icon: "none",
            duration: 1000,
            mask: false
          });
          return
        } else if(this.selectClertlect.length == 0) {
          wx.showToast({
            title: '请选择配送营业员',
            icon: "none",
            duration: 1000,
            mask: false
          });
          return
        }

        let self = this
        self.$http.sendorder({
          order_no: self.orderId,
          id: self.goodsId,
          remarks: self.selectRemark,
          sequence: self.selectSequence,
          delivery_id: self.selectClertId,
          openid: self.openId
        }).then(res => {
          if(res.data.code == 'E00000') {
            wx.showToast({
              title: '发货成功',
              icon: "none",
              duration: 1000,
              mask: false
            });
            setTimeout(() => {
              this.$emit('completeClick')
            }, 1000);

          } else {
            wx.showToast({
              title: res.data.msg,
              icon: "none",
              duration: 1000,
              mask: false
            });
          }
        })
      }
    }
  }
</script>

<style lang='less' scoped>
  .page {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    .pageContent {
      width: 6.6rem;
      height: 8.8rem;
      border-radius: .1rem;
      background-color: white;
      position: absolute;
      top: 1rem;
      left: .45rem;
      z-index: 10;
      .content {
        width: 100%;
        height: 7.8rem;
        .title {
          font-family: PingFangSC-Medium;
          font-size: .32rem;
          color: #333333;
          letter-spacing: 0;
          text-align: center;
          width: 100%;
          height: .96rem;
          line-height: .96rem;
        }
        .context {
          padding: .05rem .3rem;
          font-family: PingFangSC-Regular;
          font-size: 15px;
          color: #333333;
        }
        .numbInput {
          width: 5.5rem;
          height: 0.9rem;
          margin-left: .55rem;
          margin-bottom: .16rem;
          font-size: .32rem;
          border-radius: .06rem;
          border: 1px solid #DDD;
          color: #999999;
          text-align: center;
        }
      }
      .botton {
        width: 100%;
        height: 1rem;
        line-height: 1rem;
        display: flex;
        text-align: center;
        font-size: .32rem;
        .leftBtn {
          width: 50%;
          color: #999999;
          border-top: 1px solid #DDD;
          border-right: 1px solid #DDD;
        }
        .rightBtn {
          width: 50%;
          border-top: 1px solid #DDD;
          color: #333333;
        }
      }
    }
    .zzc {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      z-index: 1;
      background-color: rgba(0, 0, 0, .5);
    }
  }
</style>