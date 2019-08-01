<template>
  <div>
    <van-popup :value="value" @input="$emit('input',$event)" position="bottom" :style="{ height: '95%' }" />
  </div>
</template>

<script>
export default {
  name: 'ChannelIndex',
  props: {
    value: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style>

</style>
