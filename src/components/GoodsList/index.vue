<template>
  <div>
    <el-row >
      <el-col :span="5" v-for="item in list" :key=item.id style="margin: 5px;width: 19.12%">
        <el-card :body-style="{ padding: '0px' }" shadow="hover">
            <el-image
                style="height: 220px;cursor: pointer;"
                :src=item.pic
                :lazy="true"
                fit="fill"
                class="image"
                @click="detail(item.id)"
                ></el-image>
          <div style="padding: 5px;text-align: left;">
            <el-link :underline="false"><p @click="detail(item.id)" class="title">{{ item.title }}</p></el-link>
            <el-divider></el-divider>
            <span class="price">￥{{ item.price }}</span>
            <div class="bottom clearfix">
              <el-tag size="mini" type="success" effect="dark">包邮</el-tag>
              <el-tag size="mini" type="danger" effect="light">热门</el-tag>
              <el-button type="text" class="button">{{ item.location }}</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <div style="text-align: center;margin: 10px;">
      <el-pagination
        background
        layout="prev, pager, next"
        :current-page="pagination.current"
        :page-count="pagination.pages"
        :page-size="pagination.size"
        @current-change="handleChange"
        @prev-click="handlePreClick"
        @next-click="handleNextClick">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { getList } from '@/api/index'

export default {
  name: 'GoodsList',
  data () {
    return {
      activeName: 'first',
      params: {
        categoryId: this.datas,
        page: 1,
        size: 10
      },
      pagination: {
        current: 1,
        size: 10,
        pages: 0
      },
      list: ''
    }
  },
  props: {
    datas: ''
  },
  methods: {
    handleChange (currentPage) {
      this.freshList(currentPage)
    },
    handlePreClick (currentPage) {
      this.freshList(currentPage)
    },
    handleNextClick (currentPage) {
      this.freshList(currentPage)
    },
    freshList (currentPage) {
      this.params.page = currentPage
      getList(this.params).then(res => {
        console.log('分类ID:' + this.params.categoryId + '当前页:' + this.params.page + '数据:')
        console.log(res.data)
        this.list = res.data.records
        this.pagination.current = res.data.current
        this.pagination.pages = res.data.pages
        this.pagination.size = res.data.size
      })
    },
    detail (id) {
      // console.log(id)
      this.$router.push({path: '/detail', query: {goodsId: id}})
    }
  },
  created () {
    this.freshList(this.params.page)
  }
}
</script>

<style>
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .title {
    font-size: small;
    width: 100%;
    height: 40px;
    margin: 5px;
    line-height: 20px;
    overflow: hidden;
  }

  .price {
    color: red;
  }

  .image {
    width: 100%;
    display: block;
  }

  .el-divider--horizontal {
    margin: 5px 0;
  }

  .clearfix:after {
      clear: both
  }

</style>
