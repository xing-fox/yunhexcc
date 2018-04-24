<template>
  <div class="page">
    <ul>
      <li class="bor-1px-b">
        <div class="name">
          <span>迪信通宁波路店面</span>  
        </div>
        <div class="shopValue">
          <i class="icon_no"></i>
          <i class="icon_half"></i>
          <i class="icon_all"></i>
          <span>4.0</span>  
        </div>
        <div class="evaluate">
          <span>商品4.0</span>
          <span>配送.0</span>
          <span>服务4.0</span>
          <span>满意度4.0</span>
        </div>
        <div class="addr">
          <i class="icon_addr"></i>
          <span>安徽省合肥市蜀山区习友路与金桂路交叉口8#</span>
        </div>
      </li>
      <li class="bor-1px-b">
        <div class="name">
          <span>迪信通宁波路店面</span>  
        </div>
        <div class="shopValue">
          <i class="icon_no"></i>
          <i class="icon_half"></i>
          <i class="icon_all"></i>
          <span>4.0</span>  
        </div>
        <div class="evaluate">
          <span>商品4.0</span>
          <span>配送.0</span>
          <span>服务4.0</span>
          <span>满意度4.0</span>
        </div>
        <div class="addr">
          <i class="icon_addr"></i>
          <span>安徽省合肥市蜀山区习友路与金桂路交叉口8#</span>
        </div>
      </li>
    </ul> 
  </div>
</template>

<script>
  export default {
    data () {
        return {}
    }
  }
</script>

<style lang="less" scoped>
  .page{
    width: 100%;
    ul{
      margin: .24rem 0 0 0;
      li{
        padding: .2rem;
        background: #fff;
        position: relative;
        .name{
          color: #777;
          font-size: .32rem;
          width: 80%;  
        }
        .shopValue{
          span{
            color: #ff5959;
            font-size: .28rem;
            margin: 0 0 0 .2rem;
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
        }
        .evaluate{
          span{
            display: inline-block;
            color: #999;
            font-size: .2rem;
            padding: .05rem .1rem;
            border: 1px solid #999;
            margin: 0 .15rem 0 0;
          }
        }
        .addr{
          span{
            color: #777;
            font-size: .24rem;
            vertical-align: middle;
          }
          i.icon_addr{
            display: inline-block;
            width: .3rem;
            height: .3rem;
            background-image: url('../../../static/images/addr.png');
            background-size: 100% 100%;
            background-repeat: no-repeat;
            vertical-align: middle;
          }
        }
      }
    }
  }
</style>
