<template>
  <div class="page">
     <web-view src="https://mp.weixin.qq.com/"></web-view>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {},
  onLoad(options) {
    console.log('笔记id'+options.id)
  }
};
</script>

<style scoped lang="less">
web-view {
  width: 100%;
  height: 100%;
}
</style>
