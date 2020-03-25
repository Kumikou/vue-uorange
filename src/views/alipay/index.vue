<template>
  <div></div>
</template>

<script>
import { alipay } from '@/api/order'

export default {
  data () {
    return {
      params: {
        orderNo: ''
      }
    }
  },
  created () {
    this.params.orderNo = this.$route.query.orderNo
    alipay(this.params).then(res => {
      console.log(res)
      const div = document.createElement('div')
      div.innerHTML = res
      document.body.appendChild(div)
      document.forms[0].submit()
    })
    // window.open('http:localhost:80/order/alipay/test')
  }
}
</script>

<style>
</style>
