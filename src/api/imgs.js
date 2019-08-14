import request from '@/utils/request'

export function getGalleryList(query) {
  return request({
    url: '/getImglist',
    method: 'get',
    params: Object.assign(query, { dataType: 'galleryImg' })
  })
}

export function getBlogList(query) {
  return request({
    url: '/getImglist',
    method: 'get',
    params: Object.assign(query, { dataType: 'blogImg' })
  })
}

export function getImg(query) {
  return request({
    url: '/getImginfo',
    method: 'get',
    params: query
  })
}

export function uploadImg(query) {
  return request({
    url: '/uploadImg',
    method: 'post',
    params: query
  })
}

export function removeImg(query) {
  return request({
    url: '/removeImg',
    method: 'post',
    data: query
  })
}

export function saveUrl(query) {
  return request({
    url: '/saveImg',
    method: 'post',
    data: query
  })
}

export function getThemes() {
  return request({
    url: '/imgThemes',
    method: 'get'
  })
}
