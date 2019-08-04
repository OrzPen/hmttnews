<template>
<div>
  <van-search v-model="searchText" placeholder="请输入搜索关键词" show-action @search="onSearch(searchText)" @cancel="onCancel" />
  <!-- 联想建议 -->
  <van-cell-group v-if="!isDeleteData">
    <!-- 给搜索框添加搜索框同一个同一个事件 -->
    <van-cell v-for="(item, index) in suggestData" :key="index" icon="search" @click="onSearch(item)" >
        <span slot="title" v-html="highLight(item, searchText)"></span>
    </van-cell>
  </van-cell-group>
  <van-cell-group v-if="suggestData.length&&searchText.length">
      <van-cell icon="search" v-for="(item,i) in suggestData" :key="i" @click="onSearch(item)">
        <div slot="title" v-html="highLight(item,searchText)">
        </div>
      </van-cell>
    </van-cell-group>
    <!-- 历史搜索记录 -->
    <van-cell-group v-else>
      <van-cell title="历史记录">
        <van-icon @click="isDeleteData=true" v-show="!isDeleteData" slot="right-icon" name="delete" style="line-height:inherit"></van-icon>
        <div v-show="isDeleteData">
          <span style="margin-right:10px">全部删除</span>
          <span @click="isDeleteData=false">完成</span>
        </div>
      </van-cell>
      <van-cell title="hello111">
        <van-icon v-show="isDeleteData" slot="right-icon" name="close" style="line-height:inherit"></van-icon>
      </van-cell>
    </van-cell-group>
</div>

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
      suggestData: [],
      // 控制联想建议与历史记录的切换显示的数据
      isDeleteData: false
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
    // 关键字高亮
    highLight (cell, keywords) {
      return cell
        .toLowerCase()
        .split(keywords)
        .join(`<span style="color:red">${keywords}</span>`)
    },
    // 获取搜索结果
    // 点词条或回车触发
    onSearch (text) {
      console.log('onSearch--', text)
      // 跳转到搜索结果列表并将关键字传过去
      this.$router.push({
        name: 'search-result',
        params: {
          queryText: text
        }
      })
    },
    onCancel () {
      console.log('onCancel--')
    }
  }
}
</script>

<style  lang="less" scoped>
</style>
