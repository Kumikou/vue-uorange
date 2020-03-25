<template>
  <div v-loading="loading">
    <Collection :datas="goods"></Collection>
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
import { getCollectedGoods } from '@/api/personal'
import Collection from '../../components/Person/Collection'

export default {
  data () {
    return {
      goods: '',
      loading: true,
      params: {
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
      this.freshList(id)
    },
    freshList (currentPage) {
      this.params.page = currentPage
      this.loading = true
      getCollectedGoods(this.params).then(res => {
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
    Collection
  }
}
</script>

<style>
</style>
