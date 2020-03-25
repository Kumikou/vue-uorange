<template>
  <div>
    <Header></Header>
    <div style="width: 1144px;margin: auto;">
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" >
        <el-submenu index="1">
          <template slot="title">全部分类</template>
          <el-menu-item index="2-1">手机</el-menu-item>
          <el-menu-item index="2-2">数码</el-menu-item>
          <el-menu-item index="2-3">单反</el-menu-item>
          <el-submenu index="2-4">
            <template slot="title">配件</template>
            <el-menu-item index="2-4-1">选项1</el-menu-item>
            <el-menu-item index="2-4-2">选项2</el-menu-item>
            <el-menu-item index="2-4-3">选项3</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-menu-item index="2" to="/">首页</el-menu-item>
        <el-menu-item index="3">拍卖场</el-menu-item>
      </el-menu>
    </div>

    <div class="goods-detail" v-loading="loading">
      <div class="demo-image__preview">
        <el-image
          style="width: 400px; height: 400px;position: absolute;"
          :src="item.pic">
        </el-image>
        <div class="detail">
          <p style="font-size: larger;">{{ item.title }}</p>
          <p style="height: 23%;">{{ item.description}}</p>
          <div style="float: left;width: 15%;">
            <p style="margin: 27px auto;">价格：</p>
            <p>邮费：</p>
            <p>库存：</p>
          </div>
          <div style="float: right;width: 85%;">
            <p style="font-size: xx-large;color: red;margin: 16px 0px;">{{ item.price }}</p>
            <p>{{ item.isFreeFare}}</p>
            <p>1</p>
            <el-row style="margin: auto;">
              <el-button icon="el-icon-shopping-bag-1" style="width: 200px;height: 50px;background-color: #FF0000;color: white;" @click="handleBuy(item.id)">立即购买</el-button>
              <el-button icon="el-icon-star-off" style="width: 200px;height: 50px;background-color:  #FF9040;color: white;" @click="handleCollect(item.id)" :disabled="idCollected">{{ '收藏' }}</el-button>
            </el-row>
          </div>
        </div>
      </div>
    </div>

    <div class="goods-bottom">
      <p>卖家： {{ username }} </p>
      <p>上架时间： {{ item.createTime | timestampToTime}}</p>
    </div>
  </div>
</template>

<script>
import Header from '../../components/Header/'
import { getDetailByGoodsId, collectGoods } from '@/api/detail'
import { getUsernameById } from '@/api/user'

export default {
  data () {
    return {
      activeIndex: '',
      goodsId: '',
      item: '',
      username: '',
      idCollected: false,
      loading: true
      // isCollectedText: this.msg[0],
      // msg: ['收藏', '已收藏']
    }
  },
  methods: {
    handleBuy (goodsId) {
      this.$router.push('/order/' + goodsId)
    },
    handleCollect (goodsId) {
      collectGoods(goodsId).then(res => {
        console.log(res)
        this.$message({
          showClose: true,
          message: '收藏成功',
          type: 'success'
        })
        // this.idCollected = true
        // this.isCollectedText = this.msg[1]
      })
    }
  },
  filters: {
    timestampToTime: function (timestamp) {
      var date = new Date(timestamp * 1000) // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear() + '-'
      var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
      var D = date.getDate() + ' '
      var h = date.getHours() + ':'
      var m = date.getMinutes() + ':'
      var s = date.getSeconds()
      return Y + M + D + h + m + s
    }
  },
  created () {
    this.goodsId = this.$route.query.goodsId
    console.log('获得当前商品id' + this.goodsId)
    getDetailByGoodsId(this.goodsId).then(res => {
      console.log(res)
      this.item = res.data
      this.loading = false
      getUsernameById(this.item.userId).then(res => {
        console.log(res)
        this.username = res.data
      })
    })
  },
  components: {
    Header
  },
  watch: {
    $route: {
      handler: function (route) {
        this.goodsId = route.query && route.query.goodsId
      },
      immediate: true
    }
  }
}
</script>

<style>
  body {
    margin: 0px;
    padding: 0px;
  }
  .goods-detail {
    height: 400px;
    width: 1144px;
    position: relative;
    margin: 30px auto;
  }
  .detail {
    width: 60%;
    height: 500px;
    position: relative;
    margin-left: 40%;
  }
  .goods-bottom {
    width: 1144px;
    margin: auto;
  }
</style>
