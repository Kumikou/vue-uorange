<template>
  <div>
    <Header :datas="search.keyword"></Header>
    <div class="search-result-container">
      <SearchGoodsList :datas="search.keyword"></SearchGoodsList>
    </div>
  </div>
</template>

<script>
import Header from '../../components/Header/'
import SearchGoodsList from '../../components/SearchGoodsList/'

export default {
  data () {
    return {
      search: {
        keyword: '',
        page: 1,
        size: 10
      }
    }
  },
  components: {
    Header,
    SearchGoodsList
  },
  created () {
    console.log('进入搜索页面')
  },
  watch: {
    $route: {
      handler: function (route) {
        this.search.keyword = route.query && route.query.keyword
      },
      immediate: true
    }
  }
}
</script>

<style>
  .search-result-container {
    margin: 10px auto;
    width: 1144px;
  }
</style>
