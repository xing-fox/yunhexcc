<template>
  <div class="page">
    <div class="singleOrder" v-for="(content,index) in listData" :key="index" >

      <div class="topdiv">
        <span class="orderNumb">
				订单编号：{{content.order_no}}
				</span>
        <span class="customerName">
				顾客：{{content.customer_name}}
				</span>
      </div>
      <div class="sepertLine">
      </div>
      <div class='middlediv' v-for='(goodsData,subIndex) in content.goodsInfo' :key="subIndex" @click='orderClick(content.order_no,content.order_type)'>
        <div class="goodsInfodiv">

          <img class='goodsImg' :src="goodsData.picture_url" />
          <div class='goodNameInfo'>
            <div class='goodsName'>{{goodsData.product_name}}</div>
            <div class='goodsPlans'>{{goodsData.color?goodsData.color:''}}{{goodsData.memory_capacity?goodsData.memory_capacity:''}} {{goodsData.supplier_name?goodsData.supplier_name:''}} {{goodsData.contract_name?goodsData.contract_name:''}}</div>
          </div>
          <div class='goodsPriceInfo'>
            <div class='goodsPrice'>¥ {{goodsData.product_price}}</div>
            <div class='goodsCount'>x {{goodsData.product_number}}</div>
          </div>
        </div>
        <div class="opertionDiv">
          <div v-if="goodsData.order_status == 1" class='opertionBtn'>
          </div>
          <div v-if="goodsData.order_status == 2" class='opertionBtn'>
            <div class='orderBtn' @click='orderDeliverClick(goodsData.order_no,goodsData.id)'>发货通知</div>
            <!--<div class='orderBtn' @click='stockoutClick(goodsData.order_no)'>缺货</div>-->
          </div>
          <div v-if="goodsData.order_status == 3" class='opertionBtn'>
            <div class='orderdeliverBtn' @click='inputOrderCodeClick(goodsData.order_no,goodsData.id)'>提货验证码</div>
          </div>
          <div v-if="goodsData.order_status == 4" class='opertionBtn'>
            <div class='unClickBtn'>待评价</div>
            <!--<div class='orderBtn' @click='modificationRemarkClick(goodsData.order_no)'>修改备注</div>-->
          </div>
          <div v-if="goodsData.order_status == 5" class='opertionBtn'>
            <div class='unClickBtn'>已评价</div>
            <!--<div class='orderBtn' @click='modificationRemarkClick(goodsData.order_no)'>修改备注</div>-->
          </div>
        </div>
        <div class="sepertLine">
        </div>
      </div>

      <div class="bottomdiv">
        <div class="orderStatus">
          <span class="orderStatusSpan" v-if="content.order_status == 1">
				订单状态：等待付款
				</span>
          <span class="orderStatusSpan" v-else-if="content.order_status == 2">
				订单状态：已收款，待发货
				</span>
          <span class="orderStatusSpan" v-else-if="content.order_status == 3">
				订单状态：待收货
				</span>
          <span class="orderStatusSpan" v-else-if="content.order_status == 4">
				订单状态：交易成功
				</span>
          <span class="orderStatusSpan" v-else-if="content.order_status == 5">
				订单状态：评价完成
				</span>

          <span class="deliverSpan" v-if="content.delivery_way == 0">
					配送方式：到店自提
					</span>
          <span class="deliverSpan" v-else-if= "content.delivery_way == 1">
					配送方式：送货上门
					</span>
        </div>
        <div class="sepertLine">
        </div>
        <div class="orderOpertion">
          <div class="left-opertion" @click="callDelivery(content.mobile_code)">
            <image class="orderOpertion-phoneImg" />
            <div class="orderOpertion-contacter">
              {{content.mobile_code}}
            </div>
          </div>

          <div class="right-opertion">
          </div>
        </div>
      </div>
      <div class="spaceLine"></div>
    </div>
    <orderCode v-if="setCodeState == true && setModificationStata == false && setStockOutState ==false && setDeliverState == false" :orderId='selectOrder' :goodsId='selectId' @cancelClick='cancelCodeClick' @completeClick='completeCodeClick'></orderCode>
    <orderModifyRemark v-if="setModificationStata == true && setStockOutState == false && setCodeState == false  && setDeliverState == false" :orderId='selectOrder' :goodsId='selectId' @cancelClick='cancelCodeClick' @completeClick='completeCodeClick'></orderModifyRemark>
    <orderDeliver v-if="setDeliverState == true && setModificationStata == false && setStockOutState == false && setCodeState == false" :orderId='selectOrder' :goodsId='selectId' @cancelClick='cancelCodeClick' @completeClick='completeCodeClick'></orderDeliver>
    <orderStockOut v-if="setStockOutState == true && setModificationStata == false && setDeliverState == false && setCodeState == false" :orderId='selectOrder' :goodsId='selectId' @cancelClick='cancelCodeClick' @completeClick='completeCodeClick'></orderStockOut>
  </div>

