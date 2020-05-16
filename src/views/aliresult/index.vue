<template>
  <div>
    <Header></Header>
    <div style="margin: 40px auto;width: 1144px;">
      <el-row>
        <el-col span="24" style="text-align: center;">
          <h1>
            <i class="el-icon-check"></i>
            您的订单已支付成功！订单号：
            <el-link :underline="false">
              <h1>
                {{ orderDetail.orderNo }}
              </h1>
            </el-link>
          </h1>
        </el-col>
        <el-col span="24" style="text-align: center;">
          <h1>
            支付流水号：
            <el-link :underline="false">
              <h1>
                {{ orderDetail.alipayNo }}
              </h1>
            </el-link>
          </h1>
        </el-col>
      </el-row>

      <div style="margin: auto;width: 1144px;text-align: center;">
        <el-button @click="toIndex">返回首页</el-button>
      </div>

    </div>
  </div>
</template>

<script>
import { getOrderDetail } from '@/api/order'
import Header from '../../components/Header/'

export default {
  data () {
    return {
      orderDetail: '',
      params: {
        orderNo: ''
      }
    }
  },
  components: {
    Header
  },
  methods: {
    toIndex () {
      this.$router.push('/')
    }
  },
  created () {
    console.log('开始获取')
    const orderNo = this.$route.query.orderNo
    // this.params.orderNo = this.$route.query.orderNo
    getOrderDetail(orderNo).then(res => {
      this.orderDetail = res.data
      console.log(this.orderDetail)
    })
  }
}
</script>

<style>
</style>
