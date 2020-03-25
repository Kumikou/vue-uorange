<template>
  <div v-loading="loading">
    <Publish :datas="goods"></Publish>
    <div style="text-align: center;margin: 10px;">
      <el-pagination
        background
        layout="prev, pager, next"
        :current-page="pagination.current"
        :page-count="pagination.pages"
        :page-size="pagination.size"
        @current-change="handlePageChange"
        @prev-click="handlePageChange"
        @next-click="handlePageChange">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { getGoodsByStatus } from '@/api/personal'
import Publish from '../../components/Person/Publish'

export default {
  data () {
    return {
      loading: true,
      goods: '',
      params: {
        status: 0,
        page: 1,
        size: 3
      },
      pagination: {
        current: 1,
        size: 3,
        pages: 1
      }
    }
  },
  methods: {
    handlePageChange (id) {
      console.log(id)
      this.freshList(id)
    },
    freshList (currentPage) {
      this.params.page = currentPage
      this.loading = true
      getGoodsByStatus(this.params).then(res => {
        console.log(res)
        this.goods = res.data.records
        this.pagination.current = res.data.current
        this.pagination.size = res.data.size
        this.pagination.pages = res.data.pages
        this.loading = false
      })
    }
  },
  mounted () {
    this.freshList(this.params.page)
  },
  components: {
    Publish
  }
}
</script>

<style>
</style>
