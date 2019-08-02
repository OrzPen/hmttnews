<template>
  <div>
    <van-nav-bar fixed title="搜索结果" left-text="返回" left-arrow @click-left="$router.back()"></van-nav-bar>
    <van-list
      class="search-list"
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell v-for="item in searchData" :key="item.art_id" :title="item.title" />
    </van-list>
  </div>
</template>

<script>
import { getSearch } from '@/api/search.js'
export default {
  name: 'SearchResult',
  data () {
    return {
      searchData: [],
      page: 1,
      per_page: 10,
      list: [],
      loading: false,
      finished: false
    }
  },
  created () {
    this.loadSearch()
    // console.log(this.$route.params.queryText)
  },
  computed: {
    q () {
      return this.$route.params.queryText
    }
  },
  methods: {
    async onLoad () {
      await this.$sleep(800)
      const data = await this.loadSearch()
      // 追加数据
      // 有数据
      if (data.results) {
        this.searchData.push(...data.results)
        this.loading = false
      }
      this.page++
    },
    async loadSearch () {
      const data = await getSearch({
        page: this.page,
        per_page: this.per_page,
        q: this.q
      })
      console.log(data)

      return data
    }
  }
}
</script>

<style lang="less" scoped>
.search-list {
  margin-top: 92px;
}
</style>
