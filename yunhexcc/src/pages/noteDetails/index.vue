<template>
  <div class="page">
    <div class="swiperContent">
      <swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration" :circular="circular" @change="swiperChange">
        <div v-for="(item, index) in dataList " :key="index">
          <swiper-item>
            <image :src='item' class='slide-image' mode='widthFix'/>
          </swiper-item>
        </div>
      </swiper>
      <div class="swiper-page">
        {{ datalistIndex}} / {{ dataListLength }}
      </div>
    </div>
    <div class="info">
      <img class="infoImg" :src="Data.customer_picture" alt="">
      <div class="infoAddr">
        <p v-if="Data.shop_name">{{ Data.shop_name || '***' }}</p>
        <p :class="{onlyName: !Data.shop_name}">{{ Data.customer_name }}</p>
      </div>
    </div>
    <div class="content">
      <div class="contTitle boxOrent">
        <span>{{ Data.note_name }}</span>
      </div>
      <div class="contMain boxOrent">
        <span v-html="Data.note_desc"></span>
      </div>
    </div>
    <div class="timeStar">
      <span class="time">{{ Data.created_at }}</span>
      <span class="collect">{{ Data.note_collection_total }}次收藏</span>
      <span class="zan">{{ Data.note_like_total }}次点赞</span>
    </div>
    <div class="touxiang">
      <!-- <router-link :to="{path: 'details/praise', query:{'note_id': noteId}}"> -->
        <img v-for="(item, index) in operatorData" :key="index" :src="item.customer_picture" alt="">
        <i />
      <!-- </router-link> -->
    </div>
    <div class="evaluate">
      <div class="title">
        <span>用户评价({{ commentData.comment_sum }})</span>
      </div>
      <ul class="evaList">
        <li v-for="(item, index) in commentData.commentinfo" :key="index">
          <div class="listImg">
            <img :src="item.customer_picture" alt="">
          </div>
          <div class="listContent1">
            <div class="listContTitle">
              <span>{{ item.customer_name }}</span>
            </div>
            <div class="listContMain boxOrent">
              <span v-html="item.comment_content"></span>
            </div>
            <div class="timeStars">
              <div class="time">{{ item.created_at }}</div>
              <div v-if="item.is_reward == 1" class="reward">
                <i />
                <span>{{ item.reward_amount }}</span>
              </div>
              <div class="zan" @click="zanFunc(item.comment_id, item.customer_id, item.comment_like_flag, index)">
                <i class="admire_1" v-if="item.comment_like_flag == -1" />
                <i class="admire" v-else />
                <span>{{ item.comment_like_total }}</span>
              </div>
            </div>
          </div>
        </li>
      </ul>
      <div class="eavMore bor-t">
        <!-- <router-link :to="{path: 'details/evalmore', query:{'note_id': noteId}}"> -->
          <span>查看全部</span>
        <!-- </router-link> -->
      </div>
    </div>
    <div class="footer bor-t">
      <div class="footerBox">
        <div class="item" @click="rewardStateFunc" v-show="Data.note_collection_flag">
          <span>赏</span>
          <i class="shangImg" />
        </div>
        <div class="item" @click="collectFunc(Data.note_collection_flag)" v-show="Data.note_collection_flag">
          <i class="star" v-if="Data.note_collection_flag == 1" />
          <i class="star_1" v-else :class="{animated: collectAnimal, flash: collectAnimal}" />
        </div>
        <div class="item" @click="admireFunc(Data.note_like_flag)" v-show="Data.note_like_flag">
          <i class="admire" v-if="Data.note_like_flag == 1" />
          <i class="admire_1" v-else :class="{animated: admireAnimal, bounce: admireAnimal}" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      autoplay: true,
      interval: 3000,
      duration: 900,
      circular: true,
      datalistIndex: 1,
      dataListLength: 3,
      dataList: [
        'http://test.xclerk.com/mrsyg/YunHaiTongProject/public_tab/image/xcc/ico_coup.png',
        'http://test.xclerk.com/mrsyg/YunHaiTongProject/public_tab/image/xcc/ico_coup.png',
        'http://test.xclerk.com/mrsyg/YunHaiTongProject/public_tab/image/xcc/ico_coup.png'
      ]
    }
  }
}
</script>

<style>
page{
  width: 100%;
  height: 100%;
  background: #f3f5f9;
}
</style>