</template>

<script>
  import orderCode from '@/components/orderCode'
  import orderModifyRemark from '@/components/orderModifyRemark'
  import orderDeliver from '@/components/orderDeliver'
  import orderStockOut from '@/components/orderStockOut'
  export default {
    data() {
      return {
        openId: '',
        listData: [],
        selectId: '',
        selectOrder: '',
        setCodeState: false,
        setStockOutState: false,
        setDeliverState: false,
        setModificationStata: false,
        pag_no: 1,
        loadEndMore: false
      }
    },

    onLoad() {},

    onShow() {
      let self = this;
      self.pag_no = 1;
      wx.getStorage({
        key: "openId",
        success: function(res) {
          self.openId = res.data
          self.requestOrderList()
        }
      })
    },
    onReachBottom() {
      if(!this.loadEndMore) {
        this.loadEndMore = !this.loadEndMore;
        this.pag_no++;
        this.requestOrderList();
      }
    },
    components: {
      orderCode,
      orderModifyRemark,
      orderDeliver,
      orderStockOut
    },
    methods: {

      requestOrderList(e) {
        let self = this;
        console.log(self.pag_no);
        self.$http.manageorders({
          openid: self.openId,
          pag_num: 10,
          pag_no: self.pag_no
        }).then(res => {
          this.loadEndMore = false;
          if(res.data.code == 'E00000') {
            // console.log(JSON.stringify(res.data)

            if(self.pag_no == 1) {
              self.listData = res.data.content;
            } else {
              self.listData = [...self.listData, ...res.data.content];
            }
            if(self.listData.length < 10) {
              self.loadEndMore = true;
            }
          } else {
            self.loadEndMore = true;
          }
        })
      },
      /* 订单查看 */
      orderClick(e, i) {

      },
      /* 发货 */
      orderDeliverClick(e, i) {
        this.setDeliverState = true,
          this.selectOrder = e,
          this.selectId = i
      },
      /* 缺货 */
      stockoutClick(e) {
        this.setStockOutState = true,
          this.selectOrder = e
      },
      /* 提货码 */
      inputOrderCodeClick(e, i) {
        this.setCodeState = true,
          this.selectOrder = e
        this.selectId = i
      },
      /* 修改备注 */
      modificationRemarkClick(e) {
        this.setModificationStata = true,
          this.selectOrder = e
      },
      cancelCodeClick() {
        this.setCodeState = false,
          this.setModificationStata = false,
          this.setDeliverState = false,
          this.setStockOutState = false
      },
      completeCodeClick() {
        let self = this;
        this.setCodeState = false,
          this.setModificationStata = false,
          this.setDeliverState = false,
          this.setStockOutState = false,

          self.$http.manageorders({
            openid: self.openId
          }).then(res => {
            if(res.data.code == 'E00000') {
              // console.log(JSON.stringify(res.data))
              self.listData = res.data.content
            }
          })
      },

      /*拨打电话*/
      callDelivery(numb) {
        wx.makePhoneCall({
          phoneNumber: numb,
          success: function() {},
          fail: function() {}
        });
      }

    },
    created() {}
  }
