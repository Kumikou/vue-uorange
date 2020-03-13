<template>
  <div>
    <el-dialog title="登录" :visible.sync="isShow" :before-close="beforeClose" @close="isShowChange" >
      <el-form ref="form" :model="form" :rules="loginRules" auto-complete="on" label-position="left">
        <el-form-item label="用户名" :label-width="formLabelWidth" prop="username">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
          <el-input type="password" v-model="form.password"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShowChange">取 消</el-button>
        <el-button type="primary" :loading="loading" @click="handleLogin">登 录</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'LoginDialog',
  data () {
    return {
      formLabelWidth: '120px',
      loading: false,
      form: {
        username: '',
        password: ''
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
    beforeClose (done) {
      if (!this.loading) { done() }
    },
    isShowValueChange () {
      this.isShow = false
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