<style lang="less" scoped>
.swiperContent{
  width: 100%;
  height: 7.5rem;
  position: relative;
  .swiper{
    display: block;
    font-size: 0;
    height: 7.5rem;
    background: #000;
    position: relative;
    .slide-image {
      width: 100%;
      position:absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      margin: auto auto;
    }
  }
  .swiper-page{
    color: #fff;
    font-size: .28rem;
    width: 1.08rem;
    height: .52rem;
    text-align: center;
    display: -webkit-box;
    -webkit-box-pack: center;
    -webkit-box-align: center;
    text-align: center;
    background: #000;
    position: absolute;
    right: .4rem;
    bottom: .3rem;
    border-radius: 1.2rem;
    z-index: 10;
  }
}
.info{
  display: flex;
  width: 100%;
  height: 1.3rem;
  background: #fff;
  position: relative;
  .infoImg{
    width: .72rem;
    height: .72rem;
    border-radius: .36rem;
    margin: .3rem 0 0 .24rem;
    background: #999;
  }
  .infoAddr{
    font-size: .26rem;
    &>p:nth-child(1){
      color: #222;
      line-height: .36rem;
      margin: .28rem 0 0 .1rem;
    }
    &>p:nth-child(2){
      color: #666;
      line-height: .36rem;
      margin: .04rem 0 0 .1rem;
    }
    &>.onlyName{
      line-height: .76rem !important;
    }
  }
  .infoFollow{
    display: inline-block;
    color: #222;
    font-size: .26rem;
    width: 1.6rem;
    height: .6rem;
    line-height: .6rem;
    text-align: center;
    position: absolute;
    top: .36rem;
    right: .24rem;
    border: 1px solid #333;
    box-sizing: border-box;
    border-radius: .1rem;
    span{
      margin: 0 0 0 .04rem;
    }
  }
}
.content{
  width: 100%;
  margin: .12rem 0 0 0;
  background: #fff;
  .contTitle{
    color: #222;
    font-size: .36rem;
    line-height: .5rem;
    display: -webkit-box;
    word-break: break-all;
    text-overflow: ellipsis;
    padding: .3rem .3rem 0 .34rem;
  }
  .contMain{
    color: #222;
    font-size: .28rem;
    line-height: .44rem;
    display: -webkit-box;
    word-break: break-all;
    text-overflow: ellipsis;
    padding: .2rem .3rem .1rem .34rem;
    span{
      white-space: pre-wrap;
    }
  }
  .iconImg{
    font-size: 0;
    width: 30%;
    margin: .6rem 35% .2rem;
    img{
      width: 100%;
    }
  }
  .contEwm{
    color: #666;
    font-size: .26rem;
    text-align: center;
    padding: 0 0 .4rem 0;
  }
}
.timeStar{
  color: #999;
  font-size: .26rem;
  height: .36rem;
  line-height: .36rem;
  background: #fff;
  padding: .3rem;
  display: flex;
  .time{
    flex: 1;
  }
  .collect{
    width: 1.6rem;
    text-align: right;
  }
  .zan{
    width: 1.6rem;
    text-align: right;
  }
}
.touxiang{
  font-size: 0;
  padding: 0 .3rem .4rem;
  background: #fff;
  img{
    width: .7rem;
    height: .7rem;
    margin: 0 .24rem 0 0;
    border-radius: .36rem;
    vertical-align: middle;
  }
  i{
    display: inline-block;
    width: .7rem;
    height: .7rem;
    margin: 0 .24rem 0 0;
    border-radius: .36rem;
    background-image: url('../../../static/images/more_detail.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }
}
.evaluate{
  font-size: 0;
  background: #fff;
  margin: .12rem 0 .12rem 0;
  .title{
    color: #222;
    font-size: .26rem;
    padding: .26rem 0 0 .24rem;
  }
  .evaList{
    width: 100%;
    li{
      margin: .6rem .24rem 0;
      display: flex;
      .listImg{
        width: .7rem;
        height: .7rem;
        img{
          width: 100%;
          height: 100%;
          border-radius: .36rem;
        }
      }
      .listContent{
        flex: 1;
        color: #999;
        font-size: .26rem;
        height: .7rem;
        line-height: .7rem;
        margin: 0 0 0 .22rem;
        padding: 0 0 0 .2rem;
        box-sizing: border-box;
        border: .02rem solid #ddd;
        border-radius: .1rem;
      }
      .listContent1{
        flex: 1;
        font-size: .26rem;
        margin: 0 0 0 .22rem;
        box-sizing: border-box;
        .listContTitle{
          color: #222;
          line-height: .36rem;
        }
        .listContMain{
          color: #222;
          line-height: .36rem;
          display: -webkit-box;
          word-break: break-all;
          text-overflow: ellipsis;
        }
        .timeStars{
          color: #999;
          font-size: .26rem;
          width: 100%;
          line-height: .36rem;
          margin: .24rem 0 0 0;
          display: flex;
          .time{
            vertical-align: middle;
          }
          .eval{
            width: 1.1rem;
            text-align: right;
            img{
              width: .3rem;
              vertical-align: middle;
            }
            span{
              display: inline-block;
              margin: 0 0 0 .04rem;
              text-align: left;
              vertical-align: middle;
            }
          }
          .zan{
            width: 1.1rem;
            text-align: right;
            i{
              width: .3rem;
              height: .3rem;
              background-size: 100% 100%;
              background-repeat: no-repeat;
              vertical-align: middle;
              &.admire_1{
                background-image: url('../../../static/images/admire_1.png'); 
              }
              &.admire{
                background-image: url('../../../static/images/admire.png'); 
              }
            }
            span{
              display: inline-block;
              margin: 0 0 0 .04rem;
              vertical-align: middle;
            }
          }
          .time{
            flex: 1;
            span{
              vertical-align: middle;
            }
          }
          .reward{
            width: 1rem;
            margin-left: .1rem;
            i{
              display: inline-block;
              width: .3rem;
              height: .3rem;
              vertical-align: middle;
              background-image: url('../../../static/images/shang.png');
              background-size: 100% 100%;
              background-repeat: no-repeat;
            }
            span{
              vertical-align: middle;
            }
          }
        }
        .listEval{
          width: 100%;
          margin: .2rem 0 0 0;
          padding: .24rem .24rem .24rem .3rem;
          box-sizing: border-box;
          border-radius: .1rem;
          background: #f8f8f8;
          position: relative;
          &:before{
            content: '';
            width: 0;
            height: 0;
            border-left: .12rem solid transparent;
            border-right: .12rem solid transparent;
            border-bottom: .12rem solid #f8f8f8;
            position: absolute;
            top: -.12rem;
            left: .24rem;
          }
          .evalMain{
            color: #999;
            font-size: .26rem;
            span{
              color: #222;
              margin: 0 .2rem 0 0;
            }
          }
          .timeZan{
            color: #999;
            font-size: .26rem;
            margin: .2rem 0 0 0;
            display: flex;
            img{
              width: .32rem;
              height: .32rem;
              vertical-align: middle;
            }
            span{
              vertical-align: middle;
              &.zanCount{
                width: .84rem;
                text-align: right;
              }
              &.zanTime{
                flex: 1;
              }
            }
          }
          .listSeeMore{
            color: #4395f7;
            margin: .2rem 0 0 0;
          }
        }
      }
      &.evaList_1{
        a{
          width: 100%;
          display: flex;
        }
      }
    }
  }
  .eavMore{
    color: #222;
    font-size: .26rem;
    width: 100%;
    line-height: .9rem;
    text-align: center;
    margin: .2rem 0 0 0;
    a{
      color: #222;
    }
  }
}
.footer{
  width: 100%;
  height: .9rem;
  background: #fff;
  line-height: .9rem;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10;
  .footerBox{
    width: 100%;
    height: .9rem;
    display: flex;
    .item{
      flex: 1;
      color: #222;
      font-size: .26rem;
      text-align: center;
      span{
        vertical-align: middle;
      }
      i{
        display: inline-block;
        width: .32rem;
        height: .32rem;
        background-size: 100% 100%;
        background-repeat: no-repeat;
        vertical-align: middle;
        &.shangImg{
          background-image: url('../../../static/images/shang.png');
        }
        &.star{
          background-image: url('../../../static/images/star.png');
        }
        &.star_1{
          background-image: url('../../../static/images/star_1.png');
        }
        &.admire{
          background-image: url('../../../static/images/admire.png');
        }
        &.admire_1{
          background-image: url('../../../static/images/admire_1.png');
        }
      }
    }
  }
}
</style>
