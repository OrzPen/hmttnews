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
          <van-button type="danger" plain size="mini" @click="isEdit=!isEdit">{{!isEdit?'编辑':'完成'}}</van-button>
        </div>
      </div>
      <van-grid class="channel-content" :gutter="10" clickable>
        <van-grid-item v-for="(item, index) in channels" :key="item.id" text="文字" @click="handleClickChannel(item,index)">
          <!-- 如果是编辑状态不显示高亮样式 -->
          <span class="text" :class="{active:index===activeChannelIndex && !isEdit}">{{item.name}}</span>
          <!-- 判断按钮状态,如果是编辑状态显示删除图标并且排除掉第一个推荐 -->
          <van-icon v-show="isEdit===true && index!==0" class="close-icon" name="close" />
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
import { getAllChannels, resetUserChannels } from '@/api/channel.js'
import { mapState } from 'vuex'
import { deleChannelById } from '../../../api/channel'
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
      allChannels: [],
      // 控制编辑完成按钮状态
      isEdit: false
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
    },
    ...mapState(['user'])
  },
  created () {
    this.loadAllChannels()
  },
  methods: {
    // 进入||编辑频道
    handleClickChannel (item, index) {
      if (!this.isEdit) {
        // 进入频道
        this.changeChannel(item, index)
      } else {
        // 删除频道
        this.deleChannel(item, index)
      }
    },
    // 进入
    changeChannel (item, index) {
      console.log('进入频道')
      // 修改父组件的激活频道index
      this.$emit('update:active-index', index)
      // 关闭对话框
      this.$emit('input', false)
    },
    // 删除
    async deleChannel (item, index) {
      console.log('删除频道')
      // 推荐按钮后台默认不允许删除所以在这里把第一项的删除方法排除
      this.channels.splice(index, 1)
      // 告诉父组件重新更新频道列表数据
      this.$emit('delete-success')
      // 如果用户登录
      if (this.user) {
        // 发送请求删除频道
        await deleChannelById(item.id)
      } else {
        // 未登录状态本地删除频道
        window.localStorage.setItem('channels', JSON.stringify(this.channels))
      }
    },
    // 添加频道
    async handleAddChannel (item, index) {
      // 添加频道的核心代码
      this.channels.push(item)
      // 如果用户登录
      if (this.user) {
        // 接口问题
        const channels = this.channels.slice(1).map((item, index) => {
          return {
            id: item.id,
            seq: index + 2
          }
        })
        // 发送请求
        await resetUserChannels(channels)
        // console.log(res)
      } else {
        // 本地ls中加频道
        window.localStorage.setItem('channels', JSON.stringify(this.channels))
      }
    },
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
