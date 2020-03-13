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

    <div class="goods-detail">
      <div class="demo-image__preview">
        <el-image
          style="width: 400px; height: 400px;position: absolute;"
          :src="item.pic"
          :preview-src-list="item.pic">
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
              <el-button icon="el-icon-shopping-bag-1" style="width: 200px;height: 50px;background-color: #FF0000;color: white;">立即购买</el-button>
              <el-button icon="el-icon-star-off" style="width: 200px;height: 50px;background-color:  #FF9040;color: white;" @click="handleCollect(item.id)">收藏</el-button>
            </el-row>
          </div>
        </div>
      </div>
    </div>

    <div class="goods-bottom">
      <p>卖家： {{ item.userId }}</p>
      <p>上架时间： {{ item.createTime}}</p>
    </div>
  </div>
</template>

<script>
import Header from '../../components/Header/'
import { getDetailByGoodsId, collectGoods } from '@/api/detail'

export default {
  data () {
    return {
      activeIndex: '',
      goodsId: '',
      item: ''
    }
  },
  methods: {
    handleCollect (goodsId) {
      collectGoods(goodsId).then(res => {
        console.log(res)
      })
    }
  },
  created () {
    this.goodsId = this.$route.query.goodsId
    console.log('获得当前商品id' + this.goodsId)
    getDetailByGoodsId(this.goodsId).then(res => {
      console.log(res)
      this.item = res.data
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
