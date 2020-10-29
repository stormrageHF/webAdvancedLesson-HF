const cookieparser = process.server ? require('cookieparser') : undefined


//在服务端渲染期间运行的都是同一个实例
// 为防止数据冲突，务必要把 state 定义成一个函数，返回数据对象
const state = ()=>{
  return {
    // 当前用户登录状态
    user: null
  }
}

const mutations = {
  setUser(state, data) {
    state.user = data
  }
}

const actions = {
  // 服务端渲染的时候调用，获取 cookie 中的用户信息，将信息存入容器
  nuxtServerInit ({ commit }, { req }) {
    let user = null
    if (req.headers.cookie) {
      const parsed = cookieparser.parse(req.headers.cookie)
      try {
        user = JSON.parse(parsed.user)
      } catch (err) {
        // No valid cookie found
      }
    }
    commit('setUser', user)
  }
}

export {
  state,
  mutations,
  actions
}