import request from '@/utils/request'

export function login (data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

export function register (data) {
  return request({
    url: '/info/regist',
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

export function getUsernameById (data) {
  return request({
    url: '/info/users/name/id/' + data,
    method: 'get'
  })
}
