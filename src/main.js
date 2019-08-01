import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant, { Lazyload } from 'vant'
import 'vant/lib/index.css'
import 'amfe-flexible/index.min.js'
import './styles/index.less'
import VeeValidate, { Validator } from 'vee-validate'
import CN from 'vee-validate/dist/locale/zh_CN'
// 时间处理
import dayjs from 'dayjs'
import relaviveTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn'
dayjs.locale('zh-cn')
dayjs.extend(relaviveTime)

Vue.use(VeeValidate)
// 加载lazyload懒加载插件
Vue.use(Lazyload)
Validator.localize('zh_CN', CN)

// 自定义规则
Validator.extend('mobile', {
  getMessage: field => '请输入正确的手机号码',
  validate: value =>
    value.length === 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/.test(value)
})
Vue.use(Vant)
Vue.config.productionTip = false
// 定时器
Vue.prototype.$sleep = time => {
  return new Promise(resolve => {
    setInterval(() => {
      resolve()
    }, time)
  })
}
// 注册全局过滤器
Vue.filter('relTime', (val) => {
  return dayjs().from(dayjs(val))
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
