import { request } from '@/plugins/request'

// 获取标签列表
const getTags = () => {
  return request({
    method: 'GET',
    url: '/api/tags'
  })
}

export {
  getTags
}

