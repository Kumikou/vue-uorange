import request from '@/utils/request'

export function changeUserInfo (data) {
  return request({
    url: '/info/users',
    method: 'put',
    data
  })
}

export function doPublish (data) {
  return request({
    url: '/goods',
    method: 'post',
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

export function createAddress (data) {
  return request({
    url: '/info/users/address',
    method: 'post',
    data
  })
}

export function getAddressList () {
  return request({
    url: '/info/users/address/list',
    method: 'get'
  })
}

export function getAddressChList () {
  return request({
    url: '/info/users/address/list/ch',
    method: 'get'
  })
}

export function delAddress (data) {
  return request({
    url: '/info/users/address/' + data,
    method: 'delete'
  })
}
