<template>
  <div class="add-comment">
    <div class="input-wrap">
      <input type="text" v-model="content">
    </div>
    <div class="more-wrap">
      <!-- <van-icon v-if="!articleId" :name="article.is_collected ? 'star' : 'star-o'" @click="handleCollect"></van-icon> -->
      <van-button size="small" :disabled="!content.length" @click="handleAdd">发布</van-button>
    </div>
  </div>
</template>

<script>
import { addComment } from '@/api/comment.js'
export default {
  name: 'AddComment',
  data () {
    return {
      content: ''
    }
  },
  props: {
    target: {
      type: [String, Number],
      required: true
    }
  },
  methods: {
    async handleAdd () {
      try {
        await addComment({
          target: this.target,
          content: this.content
        })
        this.$toast('发布评论成功')
        this.content = ''
      } catch (error) {
        this.$toast.fail('操作失败')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.add-comment {
  width: 100%;
  background: #fff;
  padding: 20px;
  border-top: 2px solid #ccc;
  display: flex;
  align-items: center;
  justify-content: space-around;
  .input-wrap {
    padding: 10px;
    border: 2px solid #ccc;
    border-radius: 20px;
    height: 60px;
    display: flex;
    flex: 2;
    align-items: center;
    width: 50%;
    input {
      border: none;
      color: #999;
      font-size: 30px;
    }
  }
  .more-wrap {
    display: flex;
    flex: 1;
    width: 100%;
    align-items: center;
    justify-content: space-evenly;
  }
}
</style>
