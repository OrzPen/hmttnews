<template>
  <div>
    <router-view></router-view>
    <van-tabbar active-color="#0096fa" inactive-color="#000" v-model="activeIndex" route>
      <van-tabbar-item icon="home-o" to="/">首页</van-tabbar-item>
      <van-tabbar-item icon="search" to="/mine">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {}
</script>

<style>
</style>
