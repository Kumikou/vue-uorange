<template>
  <div>
    <el-card class="box-card" style="margin: 20px;" v-for="item in datas" :key="item.id">
      <div slot="header" class="clearfix">
        <span>{{ item.modifyTime }}</span>
        <!-- <el-button style="float: right; padding: 3px 0" type="danger" @click="handleDelete(item.id)">删除</el-button> -->
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
            <!-- <el-button style="margin: auto;" type="primary" @click="handleEdit(item.id)">编辑</el-button> -->
            <el-button style="margin: auto;" type="success" @click="handleDetail(item.id)">详情</el-button>
            <el-button style="margin: auto;" type="danger" @click="handleDetail(item.id)">删除</el-button>
          </el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Sold',
  data () {
    return {
      goodsList: ''
    }
  },
  props: {
    datas: ''
  }
}
</script>

<style>
</style>
