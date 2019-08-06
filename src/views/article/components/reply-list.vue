<template>

  <van-popup v-model="isShow" position="bottom" :style="{height:'75%'}">

  </van-popup>
</template>

<script>
import vm from '@/utils/event-bus.js'
export default {
  name: 'ReplyList',
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  created () {
    vm.$on('showReply', (item) => {
      // 接收评论信息
      this.commentTop = item
      this.isShow = true
    })
  },
  data () {
    return {
      // 控制回复框显示隐藏
      isShow: false,
      commentTop: {

      }
    }
  }
}
</script>

<style lang='less' scoped>
</style>
