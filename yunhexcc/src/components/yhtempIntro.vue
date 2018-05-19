<template>
  <div>
    <div v-for="(item, index) in data" :key="index" class="boxList" @click="changeDetails(item.product_id)">
      <div class="boxLeft">
        <img :src="item.picture_url">
      </div>
      <div class="boxRight">
        <div class="boxname">
          {{ item.product_name }}
        </div>
        <div v-if="item.detail_address" class="boxSite">
          {{ item.detail_address }}
        </div>
        <div class="boxPrice">
          ¥{{ item.product_price }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      default: []
    }
  },
  methods: {
    changeDetails (id) {
      wx.navigateTo({
        url: '/pages/details/main?id=' + id
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
  margin: 0.48rem 0 0 0;
}
</style>
