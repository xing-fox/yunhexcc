<template>
  <div class="customerList">
    <img src="../../static/images/header.png" alt="">
    <div class="name">{{ data.name }}</div>
    <div class="fansi">已有几位粉丝</div>
    <div class="talk">+聊聊</div>
    <div class="closed">
      <img src="../../static/images/close.png" alt="">
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: ''
    }
  },
  data () {},
  mounted () {}
}
</script>

<style>
.customerList{
  font-size: 0;
  width: 3rem;
  height: 3.8rem;
  padding: .44rem 0 0 0;
  margin: 0 0 .1rem 0;
  background: #fff;
  border-radius: .1rem;
  box-shadow: 0 2px 3px 0 rgba(223, 223, 223, .4);
  box-sizing: border-box;
  text-align: center;
  position: relative;
}
.customerList img{
  width: 1.2rem;
  height: 1.2rem;
  border-radius: .6rem;
  margin: 0 0 .24rem 0;
}
.customerList .name{
  color: #222;
  font-size: .32rem;
  width: 100%;
  line-height: .44rem;
  text-align: center;
}
.customerList .fansi{
  color: #666;
  font-size: .24rem;
  width: 100%;
  line-height: .34rem;
  text-align: center;
}
.customerList .talk{
  color: #222;
  font-size: .26rem;
  width: 1.76rem;
  height: .6rem;
  line-height: .6rem;
  border: 1px solid #333;
  border-radius: .1rem;
  box-sizing: border-box;
  margin: .26rem auto;
}
.customerList .closed{
  width: .22rem;
  height: .22rem;
  position: absolute;
  top: .16rem;
  right: .16rem;
}
.customerList .closed img{
  display: inline-block;
  width: 100%;
  height: 100%;
}
</style>
