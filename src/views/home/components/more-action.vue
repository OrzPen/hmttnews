<template>
<van-dialog closeOnClickOverlay :value="value" @input="$emit('input')" :showConfirmButton="false">
    我是moreaction的内容
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
  }
}
</script>

<style>

</style>
