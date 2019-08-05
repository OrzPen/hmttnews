<template>
  <div class="auth-info">
    <div class="base-info">
      <img class="avatar" src="https://img.yzcdn.cn/vant/logo.png" alt="">
      <div>
        <p>{{article.aut_name}}</p>
        <p>{{article.pubdate | relTime}}</p>
      </div>
    </div>
    <div>
      <van-button :type="article.is_followed ? 'default':'danger'" :loading="isFollowLoading" @click="handleFollowUser">
        {{article.is_followed?'已关注':'关注'}}
      </van-button>
    </div>
  </div>
</template>

<script>
import { followUser, unFollowUser } from '@/api/user.js'
export default {
  name: 'AuthInfo',
  props: {
    article: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      // 控制按钮在加载时的状态
      isFollowLoading: false
    }
  },
  methods: {
    async handleFollowUser () {
      this.isFollowLoading = true
      // 关注
      if (!this.article.is_followed) {
        await followUser(this.article.aut_id)
        this.isFollowLoading = false
      } else {
        // 取消关注
        await unFollowUser(this.article.aut_id)
        this.isFollowLoading = false
      }
    }
  }
}
</script>

<style lang="less" scoped>
.auth-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 26px;
  .base-info {
    display: flex;
    align-items: center;
  }
  .avatar {
    margin-right: 10px;
    width: 100px;
    height: 100px;
    border-radius: 100%;
  }
}
</style>
