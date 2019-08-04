import axios from 'axios'
// 导入store仓库
import store from '@/store.js'
import JSONBig from 'json-bigint'
import router from '@/router.js'
const $ajax = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn'
})
// 处理art_id超出js最大安全数的问题
$ajax.defaults.transformResponse = [function (data) {
  try {
    return JSONBig.parse(data)
  } catch (error) {
    return data
  }
}]
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
},
async function (error) {
  // 如果后台响应错误状态码为401时(token过期)
  if (error.response.status === 401) {
    // 判断用户是否保存过token
    // 如果没有,跳转到登录页登录
    if (!store.state.user) {
      router.push('/login')
    } else {
      try {
        // 如果保存过,使用axios发送请求,重新获取token
        const data = await axios({
          method: 'put',
          url: `http://ttapi.research.itcast.cn/app/v1_0/authorizations`,
          headers: {
            Authorization: `Bearer ${store.state.user.refresh_token}`
          }
        })
        console.log(store.state)
        // 更新token
        // 使用vuex的store提交setUser方法更新状态中的token
        store.commit('setUser', {
          token: data.data.data.token,
          refresh_token: store.state.user.refresh_token
        })
        console.log('end')
        // 把拦截的响应重新发送请求
        // 此时使用$ajax发送是因为区分功能,而且只有$ajax里封装了基准地址
        return $ajax(error.config)
      } catch (error) {
        // 跳转回登录页
        router.push({ name: 'login' })
      }
    }
  }
  return Promise.reject(error)
})

export default $ajax
