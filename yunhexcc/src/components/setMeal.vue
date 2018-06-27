<template>
  <div class="page">
    <div class="pageContent" :class="{fadeInUp: animalClassfadeIn,animated: animalClassfadeIn,animated: animalClassfadeOut,fadeOutDown: animalClassfadeOut}">
      <scroll-view scroll-y class="mealContent">
        <div class="product bor-1px-b">
          <img class="proImg" :src="proList.goodPictures[0].picture_url">
          <div class="proIntro">
            <div class="Name">{{ proList.product_name }}</div>
            <div class="content"></div>
            <div class="price">¥{{ price }}</div>
          </div>
        </div>
        <div class="specList" v-for="(item, key) of contentObj" :key="key">
          <div class="listTitle">{{ key }}</div>
          <div class="listCategory">
            <div v-for="value in item" :key="value" :class="[classdata[key+'_'+value] == 1 ? 'active' : (classdata[key+'_'+value] == 2 ? 'active1' : '')]" @click="selected(key,value)" class="categoryList">{{ value }}</div>
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
    typeIndex: {
      // 判断是否是购物车
      type: [Number, String],
      default: 0
    },
    dataList: {
      // 商品参数
      type: [Object, Array],
      default: {}
    },
    proList: {
      // 商品信息
      type: Object,
      default: {}
    },
    contId: {
      // 无
      type: [String, Number],
      default: ""
    },
    detailId: {
      // 商品详情id
      type: String,
      default: ""
    }
  },
  data() {
    return {
      openId: "",
      colorIndex: 0,
      memoryIndex: 0,
      supplierIndex: 0,
      contractIndex: 0,
      totalCount: 1,
      contractId: "",
      indexs: [],
      classdata: {},
      contentObj: {},
      dataObj: {},
      price: 0,
      parameterMoney: [], // 套餐价格
      parameterIndex: {}, // 套餐序列
      parameterData: [], // 套餐汇总的数据
      parameterList: [], // 套餐数据转换的数据
      parameterDataList: [], // 展示汇总的数据
      parameterTotalData: [], // 展示的数据
      animalClassfadeIn: true,
      animalClassfadeOut: false
    };
  },
  mounted() {
    let self = this;
    wx.getStorage({
      key: "openId",
      success: function(res) {
        self.openId = res.data;
      }
    });
    /**
     * 整理套餐信息
     */
    this.parameterData = this.dataList.goodsdetailinfo; // 所有套餐信息
    this.init();
  },
  methods: {
    selected: function(key, value) {
      let new_key = key + "_" + value;
      if (this.classdata[new_key] == 2) {
        return;
      }
      //同一大类只能选择一个
      for (let objKey in this.classdata) {
        if (objKey.substring(0, key.length) == key) {
          if (new_key == objKey) {
            this.classdata[objKey] = this.classdata[new_key] == 1 ? 3 : 1;
          } else {
            this.classdata[objKey] = 3;
          }
        }
      }
      //查找已确定的数据索引
      var new_data = []; //交集
      for (let objKey in this.classdata) {
        if (this.classdata[objKey] == 1) {
          let indexs = this.dataObj[objKey];
          new_data = this.intersect(new_data, indexs);
        }
      }
      //确认已查到的
      if (new_data.length == 1) {
        if (this.classdata[new_key] == 1) {
          let obj = this.parameterData[new_data[0]];
          let detailInfo = obj.detail_info;
          let content = detailInfo.content;
          for (let j = 0, size = content.length; j < size; j++) {
            let contentData = content[j];
            let name = contentData.paramTypeName + "_" + contentData.paramName;
            this.classdata[name] = 1;
          }
          for (let objKey in this.classdata) {
            if (this.classdata[objKey] != 1) {
              this.classdata[objKey] = 2;
            }
          }
          this.price = obj.product_price;
          this.contractId = obj.contract_id; // 切换contract_id
          return obj;
        }
        if (this.classdata[new_key] == 3) {
          new_data = [];
          for (let objKey in this.classdata) {
            if (this.classdata[objKey] == 1) {
              let indexs = this.dataObj[objKey];
              new_data = this.intersect(new_data, indexs);
            }
          }
        }
      }
      var list = [];
      //差集
      var diff_data = this.diff(this.indexs, new_data);
      this.contractId = ''
      console.info(diff_data);
      if (this.indexs.length == diff_data.length) {
        for (let objKey in this.classdata) {
          this.classdata[objKey] = 3;
        }
        return;
      }
      for (let i in diff_data) {
        list[i] = this.parameterData[diff_data[i]];
      }
      for (let i = 0, length = list.length; i < length; i++) {
        let obj = list[i];
        let detailInfo = obj.detail_info;
        let content = detailInfo.content;
        for (let j = 0, size = content.length; j < size; j++) {
          let contentData = content[j];
          let name = contentData.paramTypeName + "_" + contentData.paramName;
          if (this.classdata[name] != 1) {
            this.classdata[name] = 2;
          }
        }
      }
      //继续聚合
      list = [];
      for (let i in new_data) {
        list[i] = this.parameterData[new_data[i]];
      }
      for (let i = 0, length = list.length; i < length; i++) {
        let obj = list[i];
        let detailInfo = obj.detail_info;
        let content = detailInfo.content;
        for (let j = 0, size = content.length; j < size; j++) {
          let contentData = content[j];
          let name = contentData.paramTypeName + "_" + contentData.paramName;
          if (this.classdata[name] != 1) {
            this.classdata[name] = 3;
          }
        }
      }
    },
    intersect: function(arr1, arr2) {
      if (
        Object.prototype.toString.call(arr1) === "[object Array]" &&
        Object.prototype.toString.call(arr2) === "[object Array]"
      ) {
        if (arr1.length == 0) {
          return arr2;
        }
        if (arr2.length == 0) {
          return arr1;
        }
        return arr1.filter(function(v) {
          return arr2.indexOf(v) !== -1;
        });
      }
    },
    diff: function(arr1, arr2) {
      if (
        Object.prototype.toString.call(arr1) === "[object Array]" &&
        Object.prototype.toString.call(arr2) === "[object Array]"
      ) {
        if (arr1.length >= arr2.length) {
          return arr1.filter(function(i) {
            return arr2.indexOf(i) < 0;
          });
        }
        if (arr2.length > arr1.length) {
          return arr2.filter(function(i) {
            return arr1.indexOf(i) < 0;
          });
        }
      }
    },
    union: function(arr1, arr2) {
      if (
        Object.prototype.toString.call(arr1) === "[object Array]" &&
        Object.prototype.toString.call(arr2) === "[object Array]"
      ) {
        return arr1.concat(arr2).unique();
      }
    },
    compare: function(x, y) {
      if (x < y) {
        return 1;
      } else if (x > y) {
        return -1;
      } else {
        return 0;
      }
    },
    pageFunc(e) {
      this.animalClassfadeIn = false;
      setTimeout(() => {
        this.animalClassfadeOut = true;
      }, 0);
      setTimeout(() => {
        this.$emit("changeState");
      }, 300);
    },
    minusFunc() {
      if (this.totalCount === 1) {
        return wx.showToast({
          title: "商品数量不能小于1",
          icon: "none",
          duration: 2000,
          mask: true
        });
      } else {
        this.totalCount--;
      }
    },
    plusFunc() {
      this.totalCount++;
    },
    submitFunc() {
      let self = this;
      wx.getStorage({
        key: "phoneRegister",
        success: function(res) {
          if (res.data === "0") {
            wx.navigateTo({
              url: "/pages/login/main"
            });
          } else {
            if (self.typeIndex === 0) {
              if (self.contractId === '') {
                return wx.showToast({
                  title: '请选择套餐',
                  icon: "none",
                  duration: 1000,
                  mask: true
                })
              }
              wx.navigateTo({
                url: "/pages/confirm/main?proNum=" + self.totalCount + "&detailId=" + self.detailId + "&contractId=" + self.contractId
              });
            }
            if (self.typeIndex === 1) {
              self.$http.addCart({
                data: JSON.stringify({
                  product_detail_id: self.detailId,
                  product_number: self.totalCount,
                  product_price: self.proList.price_new,
                  contract_id: self.contractId
                }),
                openid: self.openId
              })
              .then(res => {
                if (res.data.code === "E00000") {
                  self.pageFunc();
                  return wx.showToast({
                    title: res.data.content,
                    icon: "none",
                    duration: 1000,
                    mask: true
                  });
                }
              });
            }
          }
        }
      });
    },
    init() {
      let indexs = [], //属性对象
        contentObj = {}, //套餐数据
        contract = [],
        contractObj = {}, //组合数据
        dataObj = {},
        classdata = {},
        price = [];
      for (let i = 0, length = this.parameterData.length; i < length; i++) {
        indexs[i] = i;
        let obj = this.parameterData[i];
        price[i] = obj.product_price;
        if (obj.contractname) {
          contract.push({
            contractname: obj.contractname,
            contractId: obj.contractId,
            index: i
          });
        }
        let content = obj.detail_info.content;
        for (let j = 0, size = content.length; j < size; j++) {
          let contentData = content[j]; // 单项赋值
          let name = contentData.paramTypeName + "_" + contentData.paramName; // 定义名称
          let params = contentObj[contentData.paramTypeName]; // 定义名称
          if (contentObj && params && params.length > 0) {
            let datas = contentObj[contentData.paramTypeName];
            var flag = true;
            for (let k in datas) {
              if (datas[k] == contentData.paramName) {
                flag = false;
                break;
              }
            }
            if (flag) {
              datas.push(contentData.paramName);
              contentObj[contentData.paramTypeName] = datas;
            }
          } else {
            let datas = [];
            datas.push(contentData.paramName);
            contentObj[contentData.paramTypeName] = datas;
          }
          if (dataObj[name]) {
            let datas = dataObj[name];
            datas.push(i);
            dataObj[name] = datas;
          } else {
            dataObj[name] = [i];
            classdata[name] = 3;
          }
        }
      }
      this.contentObj = contentObj;
      this.dataObj = dataObj;
      this.classdata = classdata;
      this.indexs = indexs;
      price.sort(this.compare); // 价格排序
      let _price = 0;
      if (price.length == 1) {
        _price = price[0];
      }
      if (price.length > 1) {
        _price = price[price.length - 1] + "~" + price[0];
      }
      this.price = _price;
    }
  }
};
</script>

