<template>
  <div>

    <el-dialog title="登录" :visible.sync="isShow" :before-close="beforeClose" style="width: 900px;" @close="isShowChange" >
      <el-form ref="form" :model="form" :rules="loginRules" auto-complete="on" label-position="left">
        <el-form-item label="用户名" :label-width="formLabelWidth" prop="username">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
          <el-input type="password" v-model="form.password"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="text" @click="handleRegisterButton">没有账户？注 册</el-button>
        <el-button @click="isShowChange">取 消</el-button>
        <el-button type="primary" :loading="loading" @click="handleLogin">登 录</el-button>
      </div>
    </el-dialog>

    <el-dialog title="注册" :visible.sync="isShowRegister" style="width: 900px;" :before-close="beforeClose" @close="isShowRegisterValueChange" >
      <el-form ref="registerForm" :model="registerForm" :rules="registerRules" auto-complete="on" label-position="left">
        <el-form-item label="用户名" :label-width="formLabelWidth" prop="username">
          <el-input v-model="registerForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号" :label-width="formLabelWidth" prop="phone">
          <el-input v-model="registerForm.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
          <el-input type="password" v-model="registerForm.password"></el-input>
        </el-form-item>
       <el-form-item label="确认密码" :label-width="formLabelWidth" prop="password">
          <el-input type="password" v-model="repPassword"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="text" @click="handleLoginButton">已有账户？登 录</el-button>
        <el-button @click="isShowRegisterValueChange">取 消</el-button>
        <el-button type="success" :loading="registerLoading" @click="handleRegister">注 册</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { register } from '@/api/user'

export default {
  name: 'LoginDialog',
  data () {
    return {
      formLabelWidth: '120px',
      loading: false,
      registerLoading: false,
      isShowLogin: true,
      isShowRegister: false,
      repPassword: '',
      form: {
        username: '',
        password: ''
      },
      registerForm: {
        username: '',
        phone: '',
        password: ''
        // repPassword: ''
      },
      loginRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: 'blur' }
        ]
      },
      registerRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: 'blur' }
        ],
        // repPassword: [
        //   { required: true, message: '请输入密码', trigger: 'blur' },
        //   { min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: 'blur' }
        // ],
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { min: 11, max: 11, message: '长度为11个字符:', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleLogin () {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.form).then(result => {
            this.isShowChange()
            console.log(result)
            this.$message({
              showClose: true,
              message: '登录成功',
              type: 'success'
            })
            window.location.reload()
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('提交失败')
          return false
        }
      })
    },
    handleRegisterButton () {
      this.isShowChange()
      this.isShowRegister = true
    },
    handleLoginButton () {
      this.isLogin = true
      this.isShowRegister = false
    },
    handleRegister () {
      this.$refs.registerForm.validate(valid => {
        if (this.registerForm.password !== this.repPassword) {
          this.$message({
            showClose: true,
            message: '密码不一致',
            type: 'warn'
          })
        }
        if (valid) {
          this.registerLoading = true
          register(this.registerForm).then(result => {
            this.isShowRegister = false
            console.log(result)
            this.$message({
              showClose: true,
              message: '注册成功',
              type: 'success'
            })
            window.location.reload()
          }).catch(() => {
            this.registerLoading = false
          })
        } else {
          console.log('注册失败')
          return false
        }
      })
    },
    beforeClose (done) {
      if (!this.loading) { done() }
    },
    isShowValueChange () {
      this.isShow = false
    },
    isShowRegisterValueChange () {
      this.isShowRegister = false
    },
    isShowChange () {
      if (!this.loading) { this.$emit('update:isShow', this.isShowValueChange()) }
    }
  },
  props: {
    isShow: false
  }
}
</script>

<style>
</style>
