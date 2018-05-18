<template>
  <div class="page">
    <div class="page_empty">
      <div class="content">
        <i></i>
        <!-- <image src="../../../static/images/nodata.png" /> -->
        <!-- <p>暂无优惠券～</p> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.page {
  width: 100%;
  height: 100%;
  .page_empty {
    width: 100%;
    height: 100%;
    .content {
      width: 3rem;
      height: 3.6rem;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      margin: auto auto;
      text-align: center;
      i {
        display: inline-block;
        width: 3rem;
        height: 3rem;
        background-image: url('../../static/images/nodata.png');
        background-size: 100% 100%;
        background-repeat: no-repeat;
      }
      p {
        color: #ccc;
        font-size: .28rem;
        line-height: .6rem;
      }
    }
  }
}
</style>
