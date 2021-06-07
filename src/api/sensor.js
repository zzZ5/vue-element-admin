import request from '@/utils/request'

export function fetchList(listQuery) {
  return request({
    url: '/sensor/list/',
    method: 'get',
    params: listQuery
  })
}

export function fetchSensor(id) {
  return request({
    url: '/sensor/' + id + '/detail/',
    method: 'get'
  })
}

export function fetchRecord(id, listQuery) {
  return request({
    url: '/sensor/' + id + '/record/',
    method: 'get',
    params: listQuery
  })
}

export function createSensor(data) {
  return request({
    url: '/sensor/create/',
    method: 'post',
    data
  })
}

export function updateSensor(id, data) {
  return request({
    url: '/sensor/' + id + '/update/',
    method: 'put',
    data
  })
}

export function fetchData(id, listQuery) {
  return request({
    url: '/sensor/' + id + '/data/',
    method: 'get',
    params: listQuery
  })
}
