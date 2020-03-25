<template>
  <div>
    {{ orderDetail }}
  </div>
</template>

<script>
import { getOrderDetail } from '@/api/order'

export default {
  data () {
    return {
      orderDetail: '',
      params: {
        orderNo: ''
      }
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