</script>

<style scoped lang="less">
  .singleOrder {
    margin-top: .12rem;
    .topdiv {
      height: .6rem;
      font-family: PingFangSC-Regular;
      font-size: .26rem;
      color: #999999;
      line-height: .6rem;
      display: flex;
      overflow: hidden;
      text-overflow: ellipsis;
      .orderNumb {
        padding-left: .16rem;
        text-align: left;
        width: 58%;
      }
      .customerName {
        padding-right: .16rem;
        text-align: right;
        width: 42%;
      }
    }
    .sepertLine {
      width: 100%;
      height: .02rem;
      background-color: #F4F4F4;
    }
    .middlediv {
      height: 2.6rem;
      padding-top: .4rem;
      .goodsInfodiv {
        width: 100%;
        height: 1.6rem;
        display: flex;
        .goodsImg {
          display: inline-block;
          width: 1.18rem;
          height: 1.18rem;
          background-color: lightgray;
          margin-left: .2rem;
        }
        .goodNameInfo {
          display: inline-block;
          text-align: left;
          margin-left: .2rem;
          width: 55%;
          .goodsName {
            font-size: .32rem;
            height: .74rem;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .goodsPlans {
            font-size: .24rem;
            color: #999999;
          }
        }
        .goodsPriceInfo {
          display: inline-block;
          text-align: right;
          width: 21%;
          .goodsPrice {
            font-size: .32rem;
            height: .74rem;
          }
          .goodsCount {
            font-size: .24rem;
            color: #999999;
          }
        }
      }
      .opertionDiv {
        height: .84rem;
        width: 100%;
        display: inline-flex;
        justify-content: flex-end;
        .opertionBtn {
          justify-content: flex-end;
          display: inline-flex;
          font-size: .28rem;
          text-align: center;
          .orderBtn {
            margin: 0 .16rem .16rem .16rem;
            height: .64rem;
            line-height: .64rem;
            width: 1.48rem;
            color: #333;
            box-sizing: border-box;
            border: .02rem solid #333;
            border-radius: .06rem;
          }
          .unClickBtn {
            margin: 0 .16rem .16rem .16rem;
            height: .64rem;
            line-height: .64rem;
            width: 1.48rem;
            color: crimson;
          }
          .orderdeliverBtn {
            margin: 0 .16rem .16rem .16rem;
            height: .64rem;
            line-height: .64rem;
            width: 2.5rem;
            color: #333;
            box-sizing: border-box;
            border: .02rem solid #333;
            border-radius: .06rem;
          }
        }
      }
    }
    .bottomdiv {
      .orderStatus {
        height: .8rem;
        font-family: PingFangSC-Regular;
        font-size: .24rem;
        color: #999999;
        line-height: .8rem;
        display: flex;
        overflow: hidden;
        text-overflow: ellipsis;
        .orderStatusSpan {
          padding-left: .16rem;
          text-align: left;
          width: 50%;
        }
        .deliverSpan {
          padding-right: .16rem;
          text-align: right;
          width: 50%;
        }
      }
      .sepertLine {
        width: 100%;
        height: .02rem;
        background-color: #F4F4F4;
      }
      .orderOpertion {
        height: 1rem;
        background: white;
        color: #999999;
        .left-opertion {
          display: flex;
          padding: .12rem .32rem;
          .orderOpertion-phoneImg {
            width: .32rem;
            height: .32rem;
            margin-top: .2rem;
            background-size: 100% 100%;
            background-repeat: no-repeat;
            background-image: url(../../../static/images/icon_callup.png);
          }
          .orderOpertion-contacter {
            font-size: .26rem;
            color: #222222;
            font-size: .28rem;
            margin-left: .16rem;
            margin-top: .16rem;
          }
        }
      }
    }
    .spaceLine {
      width: 100%;
      height: .12rem;
      background-color: #F4F4F4;
    }
  }
</style>