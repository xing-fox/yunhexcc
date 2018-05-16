<template>
  <div class="page">
    <div class="addr_no" @click="addrFunc" v-if="!addrFlag">
      <span>添加收货地址</span>
      <i class="icon_right"></i>
    </div>
    <div class="addr_yes" v-else>
      <div class="name">
        <span>{{ addrInfor.userName }}（{{ addrInfor.telNumber }}）</span>
      </div>
      <div class="addr">
        <span>{{ addrInfor.provinceName }} {{ addrInfor.cityName }} {{ addrInfor.countyName }} {{ addrInfor.detailInfo }}</span>
      </div>
      <i class="icon_right"></i>
    </div>
    <picker class="weui-btn" @change="PickerChange" value="0" :range="payType">
      <div class="payType">
        <span class="title">付款方式</span>
        <span class="type">{{ payTypeValue }}</span>
        <i class="icon_right"></i>
      </div>
    </picker>
    <div class="customerNews">
      <div class="title bor-1px-b">
        <span>配送门店</span>
        <i class="icon_right"></i>
      </div>
      <div class="content">
        <span class="name">{{ dataList.shop_name }}</span>
        <i class="icon_no"></i>
        <i class="icon_half"></i>
        <i class="icon_all"></i>
        <span class="score">{{ dataList.shop_grade }}</span>
        <div class="addr">
          <i class="icon_position"></i>
          <span>{{ dataList.shop_address }}</span>
        </div>
      </div>
    </div>
    <div class="dispatch">
      <picker class="weui-btn" @change="PickerChanges" value="0" :range="dispatchType">    
        <div class="payType bor-1px-b">
            <span class="title">配送方式</span>
            <span class="type">{{ dispatchValue }}</span>
            <i class="icon_right"></i>
        </div>
      </picker>
      <div class="proIntro bor-1px-b">
        <div class="proImg">
          <img :src="dataList.picture_url" alt="">
        </div>
        <div class="proNews">
          <div class="name">
            <span>{{ dataList.product_name }}</span>
            <span>¥{{ dataList.product_price }}</span>
          </div>
          <div class="spec">
            <span>{{ dataList.color }} {{ dataList.memory_capacity }} {{ dataList.supplier_desc }} {{ dataList.contract_name }}</span>
            <span>x1</span>
          </div>
        </div>
      </div>
      <div class="proPrice bor-1px-b">
        <div class="tab">
          <span>商品总价:</span>
          <span>¥{{ dataList.price_sum }}</span>
        </div>
        <div class="tab">
          <span>商品运费:</span>
          <span>¥{{ dataList.pay_way}}</span>
        </div>
      </div>
      <div class="payType">
        <span class="title">商品抵用券:</span>
        <span class="type typeColor"> <span v-if="couponState">未使用</span><span v-else>- ¥10</span></span>
        <i class="icon_right"></i>
      </div>
      <div class="totalMoney bor-1px-t bor-1px-b">
        <span>小计:</span>
        <span>¥{{ dataList.price_sum}}</span>
      </div>
    </div>
    <div class="payMent">
      <div class="totalMoney bor-1px-t">需支付:<span>¥{{ dataList.price_sum}}</span></div>
      <div class="submit" @click="submitFunc"><span>提交订单</span></div>
    </div>
  </div>
</template>

