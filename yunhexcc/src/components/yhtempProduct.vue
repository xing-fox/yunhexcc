<template>
  <div class="product">
    <img class="productImg" src="../../static/images/1.png" alt="">
    <div class="proName">重定向也是通过 routes 配置来完成重定向也是通过 routes 配置来完成</div>
    <div class="proContent">重定向也是通过 routes 配置来完成重定向也是通过 routes 配置来完成</div>
    <div class="proNews">
        <img class="newsImg" src="../../static/images/me.png" alt="">
        <span class="newsName">一只大青蛙</span>
        <img class="admireImg" src="../../static/images/admire.png" alt="">
        <span class="admireCount">123</span>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style>
  .product{
    width: 3.48rem;
    background: #fff;
    border-radius: .1rem;
    overflow: hidden;
  }
  .product .productImg{
    display: inline-block;
    width: 100%;
    height: 2.3rem;
  }
  .product .proName{
    color: #222;
    font-size: .28rem;
    font-family: PingFangSC-Medium;
    line-height: .4rem;
    margin: 0 .05rem;
    display: -webkit-box;
    word-break: break-all;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .product .proContent{
    color: #999;
    font-size: .24rem;
    font-family: PingFangSC-Medium;
    line-height: .34rem;
    margin: .12rem .05rem .36rem;
    display: -webkit-box;
    word-break: break-all;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .product .proNews{
    width: 100%;
    padding: 0 0 .44rem 0;
    display: flex;
  }
  .proNews .newsImg{
    width: .4rem;
    height: .4rem;
    vertical-align: middle;
  }
  .proNews .newsName{
    flex: 1;
    color: #222;
    font-size: .2rem;
    line-height: .4rem;
    margin: 0 0 0 .05rem;
    vertical-align: middle;
  }
  .proNews .admireImg{
    display: inline-block;
    width: .3rem;
    height: .3rem;
    margin: .05rem 0 0 0;
    vertical-align: middle;
  }
  .proNews .admireCount{
    color: #999;
    font-size: .24rem;
    width: .6rem;
    text-align: right;
    margin: 0 .15rem 0 .1rem;
    line-height: .4rem;
    vertical-align: middle;
  }
</style>
