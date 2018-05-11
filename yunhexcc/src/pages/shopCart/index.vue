<template>
  <div class="pages">
    <scroll-view scroll-y bindscroll="scroll" class="scrollList">
      <div class="proList" v-for="(item, index) in testShopName" :key="index">
        <div class="shopName">
          <i :class="{unselect: !item.flag,select: item.flag}" @click="allSelect(index)"></i>
          <span>{{ item.name }}</span>
        </div>
        <div class="shopProduct bor-1px-t" v-for="(items, indexList) in item.list" :key="indexList">
          <i :class="{unselect: !items.flag,select: items.flag}" @click="singleSelect(index, indexList)"></i>
          <div class="productIntro">
            <div class="proImg">
              <img :src="items.img">
            </div>
            <div class="proIntro">
              <div class="name">{{ items.proName }}</div>
              <div class="price">¥{{ items.price }}</div>
              <div class="proNum">
                <i class="icon_minus"></i>
                <span class="count">{{ items.num }}</span>
                <i class="icon_plus"></i>
              </div>
              <div class="delete" @click="delFunc(index, indexList)"></div>
            </div>
          </div>
        </div>
      </div>
    </scroll-view>
    <div class="payMoney">
      <div class="selectAll bor-1px-t">
        <i :class="{unselect: !totalFlag, select: totalFlag}" @click="totalSelect"></i>
        <span>全选</span>
      </div>
      <div class="payAll bor-1px-t">
        需支付：<span>¥{{ totalMoney }}</span>
      </div>
      <div class="payBut">
        <span>结算</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      testShopName: [{
        name: '百联中环店',
        flag: false,
        list: [{
          img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
          proName: 'Iphone7 plusIphone7 plusIphone7 plusIphone7 plus',
          price: 20.05,
          flag: false,
          num: 10
        },{
          img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
          proName: 'Iphone8 plus',
          price: 9688,
          flag: false,
          num: 2
        }]
      },{
        name: '百联中环店',
        flag: false,
        list: [{
          img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
          proName: 'Iphone7 plusIphone7 plusIphone7 plusIphone7 plus',
          price: 20.05,
          flag: false,
          num: 10
        },{
          img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
          proName: 'Iphone8 plus',
          price: 9688,
          flag: false,
          num: 2
        }]
      },{
        name: '百联中环店',
        flag: false,
        list: [{
          img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
          proName: 'Iphone7 plusIphone7 plusIphone7 plusIphone7 plus',
          price: 20.05,
          flag: false,
          num: 10
        },{
          img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
          proName: 'Iphone8 plus',
          price: 9688,
          flag: false,
          num: 2
        }]
      }],
      totalFlag: false,
      totalMoney: 0
    }
  },
  methods: {
    TotalMoney () {
      this.totalMoney = 0
      this.testShopName.map((item) => {
        item.list.map((items) => {
          if (items.flag) {
            this.totalMoney += items.num*parseFloat(items.price)
          }
        })
      })
    },
    allSelect (index) {
      this.testShopName[index].flag = !this.testShopName[index].flag
      this.testShopName[index].list.map((item) => {
        item.flag = this.testShopName[index].flag
      })
      this.totalAction(index)
      this.TotalMoney()
    },
    singleSelect (index, eq) {
      this.testShopName[index].list[eq].flag = !this.testShopName[index].list[eq].flag
      let singFlag = 0
      this.testShopName[index].list.map((item) => {
        if (item.flag != this.testShopName[index].list[eq].flag) {
          singFlag = 1
        }
      }) // 同商店的商品是否状态相同
      if (this.testShopName[index].list[eq].flag && singFlag === 0) {
        this.testShopName[index].flag = true
      } else {
        this.testShopName[index].flag = false
      } // 同商店的商品状态相同且是否为true
      this.totalAction(index)
      this.TotalMoney()
    },
    totalAction (index) {
      if (this.testShopName[index].flag) {
        let totalFlag = 0
        this.testShopName.map((item) => {
            if (!item.flag) {
            totalFlag = 1
            }
        })
        this.totalFlag = totalFlag !== 1
      } else {
        this.totalFlag = false
      }  
    },
    totalSelect () {
      this.totalFlag = !this.totalFlag
      this.testShopName.map((item) => {
        item.flag = this.totalFlag
        item.list.map((items) => {
            items.flag = this.totalFlag
        })
      })
      this.TotalMoney()
    },
    delFunc (index, eq) {
      let self = this
      wx.showModal({
        title: '小猿友情提示',
        content: '确定删除该商品吗？',
        success: function(res) {
          if (res.confirm) {
            self.testShopName[index].list.splice(eq, 1)
            if (!self.testShopName[index].list.length) {
              self.testShopName.splice(index, 1)
            }
            self.TotalMoney()
          } else if (res.cancel) {
            return false
          }
        }
      })
    },
  }
}
</script>

