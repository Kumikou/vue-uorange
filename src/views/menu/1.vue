<template>
  <div>
    <el-row>
      <el-col :span="20">
        <el-form ref="form" :model="userInfoForm" label-width="80px" style="margin-left: 30%;">
          <el-form-item >
            <el-avatar :size="80" :src="userInfo.img"></el-avatar>
          </el-form-item>
          <el-form-item label="用户名">
            <el-input v-model="userInfoForm.username" style="width: 200px;"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-radio-group v-model="userInfoForm.sex">
              <el-radio :label="0">保密</el-radio>
              <el-radio :label="1">男</el-radio>
              <el-radio :label="2">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="手机号">
            <el-input v-model="userInfo.phone" :disabled="true" style="width: 200px;"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="saveChange">保存</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="4"></el-col>
    </el-row>
  </div>
</template>

<script>
import { getInfo } from '@/api/user'
import { changeUserInfo } from '@/api/personal'

export default {
  data () {
    return {
      userInfo: {
        username: '',
        sex: '',
        phone: '',
        img: ''
      },
      userInfoForm: {
        username: '',
        sex: 0
      }
    }
  },
  methods: {
    saveChange () {
      console.log('保存修改')
      changeUserInfo(this.userInfoForm).then(res => {
        console.log(res.data)
      })
    }
  },
  mounted () {
    getInfo().then(res => {
      this.userInfo = res.data
      this.userInfoForm.username = this.userInfo.username
      this.userInfoForm.sex = this.userInfo.sex
    })
  }
}
</script>

<style>
  body {
    font-size: large;
  }
</style>
