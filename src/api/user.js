import request from '@/utils/request'

export function login (data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

export function getInfo () {
  return request({
    url: '/info/users',
    method: 'get'
    // data
  })
}

export function logout () {
  return request({
    url: '/oauth/user/logout',
    method: 'get'
    // data
  })
}