<script type="text/javascript">
export default {
  data () {
    return {
      openId: '',
      order_no: '',
      couponState: true,
      addrFlag: false,
      detailId: '',
      proNum: '',
      contractId: '',
      addrInfor: {},
      dataList: Object,
      payTypeValue: '货到付款',
      payTypeFlag: 0,
      payType: ['在线付款', '货到付款'],
      dispatchValue: '到店自提',
      dispatchFlag: 0,
      dispatchType: ['到店自提', '送货上门']
    }
  },
  methods: {
    addrFunc () {
      let self = this
      wx.chooseAddress({
        success: function (res) {
            self.addrFlag = true
            self.addrInfor = res
        }
      })
    },
    PickerChange(e) {
      this.payTypeValue = this.payType[e.mp.detail.value]
      this.payTypeFlag = e.mp.detail.value
    },
    PickerChanges(e) {
      this.dispatchValue = this.dispatchType[e.mp.detail.value]
      this.dispatchFlag = e.mp.detail.value 
    },
    submitFunc () {
      this.$http.buildOrder({
        data: JSON.stringify({
          'product_detail_id': this.detailId,
          'product_number': this.proNum,
          'contract_id': this.contractId,
          'pay_way': this.payTypeFlag,
          'address_id': '',
          'coupon_id': '',
          'delivery_way': this.dispatchFlag,
          'shop_id': this.dataList.shop_id
        }),
        'openid': this.openId
      }).then(res => {
        this.order_no = res.data.content.order_no
      }).then(() => {
        this.$http.paymyOrder({
          data: JSON.stringify({
            'order_no': this.order_no,
            'pay_way': 1,
            'type': 2,
            'coupon_flag': 0
          }),
          'openid': this.openId
        }).then(res => {
          let data = res.data.content
          console.log(res)
          wx.requestPayment({
            'timeStamp': data.timestamp,
            'nonceStr': data.noncestr,
            'package': data.wxpay_package,
            'signType': 'MD5',
            'paySign': data.sign,
            'success':function(res){
              console.log(res)
              wx.showToast({
                title: '支付成功',
                icon: 'none',
                duration: 2000,
                mask: true
              })
            },
            'fail':function(res){
              wx.showToast({
                title: '支付失败',
                icon: 'none',
                duration: 2000,
                mask: true
              })
            }
          })
        })
      })
    }
  },
  onLoad (options) {
    let self = this
    self.detailId = options.detailId
    self.proNum = options.proNum
    self.contractId = options.contractId
    wx.getStorage({
      key: 'openId',
      success: function(res) {
        self.openId = res.data
        self.$http.purchaseNow({
          'product_detail_id': self.detailId,
          'product_number': self.proNum,
          'contract_id': self.contractId,
          'openid': self.openId
        }).then(res => {
          self.dataList = res.data.content
        })
      } 
    })
  }
}
</script>

