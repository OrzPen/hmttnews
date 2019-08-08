<template>
  <div>
    <van-dialog :value="value" @input="$emit('input', $event)" :show-confirm-button="false">
      <van-cell-group>
        <van-cell title="从相册选择" @click="openFile" />
        <!-- change检测文件发生改变触发事件 -->
        <input type="file" style="display: none;" ref="input" @change="changeFile">
        <van-cell title="拍照" />
        <van-cell title="取消" @click="$emit('input', false)" />
      </van-cell-group>
    </van-dialog>
  </div>
</template>

<script>
import { ImagePreview } from 'vant'
import { updateUserPhoto } from '@/api/user.js'
export default {
  name: 'UploadPhoto',
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
    }
  },

  computed: {
    file () {
      return this.$refs.input
    }
  },

  methods: {
    openFile () {
      // 点击按钮打开文件选择窗口
      this.file.click()
    },
    // 文件表单中数组发生改变时触发的事件
    changeFile () {
      // 原生自带的构造函数,可以把图片转换为base64格式
      const reader = new FileReader()
      // 转换格式
      reader.readAsDataURL(this.file.files[0])
      // 转换完成后触发的回调函数
      reader.onload = () => {
        // vant组件库预览图片的方法
        ImagePreview({
          images: [reader.result],
          showIndex: false,
          onClose: () => {
            // 打开确认框
            this.openDia()
          }
        })
      }
    },
    openDia () {
      // 打开确认框
      this.$dialog
        .confirm({
          title: '是否确认修改头像'
        })
        .then(async () => {
          // 发送上传头像请求
          const data = await updateUserPhoto(
            'photo',
            this.$refs['input'].files[0]
          )
          // 如果后台返回头像地址
          if (data.photo) {
            // 关闭头像上传组件
            this.$emit('input', false)
            // 将图片地址传到父组件
            this.$emit('upload-success', data.photo)
          }
        })
        .catch(() => {})
    }
  }
}
</script>

<style>
</style>
