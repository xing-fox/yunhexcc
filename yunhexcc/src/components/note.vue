<template>
  <ul class="note">
    <li>
      <div class="userInfo">
        <img class="infoImg" src="http://test.xclerk.com/mrsyg/YunHaiTongProject/public_tab/image/xcc/ico_coup.png">
        <div class="userClerk"></div>
        <div class="infoNameMark">
          <div class="name">我的用户雯雯</div>
          <div class="mark">
            <span>认证营业员</span>
          </div>
        </div>
      </div>
      <div class="more"></div>
      <div class="noteInfo">
        <span class="info_title">iPad Pro基础库 1.1.0 开始支持</span>
        <span class="info_content">基础库 1.1.0 开始支持基础库 1.1.0 开始支持基础库 1.1.0 开始支持</span>
      </div>
      <div class="noteImgs">
        <img src="http://test.xclerk.com/mrsyg/YunHaiTongProject/public_tab/image/xcc/ico_coup.png" alt="">
        <img src="http://test.xclerk.com/mrsyg/YunHaiTongProject/public_tab/image/xcc/ico_coup.png" alt="">
        <img src="http://test.xclerk.com/mrsyg/YunHaiTongProject/public_tab/image/xcc/ico_coup.png" alt="">
      </div>
      <div class="userAddr">
        <i></i><span>天鹅湖万达2号楼</span>
      </div>
      <div class="distance">
        <span>09:34</span> · <span>3km</span> · <span>40浏览</span>
      </div>
      <div class="userOperater bor-1px-t">
        <div class="admire">
          <i></i><span>12</span>
        </div>
        <div class="edit">
          <i></i><span>23</span>
        </div>
        <div class="talk">
          <i></i>
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    noteList: {
      type: [Object, Array],
      default: ''
    }
  },
  data () {
    return {
    }
  }
}
</script>

<style lang="less" scoped>
.note {
  width: 100%;
  padding: 0.9rem 0 0 0;
  li {
    width: 100%;
    background: #fff;
    margin: 0.12rem 0 0 0;
    padding: 0.3rem 0.24rem 0 0.24rem;
    box-sizing: border-box;
    position: relative;
    .userInfo {
      position: relative;
      display: flex;
      .infoImg {
        width: 0.8rem;
        height: 0.8rem;
        border-radius: 0.4rem;
        background: #eee;
      }
      .userClerk {
        width: 0.3rem;
        height: 0.3rem;
        position: absolute;
        left: 0.6rem;
        bottom: 0;
        background-image: url("../../static/images/clerk.png");
        background-size: 100% 100%;
        background-repeat: no-repeat;
        background-position: center center;
      }
      .infoNameMark {
        font-size: 0;
        margin: 0 0 0 0.24rem;
        .name {
          color: #222;
          font-size: 0.3rem;
          line-height: 0.42rem;
        }
        .mark {
          margin: 0.08rem 0 0 0;
          span {
            color: #333;
            font-size: 0.18rem;
            height: 0.26rem;
            line-height: 0.26rem;
            border-radius: 0.13rem;
            padding: 0 0.1rem;
            background: #ffda44;
            display: inline-block;
          }
        }
      }
    }
    .more {
      width: 0.5rem;
      height: 0.5rem;
      position: absolute;
      top: 0.5rem;
      right: 0;
      background-image: url("../../static/images/more.png");
      background-size: 100% 100%;
      background-repeat: no-repeat;
    }
    .noteInfo {
      width: 100%;
      font-size: 0;
      color: #222;
      margin: 0.24rem 0 0 0;
      .info_normal {
        margin: 0 0 0.04rem 0;
        box-sizing: border-box;
        display: -webkit-box;
        word-break: break-all;
        text-overflow: ellipsis;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
      }
      .info_title {
        font-size: 0.34rem;
        line-height: 0.48rem;
      }
      .info_content {
        font-size: 0.3rem;
        line-height: 0.4rem;
      }
    }
    .noteImgs {
      width: 100%;
      margin: 0.24rem 0 0 0;
      display: flex;
      img {
        width: 2.24rem;
        height: 2.24rem;
        &:nth-child(1),
        &:nth-child(2) {
          margin: 0 0.14rem 0 0;
        }
      }
    }
    .userAddr {
      color: #828282;
      font-size: 0;
      height: 0.52rem;
      line-height: 0.52rem;
      border-radius: 2px;
      margin: 0.12rem 0 0 0;
      i {
        display: inline-block;
        width: 0.52rem;
        height: 0.52rem;
        background-image: url("../../static/images/map.png");
        background-size: 100% 100%;
        background-repeat: no-repeat;
        background-position: center center;
        vertical-align: middle;
      }
      span {
        display: inline-block;
        font-size: 0.24rem;
        padding: 0 0.1rem;
        vertical-align: middle;
        background: #f3f3f4;
      }
    }
    .distance {
      color: #999;
      font-size: 0.24rem;
      margin: 0.26rem 0;
      span {
        vertical-align: middle;
      }
    }
    .userOperater {
      width: 100%;
      height: 0.92rem;
      line-height: 0.92rem;
      display: flex;
      .admire {
        width: 2rem;
        i {
          display: inline-block;
          width: 0.4rem;
          height: 0.4rem;
          background-image: url("../../static/images/admirenote.png");
          background-size: 100% 100%;
          background-repeat: no-repeat;
          background-position: center center;
          vertical-align: middle;
        }
        span {
          color: #aaa;
          font-size: 0.32rem;
          margin: 0 0 0 0.1rem;
          vertical-align: middle;
        }
      }
      .edit {
        flex: 1;
        i {
          display: inline-block;
          width: 0.4rem;
          height: 0.4rem;
          background-image: url("../../static/images/editnote.png");
          background-size: 100% 100%;
          background-repeat: no-repeat;
          vertical-align: middle;
        }
        span {
          color: #aaa;
          font-size: 0.32rem;
          margin: 0 0 0 0.1rem;
          vertical-align: middle;
        }
      }
      .talk {
        flex: 1;
        text-align: right;
        i {
          display: inline-block;
          width: 0.4rem;
          height: 0.4rem;
          background-image: url("../../static/images/liaoliao.png");
          background-size: 100% 100%;
          background-repeat: no-repeat;
          vertical-align: middle;
        }
      }
    }
  }
}
</style>
