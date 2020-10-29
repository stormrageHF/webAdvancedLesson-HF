import { request } from '@/plugins/request'

// 获取文章列表
const getArticles = params => {
  return request({
    method: 'GET',
    url: '/api/articles',
    params
  })
}

// 获取关注的文章列表
const getFeedArticles = params => {
  return request({
    method: 'GET',
    url: '/api/articles/feed',
    params
  })
}

// 点赞
const addFavorite = slug => {
  return request({
    method: 'POST',
    url: `/api/articles/${slug}/favorite`,
  })
}
// 取消赞
const deleteFavorite = slug => {
  return request({
    method: 'DELETE',
    url: `/api/articles/${slug}/favorite`,
  })
}
// 获取文章详情
const getArticle = slug => {
  return request({
    method: 'GET',
    url: `/api/articles/${slug}`,
  })
}
// 获取文章评论
const getComments = slug => {
  return request({
    method: 'GET',
    url: `/api/articles/${slug}/comments`,
  })
}
// 创建文章
const createArticle = data => {
  return request({
    method: 'POST',
    url: `/api/articles`,
    data
  })
}
// 添加评论
const addComments = (slug, data) => {
  return request({
    method: 'POST',
    url: `/api/articles/${slug}/comments`,
    data
  })
}
// 删除评论
const deleteComment = (slug, id) => {
  return request({
    method: 'DELETE',
    url: `/api/articles/${slug}/comments/${id}`
  })
}

export {
  getArticles,
  getFeedArticles,
  addFavorite,
  deleteFavorite,
  getArticle,
  getComments,
  addComments,
  deleteComment,
  createArticle
}