<style lang="less" scoped>
.page {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  .pageContent {
    width: 100%;
    height: 8.4rem;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 10;
    .mealContent {
      width: 100%;
      height: 7.2rem;
      padding: 0 0 0.2rem 0;
      background: #fff;
      position: absolute;
      bottom: 1rem;
      left: 0;
      right: 0;
      .product {
        padding: 0.4rem 0;
        margin: 0 0 0 0.24rem;
        display: flex;
        .proImg {
          width: 1.6rem;
          height: 1.6rem;
          border: 1px solid #ccc;
          box-sizing: border-box;
        }
        .proIntro {
          flex: 1;
          margin: 0 0.1rem 0 0.24rem;
          .Name {
            color: #333;
            font-size: 0.32rem;
          }
          .content {
            color: #777;
            font-size: 0.24rem;
            height: 0.64rem;
            line-height: 0.32rem;
            margin: 0 0 0.04rem 0;
          }
          .price {
            color: #ff5959;
            font-size: 0.32rem;
            span {
              color: #999;
              font-size: 0.2rem;
              text-decoration: line-through;
            }
          }
        }
      }
      .specList {
        font-size: 0;
        margin: 0 0.24rem 0 0.24rem;
        display: flex;
        .listTitle {
          color: #777;
          font-size: 0.26rem;
          width: 1.1rem;
          line-height: 0.5rem;
          text-align: center;
          margin: 0.4rem 0 0 0;
          &.active {
            color: #333;
            background: #ffda44;
          }
        }
        .listCategory {
          flex: 1;
          .categoryList {
            display: inline-block;
            color: #333;
            font-size: 0.26rem;
            padding: 0 0.36rem;
            margin: 0.4rem 0 0 0.4rem;
            background: #eee;
            border-radius: 4px;
            height: 0.5rem;
            line-height: 0.5rem;
            &.active {
              color: #333;
              background: #ffda44;
            }
            &.active1 {
              color: #999;
            }
          }
        }
      }
      .choiseCount {
        margin: 0.4rem 0.24rem 0 0.24rem;
        display: flex;
        .countTitle {
          flex: 1;
          color: #777;
          font-size: 0.26rem;
          height: 0.6rem;
          line-height: 0.6rem;
        }
        .countContent {
          text-align: center;
          border-radius: 3px;
          overflow: hidden;
          .contIcon {
            display: inline-block;
            width: 0.6rem;
            height: 0.6rem;
            background: #f5f5f5;
            vertical-align: middle;
            &.iconMinus {
              background-image: url("../../static/images/icon_minus.png");
              background-size: 40% 40%;
              background-repeat: no-repeat;
              background-position: center center;
            }
            &.iconPlus {
              background-image: url("../../static/images/icon_add.png");
              background-size: 40% 40%;
              background-repeat: no-repeat;
              background-position: center center;
            }
          }
          .contNum {
            display: inline-block;
            min-width: 0.6rem;
            height: 0.6rem;
            line-height: 0.6rem;
            color: #999;
            font-size: 0.26rem;
            margin: 0 1px;
            background: #f5f5f5;
            vertical-align: middle;
          }
        }
      }
    }
    .submit {
      color: #222;
      font-size: 0.32rem;
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
  .zzc {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 1;
    background-color: rgba(0, 0, 0, 0.5);
  }
}
</style>
