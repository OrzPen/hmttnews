<template>
  <div class="article">
    <!-- 导航 -->
    <van-nav-bar title="黑马头条" left-text="返回" left-arrow @click-left="$router.back()"></van-nav-bar>
    <div>
      <!-- 文章标题 -->
      <h2 class="article-title">{{article.title}}</h2>
      <!-- 作者信息 -->
      <auth-info :article="article"></auth-info>
      <!-- 文章内容 -->
      <div class="article-content" v-html="article.content">

      </div>
      <!-- 更多操作 -->
      <more-action></more-action>
      <!-- 评论列表 -->
      <comment-list :source="articleId"></comment-list>
      <!-- 回复组件 -->
      <reply-list v-model="isShowReply"></reply-list>
    </div>
  </div>
</template>

<script>
import AuthInfo from './components/auth-info.vue'
import MoreAction from './components/more-action.vue'
import CommentList from './components/comment-list.vue'
import ReplyList from './components/reply-list.vue'
import { getArticleByArtId } from '@/api/article'

export default {
  name: 'ArticleIndex',
  components: {
    AuthInfo,
    MoreAction,
    CommentList,
    ReplyList
  },
  data () {
    return {
      article: {},
      // 控制回复组件显示隐藏
      isShowReply: true
    }
  },
  created () {
    this.loadArticle()
  },
  computed: {
    articleId () {
      return this.$route.params.articleId
    }
  },
  methods: {
    async loadArticle () {
      const article = await getArticleByArtId(this.articleId)
      this.article = article
    }
  }
}
</script>

<style lang="less" scoped>
.article {
  // padding: 20px;
  .article-title {
    font-size: 40px;
    font-weight: 400px;
  }
  .article-content {
    font-size: 20px;
  }
}
</style>
