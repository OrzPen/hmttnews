<template>

  <van-popup v-model="isShow" position="bottom" :style="{height:'75%'}" >
    <van-cell>
      <div slot="icon">
        <img class="avatar" :src="commentTop.aut_photo" alt="">
      </div>
      <div slot="title">
        <span>{{commentTop.aut_name}}</span>
        <van-tag>楼主</van-tag>
      </div>
      <div slot="default">
        <van-button icon="like-o" size="mini" plain>赞</van-button>
      </div>
      <div slot="label">
        <p>{{commentTop.content}}</p>
        <p>
          <span>{{commentTop.pubdate | relTime}}</span>
        </p>
      </div>
    </van-cell>
    <hr>
    <!-- 评论的回复列表 -->
    <comment-list :source="commentTop.com_id.toString()" :isComment="false"></comment-list>
    <!-- 回复评论组件 -->
    <add-comment class="add-comment" :target="commentTop.com_id.toString()" :artId="articleId"></add-comment>
  </van-popup>
</template>

<script>
import vm from '@/utils/event-bus.js'
import CommentList from './comment-list.vue'
import AddComment from './add-comment.vue'
export default {
  name: 'ReplyList',
  components: {
    CommentList,
    AddComment
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    articleId: {
      type: [String, Number]
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
        com_id: ''
      }
    }
  },
  methods: {
    // fn () {
    //   this.$destroy()
    // }
  },
  // 避免缓存问题,销毁组件
  deactivated () {
    this.$destroy()
  }
}
</script>

<style lang='less' scoped>
.avatar {
  width: 50px;
  height: 50px;
  border-radius: 100%;
  margin-right: 10px;
}
.add-comment {
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 9999;
}
</style>
