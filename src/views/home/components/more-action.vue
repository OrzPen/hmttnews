<template>
<van-dialog closeOnClickOverlay :value="value" @input="$emit('input')" :showConfirmButton="false">
     <van-cell-group v-if="!isReport">
      <van-cell icon="location-o" title="不感兴趣" @click="handleUnlikeArticle()" />
      <van-cell icon="location-o" title="反馈垃圾内容" is-link @click="isReport=true" />
      <van-cell icon="location-o" title="拉黑作者" />
      <!-- {{this.currentArticle}} -->
    </van-cell-group>

    <van-cell-group v-else>
      <!-- 左按钮控制返回上一组结构 -->
      <van-cell icon="arrow-left" @click="isReport=false" />
      <van-cell v-for="(item,index) in reportType" :key="item.value" :title="item.title" icon="location-o" @click="handleClickReport(item,index)" />
    </van-cell-group>
</van-dialog>
</template>

<script>
import { dislikesArticle } from '@/api/article.js'
export default {
  name: 'MoreAction',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    // 接收当前选中文章
    currentArticle: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      // 控制举报列表显示隐藏
      isReport: false,
      // 举报列表数据
      reportType: [
        // {title:'',value:0},
        { title: '其他问题', value: 0 },
        { title: '标题夸张', value: 1 },
        { title: '低俗色情', value: 2 },
        { title: '错别字多', value: 3 },
        { title: '旧闻重复', value: 4 },
        { title: '广告软文', value: 5 },
        { title: '内容不实', value: 6 },
        { title: '涉嫌违法犯罪', value: 7 },
        { title: '侵权', value: 8 }
      ]
    }
  },
  methods: {
    async handleUnlikeArticle () {
      // 从父组件传来的当前点击的文章列表中取出id
      const { art_id: articleId } = this.currentArticle
      try {
        // 发送ajax请求向后台发送不感兴趣请求,请求返回不喜欢文章的id,此处不需要使用
        await dislikesArticle(articleId)
        // 告诉父组件已成功添加不感兴趣
        this.$emit('dislike-success')
        // 关闭对话框
        this.$emit('input', false)
        // 提示操作成功->使用vant组件库的提示框
        this.$toast('操作成功')
      } catch (error) {
        // 展开打印错误信息
        console.dir(error)
        this.$toast('操作失败')
      }
    }
  }
}
</script>

<style>

</style>
