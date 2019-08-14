import request from '@/utils/request'

export function getNpmList(query) {
  return request({
    url: '/getnpmlist',
    method: 'get',
    params: query
  })
}

export function addNPM(query) {
  return request({
    url: '/addnpm',
    method: 'post',
    data: query
  })
}

export function showNPM(query) {
  return request({
    url: '/shownpm',
    method: 'post',
    data: query
  })
}

export function removeNpm(query) {
  return request({
    url: '/removenpm',
    method: 'post',
    data: query
  })
}
