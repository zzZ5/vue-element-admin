import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/equipment/list/',
    method: 'get',
    params: query
  })
}

export function fetchEquipment(id) {
  return request({
    url: '/equipment/' + id + '/detail/',
    method: 'get'
  })
}

export function fetchRecord(id, listQuery) {
  return request({
    url: '/equipment/' + id + '/record/',
    method: 'get',
    params: { listQuery }
  })
}

export function createEquipment(data) {
  return request({
    url: '/equipment/create/',
    method: 'post',
    data
  })
}

export function updateEquipment(id, data) {
  return request({
    url: '/equipment/' + id + '/update/',
    method: 'put',
    data
  })
}
