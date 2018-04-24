<template>
  <div class='sing'>
    <div class='singleList bor-1px-b'>
      <span>已经与反馈</span>
      <div class='arrow_right'></div>
    </div>
    <div class='singleList bor-1px-b'>
      <span>已经与反馈</span>
      <div class='arrow_right'></div>
    </div>
    <div class='singleList bor-1px-b'>
      <span>已经与反馈</span>
      <div class='arrow_right'></div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  }
}
</script>

<style>
  .sing{
    width: 100%;
    background: #fff;
    margin: 0 0 .1rem 0;
  }
  .singleList{
    color: #222;
    font-size: .32rem;
    font-family: PingFangSC-Medium;
    height: 1rem;
    margin: 0 0 0 .28rem;
    line-height: 1rem;
    letter-spacing: 0;
    background: #fff;
    box-sizing: border-box;
    position: relative;
  }
  .singleList:nth-last-child(1):after{
    border:none;
  }
  .arrow_right{
    width: 1rem;
    height: 1rem;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    background-image: url('../../static/images/right.png');
    background-size: 30% 30%;
    background-position: center center;
    background-repeat: no-repeat;
  }
</style>
