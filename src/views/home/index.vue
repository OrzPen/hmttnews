<template>
  <div>
    <van-nav-bar title="首页" />
    <van-tabs v-model="activeChannelIndex" class="channel-tab">
      <van-tab v-for="item in channels" :key="item.id" :title="item.name">
        <!-- 列表 -->
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
          <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <van-cell v-for="item in list" :key="item" :title="item" />
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { getChannelsDefaultOrUser } from '../../api/channel'
import { mapState } from 'vuex'
export default {
  name: 'HomeIndex',
  components: {},
  data () {
    return {
      activeChannelIndex: 0,
      list: [],
      loading: false,
      finished: false,
      count: 0,
      isLoading: false,
      channels: []
    }
  },
  created () {
    this.loadChannels()
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    onRefresh () {
      setTimeout(() => {
        this.$toast('刷新成功')
        this.isLoading = false
      }, 500)
    },
    onLoad () {
      // 异步更新数据
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1)
        }
        // 加载状态结束
        this.loading = false

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true
        }
      }, 500)
    },
    async loadChannels () {
      const user = this.user
      const lsChannels = JSON.parse(window.localStorage.getItem('channels'))

      // 如果没登录 并且本地储存中有数据,把本地数据赋值给频道列表
      if (!user && lsChannels) {
        this.channels = lsChannels
      }
      // 如果没登录并且没有本地数据,发送axios请求后台数据,或者已登录直接发送axios请求后台数据
      if ((!user && !lsChannels) || user) {
        const data = await getChannelsDefaultOrUser()
        this.channels = data.channels
      }
      // const data = await getChannelsDefaultOrUser()
      // this.channels = data.channels
      // console.log(data)
    }
  }
}
</script>

<style lang='less' scoped>
.van-nav-bar {
    position: fixed;
    width: 100%;
    top: 0;
}
.channel-tab {
  margin-bottom: 100px;
}
.channel-tab /deep/ .van-tabs__wrap {
  position: fixed;
  width: 100%;
  z-index: 99999;
  top: 92px;
}
.channel-tab /deep/ .van-tabs__content {
  margin-top: 184px;
}
</style>
