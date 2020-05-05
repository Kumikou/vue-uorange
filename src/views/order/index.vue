<template>
  <div>
    <simple-header></simple-header>
    <div style="width: 1144px;margin: auto;" v-loading="loading">
      <el-row>
        <el-col :span="24">
          <p style="font-weight: bold;margin: 20px 0px 10px;">确认收货地址</p>
          <el-divider></el-divider>
        </el-col>
        <el-col :span="24" v-loading="addLoading">
          <el-radio-group v-model="addRadio" @change="addRadioChange">
              <el-radio style="margin: 10px;width: 100%;font-weight: bolder;" border v-for="(add, index) in addressList" :label="index" :key="index">
                 {{ add.provinceName
                  + ' ' + add.cityName
                   + ' ' + add.areaName
                    + ' ' + add.streetName
                      + ' ' + add.addDetail
                       + ' (' + add.name + ' 收) '
                        + add.phone}}
                        <span v-if="!add.isDefault">默认地址</span>
              </el-radio>
          </el-radio-group>
        </el-col>

        <el-col :span="24">
          <p style="font-weight: bold;margin: 40px 0px 10px;">确认订单信息</p>
          <el-divider content-position="right"><el-link :underline="false" @click="handleUserDetail"><i class="el-icon-user-solid"></i>{{ ' 卖家: ' + sellerName }}</el-link></el-divider>
        </el-col>
        <el-col :span="24" v-loading="goodsDetailLoading">
          <el-table :data="goodsDetail" show-summary style="width: 100%;" :highlight-current-row="true">
            <el-table-column prop="pic" label="商品" align="center" width="90">
              <template slot-scope="scope">
                <el-image style="width: 80px;height: 80px;" :src="scope.row.pic"></el-image>
              </template>
            </el-table-column>
            <el-table-column prop="title">
              <template slot-scope="scope">
                <el-link :underline="false" @click="handleDetail(scope.row.id)">{{ scope.row.title }}</el-link>
              </template>
            </el-table-column>
            <el-table-column prop="description" label="商品描述" width="350"></el-table-column>
            <el-table-column prop="price" label="价格" width="100"></el-table-column>
            <el-table-column label="运费">{{ 0.00 }}</el-table-column>
            <el-table-column prop="price" label="小计" align="right" style="color: red;"></el-table-column>
          </el-table>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <el-button style="width: 150px;height: 50px;float: right;font-weight: bolder;margin-top: 20px;"
           type="danger" @click="conmitOrder">提交订单</el-button>
        </el-col>
      </el-row>
    </div>
    <div style="height: 250px;width: 1144px;margin: auto;"></div>
  </div>
</template>

<script>
import SimpleHeader from '../../components/SimpleHeader/'
import { getAddressChList } from '@/api/personal'
import { getDetailByGoodsId } from '@/api/detail'
import { getUsernameById } from '@/api/user'
import { commitOrder } from '@/api/order'

export default {
  data () {
    return {
      goodsId: 0,
      addressList: [],
      goodsDetail: [],
      addRadio: 0,
      sellerName: '',
      loading: false,
      addLoading: true,
      goodsDetailLoading: true,
      commitOrder: {
        addressDetail: '',
        area: '',
        city: '',
        name: '',
        phone: '',
        province: '',
        street: '',
        goodsId: '',
        money: '',
        pic: '',
        sellerId: '',
        title: ''
      }
    }
  },
  methods: {
    handleDetail (id) {
      this.$router.push({path: '/detail', query: {goodsId: id}})
    },
    handleUserDetail () {
      console.log('卖家id:' + this.goodsDetail[0].userId)
    },
    conmitOrder () {
      console.log('开始提交订单')
      this.loading = true
      this.commitOrder.goodsId = this.goodsDetail[0].id
      this.commitOrder.money = this.goodsDetail[0].price
      this.commitOrder.pic = this.goodsDetail[0].pic
      this.commitOrder.sellerId = this.goodsDetail[0].userId
      this.commitOrder.title = this.goodsDetail[0].title
      commitOrder(this.commitOrder).then(res => {
        if (res.code === 200) {
          const newPage = this.$router.resolve({path: '/alipay', query: {orderNo: res.data}})
          window.open(newPage.href)
          this.loading = false
          this.$alert('请在新页面完成支付', '订单提交成功', {
            confirmButtonText: '我已完成支付',
            callback: action => {
              this.$router.push({path: '/alipay/result', query: {orderNo: res.data}})
            }
          })
        }
      })
    },
    addRadioChange (value) {
      const {addDetail, provinceName, cityName, areaName, streetName, phone, name} = this.addressList[value]
      this.commitOrder.addressDetail = addDetail
      this.commitOrder.province = provinceName
      this.commitOrder.city = cityName
      this.commitOrder.area = areaName
      this.commitOrder.street = streetName
      this.commitOrder.phone = phone
      this.commitOrder.name = name
      console.log(this.commitOrder)
    }
    // handleSummary (params) {
    //   const { columns, data } = params
    //   console.log(columns)
    //   console.log(data)
    // }
  },
  created () {
    getAddressChList().then(res => {
      this.addressList = res.data
      console.log(this.addressList)
      this.addRadioChange(0)
      this.addLoading = false
    })
    getDetailByGoodsId(this.goodsId).then(res => {
      var temp = []
      temp[0] = res.data
      this.goodsDetail = temp
      console.log(this.goodsDetail)
      getUsernameById(res.data.userId).then(res => {
        this.sellerName = res.data
      })
      this.goodsDetailLoading = false
    })
  },
  components: {
    SimpleHeader
  },
  watch: {
    $route: {
      handler: function (route) {
        this.goodsId = route.params && route.params.goodsId
      },
      immediate: true
    }
  }
}
</script>

<style>
  body {
    margin: 0;
    padding: 0;
  }
</style>
