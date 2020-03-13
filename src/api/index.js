import request from '@/utils/request'

export function getList (params) {
  return request({
    url: '/goods/index/goods/list/' + params.categoryId + '/' + params.page + '/' + params.size,
    method: 'get'
  })
}
