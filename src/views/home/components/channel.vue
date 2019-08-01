<template>
  <van-popup
    :value="value"
    @input="$emit('input',$event)"
    position="bottom"
    :style="{ height: '95%' }"
  >
    <!-- 我的频道 -->
    <div class="channel">
      <div class="channel-head">
        <div>
          <span class="title">我的频道</span>
          <span class="desc">点击进入频道</span>
        </div>
        <div>
          <van-button type="danger" plain size="mini">编辑</van-button>
        </div>
      </div>
      <van-grid class="channel-content" :gutter="10" clickable>
        <van-grid-item v-for="(item, index) in channels" :key="item.id" text="文字">
          <span slot="text" class="text" :class="{active:index===activeChannelIndex}">{{item.name}}</span>
          <!-- <van-icon class="close-icon" name="close" /> -->
        </van-grid-item>
      </van-grid>
    </div>
    <!-- 推荐频道 -->
    <div class="channel">
      <div class="channel-head">
        <div>
          <span class="title">频道推荐</span>
          <span class="desc">点击添加频道</span>
        </div>
      </div>
      <van-grid class="channel-content" :gutter="10" clickable>
        <van-grid-item v-for="(item,index) in restChannels" :key="item.id" text="文字" @click="handleAddChannel(item,index)">
          <div class="info">
            <span class="text">{{item.name}}</span>
          </div>
        </van-grid-item>
      </van-grid>
    </div>
  </van-popup>
</template>

<script>
import { getAllChannels } from '@/api/channel.js'
export default {
  name: 'HomeChannel',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    channels: {
      type: Array,
      default: () => []
    },
    activeChannelIndex: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      allChannels: []
    }
  },
  computed: {
    restChannels () {
      // 从allChannels从筛选出非channels数据
      // 取出channels数组的每个元素id
      // 1. map能遍历
      // 2. 传cb
      // 3. cb的形参代表每个元素
      // 4. map 会把return的内容保存为新数组中进行返回
      const ids = this.channels.map((item, index) => {
        return item.id
      })
      // console.log(ids)
      // 1. filter能遍历
      // 2. 传cb
      // 3. cb的形参1是每个元素
      // 4. filter筛选符合条件的元素 return bool
      // 5. filter return 是所有符合条件的元素所在的数组
      // const restChannels = this.allChannels.filter((item, index) => {
      // includes
      // 1. 数组实例方法
      // 2. 判断数组a是否包含b
      // 3. return bool
      // return !ids.includes(item.id)
      // })
      // console.log(restChannels)
      return this.allChannels.filter((item, index) => {
        return !ids.includes(item.id)
      })
    }
  },
  created () {
    this.loadAllChannels()
  },
  methods: {
    async loadAllChannels () {
      const data = await getAllChannels()
      // 和之前的用户频道一样,添加对应的数据->此时,还没有使用这些数据
      data.channels.forEach(item => {
        item.articles = [] // 用来保存每个频道item自己的文章列表数据
        item.downPullLoading = false // 当前频道下拉状态
        item.upPullLoading = false // 当前频道上拉加载更多
        item.upPullFinished = false // 当前频道加载完毕
        item.timestamp = Date.now() // 用来保存每个频道item自己的文章列表数据对应的时间戳
        item.successRefreshText = '' // 下拉成功的文本提示
      })
      this.allChannels = data.channels
    }
  }
}
</script>

<style lang="less" scoped>
.channel {
  .channel-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    .title {
      font-size: 30px;
      margin-right: 5px;
    }
    .desc {
      font-size: 12px;
    }
  }
  .channel-content {
    .text {
      font-size: 16px;
    }
    .active {
      color: red;
    }
    .close-icon {
      font-size: 20px;
      position: absolute;
      top: -5px;
      right: -5px;
      z-index: 999;
      background-color: #fff;
    }
    .info {
      display: flex;
      align-items: center;
    }
  }
}
</style>
