import request from '@/utils/request'

export function getBlogList(query) {
  return request({
    url: '/getList',
    method: 'get',
    params: query
  })
}

export function getDetail(query) {
  return request({
    url: '/getArticle',
    method: 'get',
    params: query
  })
}

export function postArticle(query) {
  return request({
    url: '/subArticle',
    method: 'post',
    data: query
  })
}
