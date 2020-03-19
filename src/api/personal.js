import request from '@/utils/request'

export function changeUserInfo (data) {
  return request({
    url: '/info/users',
    method: 'put',
    data
  })
}

export function getGoodsByStatus (data) {
  return request({
    url: '/goods/status/' + data.status + '/' + data.page + '/' + data.size,
    method: 'get'
    // request
  })
}

export function getCollectedGoods (data) {
  return request({
    url: '/info/collect/goods/' + data.page + '/' + data.size,
    method: 'get'
  })
}

export function delPublishedGoods (data) {
  return request({
    url: '/goods/' + data,
    method: 'delete'
  })
}

export function cancleCollectedGoods (data) {
  return request({
    url: '/info/collect/goods/' + data,
    method: 'delete'
  })
}
