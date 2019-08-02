<template>
<div>
  <van-search v-model="searchText" placeholder="请输入搜索关键词" show-action @search="onSearch" @cancel="onCancel" />
  <!-- 联想建议 -->
  <van-cell-group>
    <van-cell v-for="(item, index) in suggestData" :key="index" :title="item" icon="search" />
  </van-cell-group>
</div>

<!-- 历史搜索记录 -->
</template>

<script>
import { getSuggestion } from '@/api/search.js'
import { debounce } from '@/utils/debounce.js'
export default {
  name: 'SearchIndex',
  data () {
    return {
      // 输入的关键字
      searchText: '',
      // 联想建议数据
      suggestData: []
    }
  },
  watch: {
    // 当输入框的关键字发生改变时发送请求,所以用watch监测后发送请求
    // 加入防抖功能
    searchText: debounce(async function (newVal) {
      // 如果输入框没有文字时不发送请求
      if (!newVal.length) {
        // 清空联想建议数据终止代码
        this.suggestData = []
        return false
      }
      try {
        const suggestData = await getSuggestion(this.searchText)
        // console.log(suggestData)
        this.suggestData = suggestData.options
      } catch (error) {
        console.dir(error)
      }
    }, 800)
  },
  methods: {
    onSearch () {
      console.log('onSearch--')
    },
    onCancel () {
      console.log('onCancel--')
    }
  }
}
</script>

<style  lang="less" scoped>
</style>
