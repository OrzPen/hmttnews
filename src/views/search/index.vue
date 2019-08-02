<template>
<div>
  <van-search v-model="searchText" placeholder="请输入搜索关键词" show-action @search="onSearch" @cancel="onCancel" />
  <!-- 联想建议 -->
  <van-cell-group>
    <van-cell title="单元格" icon="search" />
    <van-cell title="单元格" icon="search" />
    <van-cell title="单元格" icon="search" />
    <van-cell title="单元格" icon="search" />
    <van-cell title="单元格" icon="search" />
    <van-cell title="单元格" icon="search" />
  </van-cell-group>
</div>

<!-- 历史搜索记录 -->
</template>

<script>
export default {
  name: 'SearchIndex',
  data () {
    return {
      searchText: ''
    }
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
