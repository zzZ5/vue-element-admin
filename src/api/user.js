import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/login/',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/account/mine/',
    method: 'get'
    // params: { token }
  })
}

export function update(data) {
  return request({
    url: '/account/update/',
    method: 'put',
    data
  })
}

export function getRecord(query) {
  return request({
    url: '/account/record/',
    method: 'get',
    params: query
  })
}

export function logout() {
  return request({
    url: '/account/logout/',
    method: 'get'
  })
}
