<template>
  <div>
    <el-form ref="goodsForm" :model="goodsForm" label-width="100px">
      <el-form-item label="标题">
       <el-input v-model="goodsForm.title" placeholder="请输入详细标题" style="width: 500px;"></el-input>
      </el-form-item>
      <el-form-item label="描述">
        <el-input type="textarea" :rows="5" v-model="goodsForm.description" placeholder="请输入描述" style="width: 500px;"></el-input>
      </el-form-item>
      <el-form-item label="价格">
        <el-input v-model="goodsForm.price" placeholder="请输入价格" style="width: 200px;"></el-input>
      </el-form-item>
      <el-form-item label="图片">
        <el-input type="textarea" :rows="3" v-model="goodsForm.pic" placeholder="图片" style="width: 200px;"></el-input>
      </el-form-item>
      <el-form-item label="是否包邮">
        <el-radio-group v-model="goodsForm.isFreeFare">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="是否全新">
        <el-radio-group v-model="goodsForm.isNew">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="分类">
        <el-radio-group v-model="goodsForm.categoryId">
          <el-radio :label="1">手机</el-radio>
          <el-radio :label="2">单反</el-radio>
          <el-radio :label="3">电脑</el-radio>
          <el-radio :label="4">配件</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="publishGoods">发布</el-button>
        <!-- <el-button type="infor" @click="hideAddForm">取消</el-button> -->
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { doPublish } from '@/api/personal'

export default {
  data () {
    return {
      goodsForm: {
        title: '',
        description: '',
        price: '',
        status: 0,
        pic: '',
        isNew: 0,
        isFreeFare: 1,
        categoryId: 0
      }
    }
  },
  methods: {
    publishGoods () {
      console.log(this.goodsForm)
      doPublish(this.goodsForm).then(res => {
        console.log(this.goodsForm)
      })
    }
  }
}
</script>

<style>
</style>
