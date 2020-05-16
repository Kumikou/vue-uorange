<template>
  <div class="common-header">
    <div style="position: absolute;width: 40%;height: 10%; top: 35%;left: 30%;">
      <el-input placeholder="请输入关键字" :clearable="true" v-model="keyword" class="input-with-select">
        <el-select v-model="select" slot="prepend" placeholder="请选择">
          <el-option label="二手" value="1"></el-option>
          <el-option label="拍卖品" value="2"></el-option>
          <el-option label="用户" value="3"></el-option>
        </el-select>
        <el-button slot="append" @click="handleSearch" icon="el-icon-search"></el-button>
      </el-input>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data () {
    return {
      keyword: this.datas,
      select: '1'
    }
  },
  props: {
    datas: ''
  },
  methods: {
    handleSearch () {
      this.$router.push({path: '/search', query: {keyword: this.keyword}})
      location.reload()
    }
  }
}
</script>

<style>
  body {
    margin: 0;
    padding: 0;
  }
  .common-header {
  width: 100%;
  height: 150px;
  margin: auto;
  background-image: url(../../assets/橙色背景.jpg);
  position: relative;
  }
  .el-select {
      width: 90px;
  }
  .input-with-select .el-input-group__prepend{
    background-color: #fff;
  }
</style>
