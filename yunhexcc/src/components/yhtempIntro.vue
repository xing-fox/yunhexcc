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
          <span>¥</span>{{ item.product_price }}
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
  display: inline-block;
  font-size: 0;
  width: 3.46rem;
  background: #fff;
  margin: 0 0 .2rem .2rem;
  border-radius: .1rem;
}
.boxLeft {
  width: 3.46rem;
  height: 3.46rem;
  box-sizing: border-box;
}
.boxLeft img {
  width: 80%;
  height: 80%;
  margin: 10% 10%;
}
.boxRight .boxname {
  width: 100%;
  color: #222;
  font-size: 0.3rem;
  letter-spacing: 0;
  line-height: .42rem;
  height: .84rem;
  text-align: center;
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
  margin: .16rem 0 .26rem 0;
  line-height: 0.48rem;
  text-align: center;
}
</style>
