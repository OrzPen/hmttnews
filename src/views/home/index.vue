<template>
  <div>
    <van-nav-bar title="首页" fixed @click.native="$router.push({name:'search'})"></van-nav-bar>
    <van-tabs :lazy-render="false" @change="handleChangeTab" v-model="activeChannelIndex" class="channel-tab">
      <div slot='nav-right' class="wap-nav" @click="showChannelManager">
        <van-icon name="wap-nav"></van-icon>
      </div>
      <van-tab v-for="item in channels" :key="item.id" :title="item.name">
        <!-- 列表 -->
        <van-pull-refresh :success-text="item.successRefreshText" v-model="item.downPullLoading" @refresh="onRefresh">
           <van-list v-model="item.upPullLoading" :finished="item.upPullFinished" finished-text="没有更多了" @load="onLoad">
             <!-- 加.toString()处理id后key绑定的需要是字符串的问题 -->
            <van-cell v-for="item in item.articles" :key="item.art_id.toString()" :title="item.title" @click="$router.push({name:'article',params:{articleId:141314}})" >
              <div slot="label">
                <template v-show="item.cover.type">
                  <van-grid :border="false" :column-num="3">
                    <van-grid-item v-for="(item,index) in item.cover.images" :key="index">
                      <!-- 使用lazyload插件,添加lazy-load属性 -->
                      <van-image :src="item"  lazy-load/>
                    </van-grid-item>
                  </van-grid>
                </template>
                <p>
                  <span>作者:{{item.aut_name}}</span>
                  &nbsp;
                  <span>评论 :{{item.comm_count}}</span>
                  &nbsp;
                  <span>时间:{{item.pubdate | relTime}}</span>
                  &nbsp;
                  <!-- 传入item获取当前选中文章 -->
                  <van-icon class="close" name="cross" @click="showMoreActionDia(item)"></van-icon>
                </p>
              </div>
            </van-cell>
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
    <!-- :currentArticle把当前选中文章列表通过父传子传到子组件中 -->
    <!-- dislike-success子组件传值父组件,通过该属性更新视图 -->
    <more-action :currentArticle="currentArticle" @dislike-success="handleDislikeSuccess" v-model="isShowMore"></more-action>
    <!-- 频道管理组件 -->
    <channel @delete-success="handleDeleSuccess" :channels="channels" :activeChannelIndex="activeChannelIndex" v-model="isShowChannel" @update:active-index="activeChannelIndex=$event"></channel>
  </div>
</template>

