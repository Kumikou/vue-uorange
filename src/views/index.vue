<template>
  <div>
  <div class="header-container">
    <div class="header-middle">
      <el-card class="box-card" >
        <div style="margin: 15% auto 10px;">
          <el-avatar :size="80" :src="userInfo.avatar"></el-avatar>
        </div>
        <div v-show="isLogin" style="margin: 10px;">
          <div style="margin: 10px;">{{ userInfo.username }}</div>
          <div>
              <span>已发布</span>
              <el-divider direction="vertical"></el-divider>
              <span>已买到</span>
              <el-divider direction="vertical"></el-divider>
              <span>已卖出</span>
          </div>
          <el-button type="text" @click="handlePersonal" >个人中心</el-button>
          <el-button type="text" @click="logout">退出</el-button>
        </div>
        <div v-show="!isLogin">
           <el-button
           style="margin: 10px;top: 20%;"
           type="primary"
           size="small"
           :loading="loading"
           @click="openLogin">请登录</el-button>
           <login-dialog :isShow.sync="dialogLoginVisible"></login-dialog>
        </div>
      </el-card>
    </div>
  </div>

  <div class="list-container">
    <el-tabs v-model="activeName"  @tab-click="handleClick" :stretch="true">
        <el-tab-pane label="推荐" name="first">
           <goods-list :datas="5"> </goods-list>
        </el-tab-pane>
        <el-tab-pane label="手机" name="second">
           <goods-list :datas="6"> </goods-list>
        </el-tab-pane>
        <el-tab-pane label="单反" name="third">
           <goods-list :datas="5"> </goods-list>
        </el-tab-pane>
        <el-tab-pane  label="电脑" name="fourth">
           <goods-list :datas="5"> </goods-list>
        </el-tab-pane>
        <el-tab-pane label="配件" name="fifth">
           <goods-list :datas="5"> </goods-list>
        </el-tab-pane>
    </el-tabs>
  </div>
  </div>
</template>

<script>
import GoodsList from '../components/GoodsList/'
import LoginDialog from '../components/LoginDialog/'
import { getToken } from '@/utils/auth'
import { getInfo } from '@/api/user'

export default {
  data () {
    return {
      activeName: 'first',
      isLogin: false,
      loading: false,
      dialogLoginVisible: false,
      userInfo: {
        name: '',
        avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
      }
    }
  },
  components: {
    GoodsList,
    LoginDialog
  },
  methods: {
    handleClick (tab, event) {
      console.log(tab, event)
    },
    openLogin () {
      this.dialogLoginVisible = true
    },
    logout () {
      this.$store.dispatch('user/logout').then(result => {
        this.isLogin = false
        window.location.reload()
      })
    },
    handlePersonal () {
      this.$router.push('/personal')
    }
  },
  mounted () {
    if (getToken()) {
      this.isLogin = true
      getInfo().then(res => {
        this.userInfo.username = res.data.username
        this.userInfo.avatar = res.data.img
      })
    }
  }
}
</script>

<style>
  body {
    margin: 0px;
    padding: 0px;
  }
  .header-container {
    height: 400px;
    background: url(../assets/橙色背景.jpg);
  }

  .header-middle {
    width: 1144px;
    height: 100%;
    margin: auto;
    position: relative;
    background: url(../assets/橙色背景.jpg);
  }

  .box-card {
    position: absolute;
    width: 450px;
    height: 80%;
    text-align: center;
    /* margin: 0px; */
    top: 10%;
    left: 50%;
  }

  .list-container {
  margin: auto;
  width: 1144px;
  }
</style>