<style lang="less" scoped>
  .page{
    background: #f3f5f9;
    .addr_no{
      color: #fff;
      font-size: .28rem;
      height: 1rem;
      line-height: 1rem;
      padding: 0 0 0 .3rem;
      background: #34495e;
      display: flex;
      display: -webkit-flex;
      span{
        flex: 1;
      }
      .icon_right{
        display: inline-block;
        width: 1rem;
        height: 1rem;
        background-image: url('../../../static/images/right_1.png');
        background-size: 30% 30%;
        background-repeat: no-repeat;
        background-position: center center;
      }
    }
    .addr_yes{
      color: #fff;
      font-size: .28rem;
      padding: .2rem .3rem;
      background: #34495e;
      position: relative;
      .name{
        line-height: .4rem;
        margin: 0 0 .1rem 0;
      }
      .addr{
        width: 80%;
        line-height: .34rem;
      }
      .icon_right{
        width: 1rem;
        height: 1rem;
        display: inline-block;
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        margin: auto 0;
        background-image: url('../../../static/images/right_1.png');
        background-size: 30% 30%;
        background-repeat: no-repeat;
        background-position: center center;
      }
    }
    .payType{
      font-size: .28rem;
      height: 1rem;
      line-height: 1rem;
      margin: .24rem 0 0 0;
      padding: 0 0 0 .3rem;
      background: #fff;
      display: flex;
      .title{
        flex: 1;
        color: #333;
      }
      .type{
        flex: 2rem;
        color: #777;
        text-align: right;
      }
      .icon_right{
        width: 1rem;
        height: 1rem;
        display: inline-block;
        background-image: url('../../../static/images/right.png');
        background-size: 30% 30%;
        background-repeat: no-repeat;
        background-position: center center;
      }
    }
    .customerNews{
      color: #333;
      font-size: .28rem;
      margin: .24rem 0 0 0;
      background: #fff;
      .title{
        line-height: 1rem;
        display: flex;
        span{
          flex: 1;
          margin: 0 0 0 .3rem;
        }
        .icon_right{
          display: inline-block;
          width: 1rem;
          height: 1rem;
          background-image: url('../../../static/images/right.png');
          background-size: 30% 30%;
          background-repeat: no-repeat;
          background-position: center center;
        }  
      }
      .content{
        font-size: .28rem;
        padding: .2rem .3rem;
        .name{
          color: #333;
          margin: 0 .2rem 0 0;
          vertical-align: middle;
        }
        .icon_no{
          display: inline-block;
          width: .3rem;
          height: .3rem;
          margin: 0 .05rem 0 0;
          background-image: url('../../../static/images/star_no.png');
          background-size: 100% 100%;
          background-repeat: no-repeat;
          vertical-align: middle;
        }
        .icon_half{
          display: inline-block;
          width: .3rem;
          height: .3rem;
          margin: 0 .05rem 0 0;
          background-image: url('../../../static/images/star_half.png');
          background-size: 100% 100%;
          background-repeat: no-repeat;
          vertical-align: middle;
        }
        .icon_all{
          display: inline-block;
          width: .3rem;
          height: .3rem;
          margin: 0 .05rem 0 0;
          background-image: url('../../../static/images/star_all.png');
          background-size: 100% 100%;
          background-repeat: no-repeat;
          vertical-align: middle;
        }
        img{
          width: .28rem;
          height: .28rem;
          vertical-align: middle;
        }
        .score{
          color: #ff5959;
          font-size: .26rem;
          line-height: .3rem;
          margin: 0 0 0 .1rem;
          vertical-align: middle;
        }
        .addr{
          color: #777;
          font-size: .24rem;
          line-height: .4rem;
          i.icon_position{
            display: inline-block;
            width: .3rem;
            height: .3rem;
            background-image: url('../../../static/images/addr.png');
            background-size: 100% 100%;
            background-repeat: no-repeat;
            vertical-align: middle;
          }
          span{
            vertical-align: middle;
            margin: 0 0 0 .1rem;
          }
        }
      }
    }
    .dispatch{
      width: 100%;
      background: #fff;
      margin: .24rem 0 0 0;
      padding: 0 0 1.24rem 0;
      .payType{
        font-size: .28rem;
        height: 1rem;
        line-height: 1rem;
        margin: 0 0 0 .3rem;
        padding: 0;
        display: flex;
        .title{
            flex: 1;
            color: #333;
        }
        .type{
            flex: 2rem;
            color: #777;
            text-align: right;
        }
        .typeColor{
            color: #ff5959 !important;
            font-size: .3rem;
        }
        .icon_right{
            width: 1rem;
            height: 1rem;
            display: inline-block;
            background-image: url('../../../static/images/right.png');
            background-size: 30% 30%;
            background-repeat: no-repeat;
            background-position: center center;
        }
      }
      .proIntro{
        margin: 0 0 0 .3rem;
        padding: .3rem .35rem .3rem 0;
        display: flex;
        .proImg{
          width: 1.3rem;
          height: 1.3rem;
          background: #ccc;
          img{
            width: 100%;
            height: 100%;
          }
        }
        .proNews{
          flex: 1;
          margin: 0 0 0 .15rem;
          .name{
            width: 100%;
            color: #333;
            font-size: .32rem;
            display: flex;
            span:nth-child(1){
              flex: 1;
            }
          }
          .spec{
            width: 100%;
            color: #777;
            font-size: .26rem;
            margin: .2rem 0 0 0;
            display: flex;
            span:nth-child(1){
              flex: 1;
            }
          }
        }
      }
      .proPrice{
        margin: 0 0 0 .3rem;
        padding: .3rem .35rem .3rem 0;
        .tab{
          color: #777;
          font-size: .28rem;
          width: 100%;
          display:flex;
          span:nth-child(1){
            flex: 1;
          }
        }
      }
      .totalMoney{
        height: 1rem;
        line-height: 1rem;
        padding: 0 .35rem 0 .3rem;
        display: flex;
        span:nth-child(1){
          flex: 1;
          color: #333;
          font-size: .28rem;
        }
        span:nth-child(2){
          color: #ff5959;
          font-size: .3rem;
        }
      }
    }
    .payMent{
      width: 100%;
      height: 1rem;
      line-height: 1rem;
      background: #fff;
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      display: flex;
      .totalMoney{
        flex: 3;
        color: #777;
        font-size: .28rem;
        text-align: center;
        box-sizing: border-box;
        span{
          color: #ff5959;
          font-size: .32rem;
          margin: 0 0 0 .2rem;
        }
      }
      .submit{
        flex: 2;
        color: #fff;
        font-size: .32rem;
        background: #ff9008;
        text-align: center;
      }
    }
  }
</style>
