import request from '@/utils/request'

export function changeUserInfo (data) {
  return request({
    url: '/info/users',
    method: 'put',
    data
  })
}
