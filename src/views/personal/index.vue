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
          :default-active="$route.path">
          <router-link to="/info" style="text-decoration: none;">
            <el-menu-item index="/info">
              <i class="el-icon-platform-eleme"></i>
              <span slot="title">个人信息</span>
            </el-menu-item>
          </router-link>
          <router-link to="/doPublish" style="text-decoration: none;">
            <el-menu-item route index="/doPublish">
              <i class="el-icon-s-shop"></i>
              <span slot="title">发布商品</span>
            </el-menu-item>
          </router-link>
          <router-link to="/followed" style="text-decoration: none;">
            <el-menu-item index="/followed">
              <i class="el-icon-s-flag"></i>
              <span slot="title">我的关注</span>
            </el-menu-item>
          </router-link>
          <router-link to="/publish" style="text-decoration: none;">
            <el-menu-item route index="/publish">
              <i class="el-icon-s-shop"></i>
              <span slot="title">我的发布</span>
            </el-menu-item>
          </router-link>
          <router-link to="/bought" style="text-decoration: none;">
            <el-menu-item index="/bought">
              <i class="el-icon-s-goods"></i>
              <span slot="title">我的购买</span>
            </el-menu-item>
          </router-link>
          <router-link to="/collection" style="text-decoration: none;">
            <el-menu-item index="/collection">
              <i class="el-icon-star-on"></i>
              <span slot="title">我的收藏</span>
            </el-menu-item>
          </router-link>
          <router-link to="/sold" style="text-decoration: none;">
            <el-menu-item index="/sold">
              <i class="el-icon-user-solid"></i>
              <span slot="title">我的已售</span>
            </el-menu-item>
          </router-link>
          <router-link to="/address" style="text-decoration: none;">
            <el-menu-item index="/address">
              <i class="el-icon-s-home"></i>
              <span slot="title">地址管理</span>
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
  mounted () {
    console.log(this.$route.path)
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
