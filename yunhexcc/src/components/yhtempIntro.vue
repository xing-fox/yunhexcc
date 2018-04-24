<template>
  <div class="boxList" @click="changeDetails">
    <div class="boxLeft">
      <img src="http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg">
    </div>
    <div class="boxRight">
      <div class="boxname">
        由各种物质组成的巨型球状天体，叫做星球
      </div>
      <div class="boxSite">
        安徽省合肥市
      </div>
      <div class="boxPrice">
        ¥3000
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    changeDetails () {
      wx.navigateTo({
        url: '/pages/details/main'
      })
    }
  }
}
</script>

<style>
.boxList {
  width: 100%;
  height: 2.72rem;
  background: #fff;
  margin-bottom: 0.12rem;
  display: flex;
}
.boxLeft {
  width: 2.2rem;
  height: 2.2rem;
  box-sizing: border-box;
  border: 1px solid #ddd;
  margin: 0.26rem 0.16rem 0 0.2rem;
}
.boxLeft img {
  display: inline-block;
  width: 100%;
  height: 100%;
}
.boxRight {
  flex: 1;
}
.boxRight .boxname {
  width: 100%;
  color: #222;
  font-size: 0.32rem;
  letter-spacing: 0;
  line-height: 0.44rem;
  margin: 0.26rem 0 0.24rem 0;
  display: -webkit-box;
  word-break: break-all;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
}
.boxRight .boxSite {
  color: #999;
  font-size: 0.26rem;
  letter-spacing: 0;
  line-height: 0.36rem;
}
.boxRight .boxPrice {
  font-size: 0.34rem;
  color: #ff2e2e;
  line-height: 0.48rem;
  margin: 0.24rem 0 0 0;
}
</style>
