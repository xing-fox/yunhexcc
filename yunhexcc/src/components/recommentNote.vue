<template>
    <div class="waterfall-wrap" ref="container">
   
      <div class="lineContainer">
        <div class="noteList">
          <div class="noteItem" v-if="index%2 == 0" v-for="(item, index) of noteList" :key="index" @click="dropDetail(item.note_id)">
                      <div class="itemImg">
            <image  class="noteUrl" :src="item.picture_url" alt="" mode="widthFix"></image>
            <div v-if="item.video_flag == '1'" :class="{imgVedio: item.video_flag == '1'}">
              <img src="../../static/images/play.png" alt="">
            </div>
          </div>
          <div class='item-title boxOrent'>{{ item.note_name }}</div>
          <div class='item-content boxOrent'>{{ item.note_desc }}</div>
          <div class='item-slef'>
            <img class='imgSelf' :src="item.customer_picture" alt="">
            <span class='selfName'>{{ item.customer_name }}</span>
            <div class='zan'>
              <img class='imgZan' @click.stop.prevent="zanFunc(index)" v-if="item.note_like_flag == '1'" src="../../static/images/admire.png" alt="">
              <img class='imgZan' @click.stop.prevent="zanFunc(index)" v-else src="../../static/images/admire_1.png" alt="">
              <span class='selfCount'>{{ item.note_like_total }}</span>
            </div>
          </div>
          </div>
        </div>
        <div class="noteList">
          <div class="noteItem" v-if="index%2 == 1" v-for="(item, index) of noteList" :key="index" @click="dropDetail(item.note_id)">
                      <div class="itemImg">
            <image class="noteUrl" :src="item.picture_url" alt=""></image>
            <div v-if="item.video_flag == '1'" :class="{imgVedio: item.video_flag == '1'}">
              <img src="../../static/images/play.png" alt="">
            </div>
          </div>
          <div class='item-title boxOrent'>{{ item.note_name }}</div>
          <div class='item-content boxOrent'>{{ item.note_desc }}</div>
          <div class='item-slef'>
            <img class='imgSelf' :src="item.customer_picture" alt="">
            <span class='selfName'>{{ item.customer_name }}</span>
            <div class='zan'>
              <img class='imgZan' @click.stop.prevent="zanFunc(index)" v-if="item.note_like_flag == '1'" src="../../static/images/admire.png" alt="">
              <img class='imgZan' @click.stop.prevent="zanFunc(index)" v-else src="../../static/images/admire_1.png" alt="">
              <span class='selfCount'>{{ item.note_like_total }}</span>
            </div>
          </div>
          </div>
        </div>
      </div>
  </div>
</template>
<script>
export default {
  props: {
    noteList: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      openId: ""
    }
  },
  watch: {
    noteList(val) {
      setTimeout(() => {
        this.renderList();
      }, 0);
    }
  },

  methods: {
    renderList() {
      console.log(this.noteList.length);
      let self = this;

      wx.getStorage({
        key: "openId",
        success: function(res) {
          self.openId = res.data;

        }
      });
    },
    zanFunc(arg) {
      if (this.noteList[arg].note_like_flag === "1") {
        this.noteList[arg].note_like_flag = "-1";
        this.noteList[arg].note_like_total =
          parseInt(this.noteList[arg].note_like_total) + 1;
      } else {
        this.noteList[arg].note_like_flag = "1";
        this.noteList[arg].note_like_total =
          parseInt(this.noteList[arg].note_like_total) - 1;
      }
      this.$http
        .zanNewNote({
          data: JSON.stringify({
            parameter_id: this.noteList[arg].note_id,
            operate: 2
          }),
          openid: this.openId
        })
        .then(response => {
          console.log(response);
        });
    },
    dropDetail(noteid) {
      wx.navigateTo({
        url: "/pages/webView/main?id="+noteid
      });
    }
  }
};
</script>
<style lang="less" scoped>
.waterfall-wrap {
  margin: 0 0.1rem;
  position: relative;

  .lineContainer {
    display: flex;
    width: 100%;
    .noteList {
      width: 3.65rem;
      .noteItem {
        width: 3.45rem;
        margin: 0.12rem 0.12rem 0.24rem 0.12rem;
        font-size: 0;
        background: #fff;
        border-radius: 0.1rem;
        overflow: hidden;
        box-sizing: border-box;
        transition: all 0.3s ease;
        border: 1px solid #ddd;
        .itemImg {
          width: 100%;
          position: relative;
       
          .noteUrl{
            width: 100%;
          }
          .imgVedio {
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            background-color: rgba(0, 0, 0, 0.6);
            img {
              width: 1rem;
              height: 1rem;
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              margin: auto auto;
            }
          }
        }
        .item-title {
          color: #222;
          font-size: 0.28rem;
          display: -webkit-box;
          word-break: break-all;
          text-overflow: ellipsis;
          -webkit-line-clamp: 2;
          overflow: hidden;
          margin: 0.22rem 0.04rem 0.1rem 0.16rem;
        }
        .item-content {
          color: #999;
          font-size: 0.24rem;
          line-height: 0.34rem;
          display: -webkit-box;
          word-break: break-all;
          text-overflow: ellipsis;
          -webkit-line-clamp: 2;
          overflow: hidden;
          margin: 0 0.06rem 0.2rem 0.16rem;
        }
        .item-slef {
          width: 100%;
          line-height: 0.4rem;
          margin: 0.4rem 0;
          position: relative;
          display: flex;
          .imgSelf {
            width: 0.4rem;
            height: 0.4rem;
            margin: 0 0.08rem 0 0.1rem;
            border-radius: 0.2rem;
          }
          .zan {
            flex: 1;
            text-align: right;
            margin: 0 0.2rem 0 0;
            .imgZan {
              display: inline-block;
              width: 0.3rem;
              height: 0.32rem;
              vertical-align: middle;
            }
            .selfCount {
              display: inline-block;
              color: #999;
              font-size: 0.24rem;
              margin: 0 0 0 0.1rem;
              vertical-align: middle;
            }
          }
          .selfName {
            color: #222;
            font-size: 0.2rem;
            width: 1.6rem;
            height: 0.4rem;
            display: -webkit-box;
            word-break: break-all;
            text-overflow: ellipsis;
            -webkit-line-clamp: 1;
            overflow: hidden;
          }
        }
      }
    }
  }
}
</style>
