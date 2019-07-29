import Vue from 'vue'
import Vuex from 'vuex'
import * as auth from '@/utils/auth'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 初始化数据时从本地获取数据,防止刷新丢失token
    user: auth.getUser()
  },
  mutations: {
    // 登录成功后,调用mutation更新容器中的user的状态
    setUser (state, data) {
      // 修改state
      state.user = data
      // 将数据存到本地
      auth.setUser(state.user)
    }
  },
  actions: {

  }
})
