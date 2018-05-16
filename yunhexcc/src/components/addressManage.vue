<template>
  <div class="page">
    <div class="pageIndex">
      <ul>
        <li>
          <div class="content">
            <div class="contName">方形(18226626731)</div>
            <div class="contAddr">
              <span>[默认地址]</span>
              安徽省合肥市蜀山区创新大道安徽省合肥市蜀山区创新大道
            </div>
          </div>
        </li>
        <li>
          <div class="content">
            <div class="contName">方形(18226626731)</div>
            <div class="contAddr">
              <span>[默认地址]</span>
              安徽省合肥市蜀山区创新大道安徽省合肥市蜀山区创新大道
            </div>
          </div>
        </li>
      </ul>
      <div class="addManager">
        <span>添加</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {},
  methods: {}
}
</script>

<style lang="less" scoped>
.page{
  width: 100%;
  height: 100%;
  position: fixed;
  top: 1px;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: #f3f5f9;
  .pageIndex,ul{
    width: 100%;
    li{
      width: 100%;
      padding: .2rem 0;
      margin: 0 0 .2rem 0;
      background: #fff;
      display: flex;
      .choise{
        width: .8rem;
        position: relative;
        i{
          display: inline-block;
          width: .4rem;
          height: .4rem;
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          margin: auto auto;
          background-size: 100% 100%;
          background-repeat: no-repeat;
          &.icon_unselect{
            background-image: url('../../static/images/unselect.png');
          }
          &.icon_select{
            background-image: url('../../static/images/select.png');
          }
        }
      }
      .content{
        flex: 1;
        font-size: .28rem;
        margin: 0 .3rem 0 0;
        .contName{
          color: #333;
          line-height: .4rem;
        }
        .contAddr{
          color: #777;
          line-height: .4rem;
          span{
            color: #ffda44;
          }
        }
      }
    }
  }
  .addManager{
    color: #fff;
    font-size: .32rem;
    width: 100%;
    height: 1.1rem;
    line-height: 1.1rem;
    text-align: center;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    background: #ffda44;
  }
}
</style>
