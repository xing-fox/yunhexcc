<template>
  <div class="page">
    <div class="box_left">
      <ul>
        <li class="bor-1px-t">中国</li>
        <li class="bor-1px-t">美国</li>
        <li class="bor-1px-t">英国</li>
        <li class="bor-1px-t">中国</li>
        <li class="bor-1px-t">美国</li>
        <li class="bor-1px-t">英国</li>
        <li class="bor-1px-t">中国</li>
        <li class="bor-1px-t">美国</li>
        <li class="bor-1px-t">英国</li>
        <li class="bor-1px-t">中国</li>
        <li class="bor-1px-t">美国</li>
        <li class="bor-1px-t">英国</li>
        <li class="bor-1px-t">中国</li>
        <li class="bor-1px-t">美国</li>
        <li class="bor-1px-t">英国</li>  
      </ul>
    </div>
    <div class="box_right">
      <ul>
        <li>12</li>
        <li>123</li>
        <li>1234</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  mounted () {
    wx.setNavigationBarTitle({ title: '活动'})
  }
}
</script>

<style>
  page{
    background: #f3f5f9;
  }
  .page{
    width: 100%;
    height: 100%;
    display: flex;
    display: -webkit-flex;
    position: relative;
  }
  .page .box_left{
    width: 1.5rem;
    height: 100%;
    overflow: scroll;
    background: #fff;
  }
  .page .box_left li{
    color: #999;
    font-size: .26rem;
    width: 100%;
    height: .8rem;
    line-height: .8rem;
    text-align: center;
  }
  .page .box_right{
    flex: 1;
    margin-left: 1px;
    background: #fff;
  }
</style>
