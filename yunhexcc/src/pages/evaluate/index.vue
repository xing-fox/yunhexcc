<template>
  <div class="page">
    <div class="proIntro bor-1px-b">
      <div class="introBox bor-1px-b" v-for="(item, index) in productData.goodsInfo" :key="index">
        <div class="proLeft">
          <img :src="item.picture_url">
        </div>
        <div class="proRight">
          <p class="proName"><span>{{ item.product_name }}</span></p>
          <p class="proSpec"><span v-if="item.color">{{ item.color }}</span><span v-if="item.memory_capacity">{{ item.memory_capacity }}</span><span v-if="item.supplier_name">{{ item.supplier_name }}</span><span v-if="item.contract_name">{{ item.contract_name }}</span></p>
        </div>
      </div>
    </div>
    <div class="leaveMessage">
      <textarea placeholder="说说你使用的心得吧...与大家一起分享!" v-model="commentContent"></textarea>
    </div>
    <div class="photoImg">
      <img :src="item" v-for="(item, index) in imgUrl" :key="index">
      <i v-if="choiseImgFlag" class="imgPhoto" @click="choiseImgFunc"></i>
    </div>
    <div class="evalChoise bor-1px-t">
      <i v-if="evalFlag" class="select" @click="evalFlag = false"></i>
      <i v-else class="unselect" @click="evalFlag = true"></i>
      <span>匿名评价</span>
    </div>
    <div class="evalScore">
      <div class="title">
        <span>店铺评分</span>
      </div>
      <div class="category" v-for="(item, index) in category" :key="index">
        <span>{{ item.title }}</span>
        <i class="choise" v-for="(list, ind) in item.starCount" :key="ind" @click="choiseunScore(index, ind)"></i>
        <i class="unchoise" v-for="(lists, inds) in (5 - item.starCount)" :key="inds" @click="choiseScore(index, inds)"></i>
      </div>
    </div>
    <div class="addManager" @click="commitFunc">
      <span>发布</span>
    </div>
  </div>
</template>

