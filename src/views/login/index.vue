<template>
  <div>
    <van-nav-bar title="登录" />
    <form action="/" >
      <van-cell-group>
        <van-field v-validate="'required|mobile'" name="phone" :error-message="errors.first('phone')" v-model="user.mobile" required clearable label="手机号" placeholder="请输入手机号" />
        <van-field v-model="user.code" type="password" label="密码" placeholder="请输入密码" required />
      </van-cell-group>
      <van-button :loading='loginloading' type="info" block @click.prevent="handleLogin">登录</van-button>
    </form>
  </div>
</template>

<script>
import { login } from '@/api/user.js'
export default {
  name: 'LoginIndex',
  data () {
    return {
      user: {
        mobile: '18801185985',
        code: '246810'
      },
      loginloading: false
    }
  },
  methods: {
    handleLogin () {
      this.loginloading = true
      try {
        this.$validator.validate().then(async valid => {
          if (!valid) {
            this.loginloading = false
            return
          }
          const data = await login(this.user)
          console.log(data)
          this.$store.commit('setUser', data)
          this.loginloading = false
          this.$router.push('/')
        })
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style lang="less" scoped>
</style>
