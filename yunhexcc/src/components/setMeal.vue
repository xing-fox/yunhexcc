<template>
  <div class="page">
    <div class="pageContent" :class="{fadeInUp: animalClassfadeIn,animated: animalClassfadeIn,animated: animalClassfadeOut,fadeOutDown: animalClassfadeOut}">
      <scroll-view scroll-y class="mealContent">
        <div class="product bor-1px-b">
          <img class="proImg" :src="proList.goodPictures[0].picture_url">
          <div class="proIntro">
            <div class="Name">{{ proList.product_name }}</div>
            <div class="content"></div>
            <div class="price">¥{{ proList.price_new }} <span>{{ proList.price_old }}</span> </div>
          </div>
        </div>
        <div class="specList">
          <div class="listTitle">颜色：</div>
          <div class="listCategory">
            <div v-for="(item, index) in dataList.colorinfo" :key="index" class="categoryList" :class="{active: colorIndex === index}" @click="specFunc(1, index, item.color_id)">{{ item.color_name }}</div>
          </div>
        </div>
        <div class="specList">
          <div class="listTitle">容量：</div>
          <div class="listCategory">
            <div v-for="(item, index) in dataList.memoryinfo" :key="index" class="categoryList" :class="{active: memoryIndex === index}" @click="specFunc(2, index, item.memory_id)">{{ item.memory_name }}</div>
          </div>
        </div>
        <div class="specList">
          <div class="listTitle">供应商：</div>
          <div class="listCategory">
            <div v-for="(item, index) in dataList.supplierinfo" :key="index" class="categoryList" :class="{active: supplierIndex === index}" @click="specFunc(3, index, item.supplier_id)">{{ item.supplier_name }}</div>
          </div>
        </div>
        <div class="specList">
          <div class="listTitle">套餐：</div>
          <div class="listCategory">
            <div v-for="(item, index) in dataList.contractinfo" :key="index" class="categoryList" :class="{active: contractIndex === index}" @click="specFunc(4, index, item.contract_id)">{{ item.contract_name }}</div>
          </div>
        </div>
        <div class="choiseCount">
          <span class="countTitle">选择数量：</span>
          <div class="countContent">
            <span class="contIcon iconMinus" @click="minusFunc"></span>
            <span class="contNum">{{ totalCount }}</span>
            <span class="contIcon iconPlus" @click="plusFunc"></span>
          </div>
        </div>
      </scroll-view>
      <div class="submit" @click="submitFunc">
        <span>确定</span>
      </div>
    </div>
    <div class="zzc" @click="pageFunc"></div>
  </div>
</template>

<script>
export default {
  props: {
    dataList: {
      type: Object,
      default: {}
    },
    proList: {
      type: Object,
      default: {}
    },
    contId: {
      type: [String, Number],
      default: ''
    },
    detailId: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      colorIndex: 0,
      memoryIndex: 0,
      supplierIndex: 0,
      contractIndex: 0,
      totalCount: 1,
      contractId: '',
      animalClassfadeIn: true,
      animalClassfadeOut: false
    }
  },
  onLoad () {
    this.contractId = this.dataList.contractinfo[0].contract_id
  },
  methods: {
    specFunc (cate, index, id) {
      if (cate === 1) {
        this.colorIndex = index
      }
      if (cate === 2) {
        this.memoryIndex = index
      }
      if (cate === 3) {
        this.supplierIndex = index
      }
      if (cate === 4) {
        this.contractIndex = index
      }
      this.$emit('changeSpec', {
        id: id,
        cate: cate
      })
    },
    pageFunc (e) {
      this.animalClassfadeIn = false
      setTimeout(() => {
        this.animalClassfadeOut = true
      }, 0)
      setTimeout(() => {
        this.$emit('changeState')
      }, 300)
    },
    minusFunc () {
      if (this.totalCount === 1) {
        return wx.showToast({
          title: '商品数量不能小于1',
          icon: 'none',
          duration: 2000,
          mask: true
        })
      } else {
        this.totalCount--
      }
    },
    plusFunc () {
      this.totalCount++
    },
    submitFunc () {
      wx.navigateTo({
    		url:'/pages/confirm/main?proNum='+ this.totalCount + '&detailId=' + this.detailId + '&contractId=' + this.contractId
    	})
    }
  }
}
</script>

<style lang="less" scoped>
  .page{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    .pageContent{
      width: 100%;
      height: 8.4rem;
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 10;
      .mealContent{
        width: 100%;
        height: 7.2rem;
        padding: 0 0 .2rem 0;
        background: #fff;
        position: absolute;
        bottom: 1rem;
        left: 0;
        right: 0;
        .product{
          padding: .4rem 0;
          margin: 0 0 0 .24rem;
          display: flex;
          .proImg{
            width: 1.6rem;
            height: 1.6rem;
            border: 1px solid #ccc;
            box-sizing: border-box;
          }
          .proIntro{
            flex: 1;
            margin: 0 .1rem 0 .24rem;
            .Name{
              color: #333;
              font-size: .32rem;
            }
            .content{
              color: #777;
              font-size: .24rem;
              height: .64rem;
              line-height: .32rem;
              margin: 0 0 .04rem 0;
            }
            .price{
              color: #ff5959;
              font-size: .32rem;
              span{
                color: #999;
                font-size: .2rem;
                text-decoration:line-through;
              }
            }
          }
        }
        .specList{
          font-size: 0;
          margin: 0 .24rem 0 .24rem;
          display: flex;
          .listTitle{
            color: #777;
            font-size: .26rem;
            width: 1.1rem;
            line-height: .5rem;
            text-align: center;
            margin: .4rem 0 0 0;
          }
          .listCategory{
            flex: 1;
            .categoryList{
              display: inline-block;
              color: #333;
              font-size: .26rem;
              padding: 0 .36rem;
              margin: .4rem 0 0 .4rem;
              border: 1px solid #ccc;
              border-radius: 4px;
              height: .5rem;
              line-height: .5rem;
              &.active{
                color: #ffda44;
                border: 1px solid #ffda44;
              }
            }
          }
        }
        .choiseCount{
          margin: .4rem .24rem 0 .24rem;
          display: flex;
          .countTitle{
            flex: 1;
            color: #777;
            font-size: .26rem;
            height: .6rem;
            line-height: .6rem;
          }
          .countContent{
            text-align: center;
            border-radius: 3px;
            overflow: hidden;
            .contIcon{
              display: inline-block;
              width: .6rem;
              height: .6rem;
              background: #f5f5f5;
              vertical-align: middle;
              &.iconMinus{
                background-image: url('../../static/images/icon_minus.png');
                background-size: 40% 40%;
                background-repeat: no-repeat;
                background-position: center center;
              }
              &.iconPlus{
                background-image: url('../../static/images/icon_add.png');
                background-size: 40% 40%;
                background-repeat: no-repeat;
                background-position: center center;
              }
            }
            .contNum{
              display: inline-block;
              min-width: .6rem;
              height: .6rem;
              line-height: .6rem;
              color: #999;
              font-size: .26rem;
              margin: 0 1px;
              background: #f5f5f5;
              vertical-align: middle;
            }
          }
        }
      }
      .submit{
        color: #fff;
        font-size: .32rem;
        width: 100%;
        height: 1rem;
        line-height: 1rem;
        text-align: center;
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        background: #ffda44;
      }
    }
    .zzc{
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      z-index: 1;
      background-color: rgba(0,0,0, .5);
    }
  }
</style>
