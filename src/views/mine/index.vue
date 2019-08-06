<template>
  <div>
    <un-login v-if="!$store.state.user" />
    <user-info v-else :user="user" />
  </div>
</template>

<script>
import UnLogin from './components/un-login'
import UserInfo from './components/user-info'
import { getCurrentUserInfo } from '@/api/user.js'
export default {
  name: 'MyIndex',
  components: {
    UnLogin,
    UserInfo
  },

  data () {
    return {
      user: {}
    }
  },

  created () {
    // 如果用户登录了
    // console.log(this.$store.state.user)

    if (this.$store.state.user) {
      this.loadUserInfo()
      console.log('this.user')
    }
  },

  methods: {
    async loadUserInfo () {
      try {
        // 获取用户基本信息
        const data = await getCurrentUserInfo()
        this.user = data
        console.log(this.user)
      } catch (error) {
        this.$toast.fail('加载用户信息失败')
      }
    }
  }
}
</script>

<style lang="less" scoped></style>
