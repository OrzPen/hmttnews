import axios from 'axios'
// 导入store仓库
import store from '@/store.js'
const $ajax = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn'
})

$ajax.interceptors.request.use(function (config) {
  // 解构出仓库中保存token的变量
  const { user } = store.state
  // 如果请求地址不等于登录地址且仓库中有保存token,设置请求头
  config.url !== '/app/v1_0/authorizations' && user && (config.headers.Authorization = `Bearer ${user.token}`)
  return config
}, function (error) {
  return Promise.reject(error)
})

$ajax.interceptors.response.use(function (response) {
  // 如果响应结果对象中有 data，则直接返回这个 data 数据
  // 如果响应结果对象中没有 data，则不作任何处理，直接原样返回这个数据
  return response.data.data || response.data
}, function (error) {
  return Promise.reject(error)
})

export default $ajax
