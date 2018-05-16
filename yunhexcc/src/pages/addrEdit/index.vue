<template>
  <div class="page">
    <div class="edit">
      <div class="name bor-1px-b">
        <label for="name">收货人</label>
        <input type="text">
      </div>
      <div class="telephone bor-1px-b">
        <label for="telephone">联系电话</label>
        <input type="tel">
      </div>
      <picker mode="region" :value="region" @change="CityChange">
        <div class="area bor-1px-b">
            <label for="name">所在区域</label>
            <span class="areaAddr">{{ region }}</span>
            <span class="areaChoise">请选择</span>
        </div>
      </picker>
      <div class="ditailAddr">
        <textarea placeholder="请填写详细地址，不少于5个字"></textarea>
      </div>
      <div class="submit">
        <span>保存</span>
      </div>  
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      region: ['广东省', '广州市', '海珠区']
    }
  },
  components: {},
  methods: {
    CityChange(e) {
      console.log('选中的城市为：' + e.mp.detail.value);
    }
  }
}
</script>

<style lang="less" scoped>
.page {
  width: 100%;
  height: 100%;
  position: relative;
  background: #f3f5f9;
  .edit {
    color: #333;
    font-size: .32rem;
    width: 100%;
    background: #fff;
    label{
      width: 1.8rem;
      vertical-align: middle;
    }
    input{
      flex: 1;
      height: 1rem;
      -webkit-appearance: none;
      color: #666;
      font-size: .28rem;
      margin: 0 .2rem 0 0;
    }
    .name {
      margin: 0 0 0 0.3rem;
      height: 1rem;
      line-height: 1rem;
      background: #fff;
      display: flex;
    }
    .telephone{
      margin: 0 0 0 0.3rem;
      height: 1rem;
      line-height: 1rem;
      background: #fff;  
      display: flex;
    }
    .area{
      margin: 0 0 0 0.3rem;
      height: 1rem;
      line-height: 1rem;
      background: #fff;
      display: flex;
      .areaAddr{
        color: #666;
        font-size: .28rem;
      }
      .areaChoise{
        flex: 1;
        color: #999;
        font-size: .24rem;
        margin: 0 .3rem 0 0;
        text-align: right;
      }
    }
    .ditailAddr{
      color: #999;
      font-size: .28rem;
      width: 100%;
      padding: .3rem;
      box-sizing: border-box;
      textarea{
        width: 100%;
      }
    }
  }
  .submit {
    color: #fff;
    font-size: 0.32rem;
    width: 100%;
    height: 1rem;
    line-height: 1rem;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: #ffda44;
    text-align: center;
  }
}
</style>
