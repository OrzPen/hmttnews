<template>
  <div id="app">
    <p class="test"></p>
    <van-button type="primary">默认按钮</van-button>
    <router-view/>
  </div>
</template>

<style lang="less" scoped>
    .test{
      width: 700px;
      height: 100px;
      background-color: skyblue;
    }
</style>
