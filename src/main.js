import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant'
import 'vant/lib/index.css'
import 'amfe-flexible/index.min.js'
import './styles/index.less'
import VeeValidate, { Validator } from 'vee-validate'
import CN from 'vee-validate/dist/locale/zh_CN'
Vue.use(VeeValidate)

Validator.localize('zh_CN', CN)

// 自定义规则
Validator.extend('mobile', {
  getMessage: field => '请输入正确的手机号码',
  validate: value =>
    value.length === 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/.test(value)
})
Vue.use(Vant)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
