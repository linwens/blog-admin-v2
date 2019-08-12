import request from '@/utils/request'

export function getList(query) {
  return request({
    url: '/table/list',
    method: 'get',
    params: query
  })
}

export function getGalleryList(query) {
  return request({
    url: '/table/gallery/list',
    method: 'get',
    params: query
  })
}

export function getBlogList(query) {
  return request({
    url: '/table/gallery/list',
    method: 'get',
    params: query
  })
}

export function getNpmList(query) {
  return request({
    url: '/table/npm/list',
    method: 'get',
    params: query
  })
}

export function npmPost(query) {
  return request({
    url: '/table/npm/upload',
    method: 'post',
    params: query
  })
}
