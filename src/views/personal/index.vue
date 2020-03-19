<template>
  <div>
    <Header></Header>
    <el-card class="personal-card">
      <div slot="header" class="clearfix" style="text-align: center;">
          <!-- <span>个人中心</span> -->
          <el-page-header @back="goBack" title="返回首页" style="text-align: center;" content="个人中心">
          </el-page-header>
      </div>

      <div class="personal-menu" style="width: 200px;float: left;">
        <el-menu
          default-active="1">
          <router-link to="/menu1" style="text-decoration: none;">
            <el-menu-item index="1">
              <i class="el-icon-platform-eleme"></i>
              <span slot="title">个人信息</span>
            </el-menu-item>
          </router-link>
          <router-link to="/menu2" style="text-decoration: none;">
            <el-menu-item index="2">
              <i class="el-icon-s-flag"></i>
              <span slot="title">我的关注</span>
            </el-menu-item>
          </router-link>
          <router-link to="/menu3" style="text-decoration: none;">
            <el-menu-item route index="3">
              <i class="el-icon-s-shop"></i>
              <span slot="title">我的发布</span>
            </el-menu-item>
          </router-link>
          <router-link to="/menu4" style="text-decoration: none;">
            <el-menu-item index="4">
              <i class="el-icon-s-goods"></i>
              <span slot="title">我的购买</span>
            </el-menu-item>
          </router-link>
          <router-link to="/menu5" style="text-decoration: none;">
            <el-menu-item index="5">
              <i class="el-icon-star-on"></i>
              <span slot="title">我的收藏</span>
            </el-menu-item>
          </router-link>
          <router-link to="/menu6" style="text-decoration: none;">
            <el-menu-item index="6">
              <i class="el-icon-user-solid"></i>
              <span slot="title">我的已售</span>
            </el-menu-item>
          </router-link>
        </el-menu>
      </div>
      <!-- <div class="content" style="height: 100%;margin: 0px;width: 924px;float: right;"> -->
      <div class="content" style="height: 100%;width: 885px;float: right;">
       <router-view></router-view>
      </div>
     </el-card>
  </div>
</template>

<script>
import Header from '../../components/Header/'

export default {
  data () {
    return {
      info: ''
    }
  },
  components: {
    Header
  },
  methods: {
    goBack () {
      this.$router.push('/')
    }
  }
}

</script>

<style>
  body {
    margin: 0px;
    padding: 0px;
  }
  .personal-card {
    height: 900px;
    width: 1144px;
    margin: 30px auto;
    position: relative;
  }
</style>
