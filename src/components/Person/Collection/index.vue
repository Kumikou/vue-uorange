<template>
  <div>
    <el-card class="box-card" style="margin: 20px;" v-for="item in datas" :key="item.id">
      <div slot="header" class="clearfix">
        <span>收藏时间: {{ item.createTime | timestampToTime }}</span>
        <el-button style="float: right; padding: 3px 0" icon="el-icon-user-solid" type="success" @click="handleSaler(item.id)">卖家 {{item.userId | userFilter}}</el-button>
      </div>
      <div >
        <el-row :gutter="20">
          <el-col :span="4">
            <el-image :src="item.pic" style="width: 100px;height: 100px;"></el-image>
          </el-col>
          <el-col :span="8">
            <p style="overflow: hidden;height: 35px;margin: 0;font-size: small;">
              {{ item.title }}
            </p>
            <p style="overflow: hidden;height: 50px;margin: 5px 0;font-size: small;">
              {{ item.description }}
            </p>
          </el-col>
          <el-col :span="6">
            <p style="color: red;padding: 12px;">{{ '￥' + item.price }}</p>
          </el-col>
          <el-col :span="6" style="padding: 20px;">
            <el-button style="margin: auto;" type="primary" @click="handleDetail(item.id)">详情</el-button>
            <el-button style="margin: auto;" type="danger" @click="handleDelete(item.id)">删除</el-button>
          </el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<script>
import { cancleCollectedGoods } from '@/api/personal'

export default {
  name: 'Collection',
  data () {
    return {
      goodsList: ''
    }
  },
  methods: {
    handleSaler (userId) {
      console.log(userId)
    },
    handleDetail (goodsId) {
      this.$router.push({path: '/detail', query: {goodsId: goodsId}})
    },
    handleDelete (goodsId) {
      this.$confirm('取消收藏此商品, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        cancleCollectedGoods(goodsId).then(res => {
          this.$message({
            showClose: true,
            message: '取消收藏成功',
            type: 'success'
          })
          location.reload()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消收藏失败'
        })
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
    },
    userFilter: function (userId) {
      return 'Kumikou'
    }
  },
  props: {
    datas: ''
  }
}
</script>

<style>
</style>
