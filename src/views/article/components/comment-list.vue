<template>
  <div>
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <van-cell v-for="(item,index) in comments" :key="index">
        <div slot="icon">
          <img class="avatar" :src="item.aut_photo">
        </div>
        <div slot="title">
          <span>{{item.aut_name}}</span>
        </div>
        <div slot="default">
          <van-button icon="like-o" size="mini" plain>赞</van-button>
        </div>
        <div slot="label">
          <p>{{item.content}}</p>
          <p>
            <span>{{item.pubdate | relTime}}</span>
            ·
            <span @click="isShow(item)">回复</span>
          </p>
        </div>
      </van-cell>
    </van-list>
  </div>
</template>

<script>
// 获取评论列表数据api
import { getComments } from '@/api/comment.js'
import vm from '@/utils/event-bus.js'
export default {
  name: 'CommentList',
  props: {
    source: {
      type: [String, Number],
      // default
      required: true
    },
    isComment: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      comments: [],
      offset: null
    }
  },
  // 避免缓存问题,销毁组件
  deactivated () {
    this.$destroy()
  },
  created () {},
  methods: {
    // 点击回复弹出模态框
    isShow (item) {
      vm.$emit('showReply', item)
    },
    async onLoad () {
      console.log('onLoad')
      // 根据路由参数传过来的文章id发送请求获取评论列表数据
      // const articleid = this.$route.params.articleId
      // console.log(articleid)
      console.log(this.source)
      const source = this.source
      const data = await getComments({
        source,
        offset: this.offset,
        isComment: this.isComment
      })
      // 如果后台没有更多数据返回,停掉动画
      if (!data.results.length) {
        console.log('没数据')
        this.loading = false
        this.finished = true
        return
      }
      // 如果后台有数据返回
      if (data.results.length) {
        // 把10个数据 赋值给列表
        this.comments.push(...data.results)
        console.log(this.comments)
        // 更新页码->这里叫偏移量offset
        this.offset = data.last_id
        // 关闭加载动画
        this.loading = false
      }
    }
  }
}
</script>

<style lang="less" scoped>
.avatar {
  width: 50px;
  height: 50px;
  border-radius: 100%;
  margin-right: 10px;
}
</style>