<style lang="less" scoped>
  .pages{
    width: 100%;
    height: 100%;
    background: #f3f5f9;
    box-sizing: border-box;
    position: relative;
    .unselect{
      display: inline-block;
      width: .4rem;
      height: .4rem;
      position: absolute;
      top: 0;
      bottom: 0;
      background-image: url('../../../static/images/unselect.png');
      background-size: 100% 100%;
      background-repeat: no-repeat;
      vertical-align: middle;
    }
    .select{
      display: inline-block;
      width: .4rem;
      height: .4rem;
      position: absolute;
      top: 0;
      bottom: 0;
      background-image: url('../../../static/images/select.png');
      background-size: 100% 100%;
      background-repeat: no-repeat;
      vertical-align: middle;
    }
    .scrollList{
      width: 100%;
      position: absolute;
      top: 0;
      bottom: .96rem;
      box-sizing: border-box;
      overflow: hidden;
      .proList{
        width: 100%;
        margin: 0 0 .2rem 0;
        background: #fff;
        .shopName{
          color: #333;
          font-size: .28rem;
          height: .9rem;
          line-height: .9rem;
          position: relative;
          i{
            margin: auto .2rem;
          }
          span{
            vertical-align: middle;
            margin: 0 0 0 .8rem;
          }
        }
        .shopProduct{
          font-size: 0;
          margin: 0 0 0 .2rem;
          height: 1.92rem;
          line-height: 1.92rem;
          position: relative;
          .unselect,.select{
            margin: auto 0;
          }
          .productIntro{
            margin: 0 0 0 .6rem;
            vertical-align: middle;
            display: flex;
            .proImg{
              width: 1.3rem;
              height: 1.3rem;
              margin: .31rem 0;
              border: 1px solid #ddd;
              box-sizing: border-box;
              img{
                width: 100%;
                height: 100%;
              }
            }
            .proIntro{
              flex: 1;
              height: 1.3rem;
              color: #333;
              margin: .31rem .15rem;
              position: relative;
              .name{
                font-size: .32rem;
                line-height: .4rem;
              }
              .price{
                color: #ff5959;
                font-size: .28rem;
                line-height: .4rem;
                position: absolute;
                left: 0;
                bottom: 0;
              }
              .proNum{
                height: .55rem;
                line-height: .55rem;
                position: absolute;
                bottom: -.05rem;
                right: 1.2rem;
                border-radius: 3px;
                overflow: hidden;
                .icon_minus{
                  display: inline-block;
                  width: .55rem;
                  height: .55rem;
                  background: #f3f3f3;
                  background-image: url('../../../static/images/icon_minus.png');
                  background-size: 50% 50%;
                  background-repeat: no-repeat;
                  background-position: center center;
                  vertical-align: middle;
                }
                .count{
                  display: inline-block;
                  color: #999;
                  font-size: .26rem;
                  min-width: .55rem;
                  margin: 0 1px;
                  padding: 0 3px;
                  background: #f3f3f3;
                  text-align: center;
                  vertical-align: middle;
                }
                .icon_plus{
                  display: inline-block;
                  width: .55rem;
                  height: .55rem;
                  background: #f3f3f3;
                  background-image: url('../../../static/images/icon_add.png');
                  background-size: 50% 50%;
                  background-repeat: no-repeat;
                  background-position: center center;
                  vertical-align: middle;
                }
              }
              .delete{
                width: .5rem;
                height: .5rem;
                position: absolute;
                bottom: -.05rem;
                right: .2rem;
                background-image: url('../../../static/images/del.png');
                background-size: 90% 90%;
                background-repeat: no-repeat;
                background-position: center center;
              }
            }
          }
        }
        &:nth-last-child(1){
          margin: 0 0 0;
        }
      }
    }
    .payMoney{
      font-size: 0;
      width: 100%;
      height: .96rem;
      position: fixed;
      left: 0;
      bottom: 0;
      background: #fff;
      display: flex;
      .selectAll{
        color: #666;
        font-size: .28rem;
        line-height: .96rem;
        position: relative;
        i{
          margin: auto .2rem;
        }
        span{
          margin: 0 0 0 .7rem;
        }
      }
      .payAll{
        color: #666;
        font-size: .28rem;
        height: .96rem;
        line-height: .96rem;
        padding: 0 .2rem 0 .6rem;
        span{
          color: #ff5959;
        }
      }
      .payBut{
        flex: 1;
        color: #fff;
        font-size: .32rem;
        line-height: .96rem;
        text-align: center;
        background: #ffda44;
      }
    }
  }
</style>
