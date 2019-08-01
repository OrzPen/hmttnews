<template>
<van-dialog closeOnClickOverlay :value="value" @input="$emit('input')" :showConfirmButton="false">
     <van-cell-group v-if="!isReport">
      <van-cell icon="location-o" title="不感兴趣" @click="handleUnlikeArticle()" />
      <van-cell icon="location-o" title="反馈垃圾内容" is-link @click="isReport=true" />
      <van-cell icon="location-o" title="拉黑作者" />
    </van-cell-group>

    <van-cell-group v-else>
      <!-- 左按钮控制返回上一组结构 -->
      <van-cell icon="arrow-left" @click="isReport=false" />
      <van-cell v-for="(item,index) in reportType" :key="item.value" :title="item.title" icon="location-o" @click="handleClickReport(item,index)" />
    </van-cell-group>
</van-dialog>
</template>

<script>
export default {
  name: 'MoreAction',
  props: {
    value: {
      type: Boolean,
      default: false
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
  }
}
</script>

<style>

</style>
