<template>

  <van-popup :value='value' @input="$emit('input',$event)" position="bottom" :style="{height:'75%'}">

  </van-popup>
</template>

<script>
export default {
  name: 'ReplyList',
  props: {
    value: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang='less' scoped>
</style>