<script>
import { getChannelsDefaultOrUser } from '../../api/channel'
import { getArticle } from '@/api/article.js'
import { mapState } from 'vuex'
import MoreAction from './components/more-action.vue'
import Channel from './components/channel.vue'
export default {
  name: 'HomeIndex',
  // 子路由组件
  components: {
    MoreAction,
    Channel
  },
  data () {
    return {
      activeChannelIndex: 0,
      list: [],
      loading: false,
      finished: false,
      count: 0,
      isLoading: false,
      channels: [],
      isShowMore: false,
      // 频道列表显示隐藏
      isShowChannel: false,
      // 6 选中的文章列表数据
      currentArticle: null
    }
  },
  created () {
    console.log('created')
    this.loadChannels()
    console.log('over')
  },
  // 检测用户登录状态的变化,当变化时重新加载频道列表
  watch: {
    async user (newV, oldV) {
      // 重新发送请求获取频道列表数据
      await this.loadChannels()
      // 手动触发列表的布尔数据,否则会一直加载
      console.log(123123)
      console.log(this.activeChannel)
      console.log(321)
      this.activeChannel.upPullLoading = true
      // 手动更新文章列表数据
      this.loadArticle()
      // this.onload()
    }
  },
  computed: {
    ...mapState(['user']),
    activeChannel () {
      return this.channels[this.activeChannelIndex]
    }
  },
  methods: {
    // 子组件事件触发更新频道数据
    handleDeleSuccess () {
      // 如果此时列表中没有文章数据
      if (!this.activeChannel.articles.length) {
        // 手动更新数据
        this.activeChannel.upPullLoading = true
        this.onLoad()
      }
    },
    // 标签切换时触发的事件
    handleChangeTab () {
      this.onLoad()
    },
    // 展示频道管理组件
    showChannelManager () {
      this.isShowChannel = true
    },
    // 控制更多弹窗开关
    showMoreActionDia (currentArticle) {
      this.currentArticle = currentArticle
      this.isShowMore = true
    },
    async onRefresh () {
      // 睡眠时间
      await this.$sleep(800)
      // 获取最新时间戳
      this.activeChannel.timestamp = Date.now()
      // 发送请求
      const data = await this.loadArticle()
      // data=> results  pre_time
      // 如果有最新数据
      if (data.results.length) {
        // 重置数据
        this.activeChannel.articles = data.results
        // 更新时间戳
        this.activeChannel.timestamp = data.pre_timestamp
        this.activeChannel.successRefreshText = '更新成功'
      } else {
        this.activeChannel.successRefreshText = '已是最新数据'
      }
      // 关闭动画
      this.activeChannel.downPullLoading = false
    },
    // 获取当前激活频道的数据
    async loadArticle () {
      const { id: channelid, timestamp } = this.activeChannel // {id:1,name:'',timestamp}
      const data = await getArticle({
        channel_id: channelid,
        timestamp,
        with_top: 1
      })
      return data
    },
    async onLoad () {
      console.log('onload')
      // await this.$sleep(800)
      let data = []
      data = await this.loadArticle() // 第一次onload->没数据 ->
      // 如果没数据->配置时间戳
      if (data.pre_timestamp && data.results.length === 0) {
        // 把返回的历史时间戳赋值给当前激活频道的属性timestamp
        this.activeChannel.timestamp = data.pre_timestamp // 默认没有 -> 历史时间戳1
        data = await this.loadArticle()
        // console.log(data)
      }
      // 处理加载完毕后的效果->
      // 1. 停止加载中的的动画
      // 2. 显示加载完毕
      // 3. 跳出方法
      if (!data.pre_timestamp && !data.results.length) {
        this.activeChannel.upPullFinished = true
        this.activeChannel.upPullLoading = false
        return
      }
      // 更新时间戳
      this.activeChannel.timestamp = data.pre_timestamp
      this.activeChannel.articles.push(...data.results)
      // 取消加载中的动画
      this.activeChannel.upPullLoading = false
    },
    async loadChannels () {
      // 统一保存数据
      let channels = []
      const user = this.user
      const lsChannels = JSON.parse(window.localStorage.getItem('channels'))

      // 如果没登录 并且本地储存中有数据,把本地数据赋值给频道列表
      if (!user && lsChannels) {
        channels = lsChannels
      }
      // 如果没登录并且没有本地数据,发送axios请求后台数据,或者已登录直接发送axios请求后台数据
      if ((!user && !lsChannels) || user) {
        const data = await getChannelsDefaultOrUser()
        channels = data.channels
      }
      channels.forEach(item => {
        item.articles = [] // 用来保存每个频道item自己的文章列表数据
        item.downPullLoading = false // 当前频道下拉状态
        item.upPullLoading = false // 当前频道上拉加载更多
        item.upPullFinished = false // 当前频道加载完毕
        item.timestamp = Date.now() // 用来保存每个频道item自己的文章列表数据对应的时间戳
        item.successRefreshText = '' // 下拉成功的文本提示
      })
      this.channels = channels
      // const data = await getChannelsDefaultOrUser()
      // this.channels = data.channels
      // console.log(data)
    },
    // 父组件接收子组件的数据更新视图
    handleDislikeSuccess () {
      // findIndex
      // 1. 数组实例的方法
      // 2. 能遍历
      // 3. findIndex(形参) -> 形参是cb -> cb的形参是每个元素
      // 4. findIndex() return的布尔条件
      // 5. 作用 findIndex返回符合条件的该元素的索引
      const index = this.activeChannel.articles.findIndex(item => {
        return item === this.currentArticle
      })
      this.activeChannel.articles.splice(index, 1)
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
  z-index: 1;
  top: 92px;
}
.channel-tab /deep/ .van-tabs__content {
  margin-top: 184px;
}
.channel-tab /deep/ .close {
  float: right;
  font-size: 30px;
}
// 频道列表按钮样式
.channel-tab /deep/ .wap-nav {
  position: fixed;
  right: 0px;
}
</style>
