<template>
  <div class="page">
    <scroll-view scroll-y bindscroll="scroll" class="mealContent animated fadeInUp">
      <div class="product bor-1px-b">
        <image class="proImg" src="http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg"></image>
        <div class="proIntro">
          <div class="Name">苹果 Iphone7</div>
          <div class="content">[现货]苹果版本果粉必备红色版果粉必备红色版果粉必备红色版果粉必备红色版</div>
          <div class="price">¥5600 <span>6200</span> </div>
        </div>
      </div>
      <div class="specList">
        <div class="listTitle">颜色：</div>
        <div class="listCategory">
          <div class="categoryList active">红色</div>
          <div class="categoryList">黄色</div>
          <div class="categoryList">绿色</div>
          <div class="categoryList">红绿黄黑白蓝紫</div>
        </div>
      </div>
      <div class="specList">
        <div class="listTitle">容量：</div>
        <div class="listCategory">
          <div class="categoryList active">43G</div>
          <div class="categoryList">4G</div>
          <div class="categoryList">433G</div>
          <div class="categoryList">1G</div>
        </div>
      </div>
      <div class="specList">
        <div class="listTitle">颜色：</div>
        <div class="listCategory">
          <div class="categoryList active">红色</div>
          <div class="categoryList">黄色</div>
          <div class="categoryList">绿色</div>
          <div class="categoryList">红绿黄黑白蓝紫</div>
        </div>
      </div>
      <div class="specList">
        <div class="listTitle">容量：</div>
        <div class="listCategory">
          <div class="categoryList active">43G</div>
          <div class="categoryList">4G</div>
          <div class="categoryList">433G</div>
          <div class="categoryList">1G</div>
        </div>
      </div>
      <div class="choiseCount">
        <span class="countTitle">选择数量：</span>
        <div class="countContent">
          <span class="contIcon iconMinus"></span>
          <span class="contNum">23</span>
          <span class="contIcon iconPlus"></span>
        </div>
      </div>
    </scroll-view>
    <div class="submit animated fadeInUp">
      <span>确定</span>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="less" scoped>
  .page{
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0, .5);
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    .mealContent{
      width: 100%;
      height: 8rem;
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
          width: 1rem;
          line-height: .5rem;
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
</style>
