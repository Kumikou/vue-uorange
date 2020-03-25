import request from '@/utils/request'

export function commitOrder (data) {
  return request({
    url: '/order/commit',
    method: 'post',
    data
  })
}

export function getOrderDetail (data) {
  return request({
    url: '/order/detail/' + data,
    method: 'get'
  })
}

export function alipay (params) {
  return request({
    url: '/order/alipay/test',
    method: 'get',
    params
  })
}
