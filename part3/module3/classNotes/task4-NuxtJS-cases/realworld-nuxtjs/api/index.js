import { request } from '@/plugins/request'

// 登录
const login = data => {
  return request({
    method: 'POST',
    url: "/api/users/login",
    data
  })
}
// 注册
const register = data => {
  return request({
    method: 'POST',
    url: "/api/users",
    data
  })
}

export {
  login,
  register
}