<script>
import Nocoupon from '@/components/noCoupon'
export default {
  data () {
    return {
      category: [
        {
          title: '商品描述',
          starCount: 0
        },{
          title: '配送速度',
          starCount: 0
        },{
          title: '服务态度',
          starCount: 0
        },{
          title: '店铺满意度',
          starCount: 0
        }
      ],
      imgUrl: [],
      evalFlag: true,
      choiseImgFlag: true,
      orderId: '',
      openId: '',
      productData: '',
      productId: '',
      commentContent: ''
    }
  },
  methods: {
    init () {
      this.$http.OrderOrderDetail({
        order_no: this.orderId,
        'openId': this.openId
      }).then(res => {
        if (res.data.code == "E00000") {
          this.productData = res.data.content
        }
      })
    },
    choiseScore (index, eq) {
      this.category[index].starCount = this.category[index].starCount + parseInt(eq) + 1
    },
    choiseunScore (index, eq) {
      this.category[index].starCount = parseInt(eq) + 1
    },
    choiseImgFunc () {
      let self = this
      wx.chooseImage({
        count: 8 - self.imgUrl.length,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success: function (res) {
          console.log(res)
          self.imgUrl = self.imgUrl.concat(res.tempFilePaths)
          if (self.imgUrl.length >= 8) {
            self.choiseImgFlag = false
          }
        }
      })
    },
    commitFunc () {
      if (this.commentContent == '') {
        return wx.showToast({
          title: '分享下您的心得吧?',
          icon: 'none',
          duration: 1000
        })
      }
      let _imgList = this.imgUrl.length ? this.imgUrl.join(';') : ''
      this.$http.evaluateorder({
        data: JSON.stringify({
          'order_no': this.orderId,
          'product_id': this.productData.goodsInfo[0].product_id,
          'comment_content': this.commentContent,
          'shop_goods': this.category[0].starCount,
          'shop_delivery': this.category[1].starCount,
          'shop_service': this.category[2].starCount,
          'shop_satisfaction': this.category[3].starCount,
          'picture_url': _imgList,
          'is_hide': this.evalFlag ? 1 : 0
        }),
        'openid': this.openId
      }).then(res => {
        if (res.data.code == "E00000") {
          wx.showToast({
            title: '评价成功,感谢您的评价!',
            icon: 'none',
            duration: 1000,
            mask: false
          })
          setTimeout(() => {
            return wx.switchTab({
              url: '/pages/mine/main'
            })
          }, 1500)
        }
      })
    }
  },
  onLoad (options) {
    this.category = [
      {
        title: '商品描述',
        starCount: 0
      },{
        title: '配送速度',
        starCount: 0
      },{
        title: '服务态度',
        starCount: 0
      },{
        title: '店铺满意度',
        starCount: 0
      }
    ],
    this.imgUrl = []
    this.evalFlag = true
    this.choiseImgFlag = true
    this.orderId = ''
    this.productData = ''
    this.productId = ''
    this.commentContent = ''
    this.orderId = options.orderId
  },
  onShow () {
    let self = this
    wx.getStorage({
      key: "openId",
      success: function(res) {
        self.openId = res.data;
        self.init()
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

<style lang="less" scoped>
  .page{
    width: 100%;
    padding: 0 0 1.3rem 0;
    .proIntro{
      width: 100%;
      background: #fff;
      .introBox{
        margin: 0 0 0 .2rem;
        display: flex;
        .proLeft{
          width: 1rem;
          height: 1rem;
          margin: .3rem .25rem .3rem 0;
          border: 1px solid #eee;
          img{
            width: 1rem;
            height: 1rem;
          }
        }
        .proRight{
          flex: 1;
          margin: .35rem 0 0 0 ;
          .proName{
            color: #333;
            font-size: .32rem;
            line-height: .44rem;
            margin: 0 0 .1rem 0;
            span{
              margin: 0 .1rem 0 0;
            }
          }
          .proSpec{
            color: #777;
            font-size: .26rem;
            line-height: .36rem;
            margin: .1rem 0 0 0;
            span{
              margin: 0 .1rem 0 0;
            }
          }
        }
        &:nth-last-child(1):after{
          content: none;
        }
      }
    }
    .leaveMessage{
      width: 100%;
      background: #fff;
      textarea{
        border: none;
        -webkit-appearance: none;
        color: #999;
        font-size: .28rem;
        width: 100%;
        height: 2rem;
        padding: .2rem 0 0 .2rem;
        box-sizing: border-box;
      }
    }
    .photoImg{
      width: 100%;
      background: #fff;
      padding: 0 0 .1rem .2rem;
      box-sizing: border-box;
      .imgPhoto{
        display: inline-block;
        width: 1.6rem;
        height: 1.6rem;
        box-sizing: border-box;
        border: 1px dashed #dadada;
        background-image: url('../../../static/images/photo.png');
        background-size: 60% 60%;
        background-position: center center;
        background-repeat: no-repeat;
      }
      img{
        display: inline-block;
        width: 1.6rem;
        height: 1.6rem;
        margin: 0 .2rem 0 0;
        box-sizing: border-box;
        border: 1px solid #dadada;
      }
    }
    .evalChoise{
      color: #ffda44;
      font-size: .3rem;
      width: 100%;
      height: .8rem;
      line-height: .8rem;
      background: #fff;
      i{
        display: inline-block;
        width: .8rem;
        height: .8rem;
        background-size: 50% 50%;
        background-position: center center;
        background-repeat: no-repeat;
        vertical-align: top;
        &.select{
          background-image: url('../../../static/images/select.png');
        }
        &.unselect{
          background-image: url('../../../static/images/unselect.png');
        }
      }
      span{
        vertical-align: middle;
      }
    }
    .evalScore{
      background: #fff;
      margin: .15rem 0 0 0;
      padding: .2rem;
      box-sizing: border-box;
      .title{
        color: #333;
        font-size: .28rem;
      }
      .category{
        width: 100%;
        margin: .2rem 0 0 0;
        display: flex;
        span{
          color: #333;
          font-size: .28rem;
          width: 1.5rem;
          margin: 0 .5rem 0 0;
          vertical-align: middle;
        }
        i{
          width: .4rem;
          height: .4rem;
          margin: 0 .15rem 0 0;
          background-size: 100% 100%;
          background-position: center center;
          background-repeat: no-repeat;
          vertical-align: middle;
          &.choise{
            background-image: url('../../../static/images/star_all.png');
          }
          &.unchoise{
            background-image: url('../../../static/images/star_no.png');
          }
        }
      }
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
