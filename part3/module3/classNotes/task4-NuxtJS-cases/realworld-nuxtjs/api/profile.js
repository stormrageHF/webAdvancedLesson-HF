
import { request } from "@/plugins/request"

// 获取 profile
const getProfile = username => {
  return request({
    method: 'GET',
    url: `/api/profiles/${username}`
  })
}
// 获取当前用户
const getCurrentUser = ()=> {
  return request({
    method: 'GET',
    url: `/api/user`
  })
}
// 更新用户
const UpdateUser = data => {
  return request({
    method:"PUT",
    url: "/api/user",
    data
  })
}

// 关注
const FollowUser = username => {
  return request({
    method:"POST",
    url: `/api/profiles/${username}/follow`,
  })
}
// 取消关注
const UnfollowUser = username => {
  return request({
    method:"DELETE",
    url: `/api/profiles/${username}/follow`,
  })
}

export {
  getProfile,
  getCurrentUser,
  UpdateUser,
  FollowUser,
  UnfollowUser
}

