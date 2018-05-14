<template>
<div class="page">
  <div class="page__bd page__bd_spacing">
    <div class="newProduct" v-for="(item, index) in dataList" :key="index" @click="changeDetails(item.product_id)">
      <img :src="item.new_picture">
      <div class="proInduce">{{ item.new_name }}</div>
    </div>
    <templeList :data="newData"></templeList>
  </div>
</div>
</template>

<script>
import templeList from '@/components/yhtempIntro'
import Fly from 'flyio/dist/npm/wx'
export default {
  data () {
    return {
      pag_no: 1,
      openId: '',
      newData: [],
      dataList: []
    }
  },
  components: {
    templeList
  },
  created () {},
  methods: {
    changeDetails (id) {
      wx.navigateTo({
        url: '/pages/details/main?id=' + id
      })
    },
    allProduct () {
      this.$http.CJJX({
        data: JSON.stringify({
          pag_no: this.pag_no,
          pag_num: 5
        }),
        'openid': this.openId
      }).then(res => {
        this.newData = this.newData.concat(res.data.content.data)
      })
    }
  },
  onLoad () {
    let fly = new Fly
    let self = this
    wx.getStorage({
      key: 'openId',
      success: function(res) {
        self.openId = res.data
        self.$http.Allproduct({
          data: JSON.stringify({
            pag_no: 1,
            pag_num: 5
          }),
          'openid': self.openId
        }).then(res => {
          console.log(res)
          self.dataList = res.data.content.data
        })
        self.allProduct()
      } 
    })
  },
  onReachBottom () {
    this.pag_no++
    this.allProduct()
  }
}
</script>

<style>
  page{
    background: #f3f5f9;
  }
</style>
<style lang="less" scoped>
  .newProduct{
    font-size: 0;
    width: 100%;
    margin: 0 0 .2rem 0;
    img{
      width: 100%;
    }
    .proInduce{
      color: #333;
      font-size: .28rem;
      height: .8rem;
      line-height: .8rem;
      padding: 0 0 0 .2rem;
      background: #fff;
    }
  }
  .swiper{
    display: block;
    height: 3.52rem;
  }
  .slide-image {
    width: 100%;
    height: 100%;
  }
</style>
