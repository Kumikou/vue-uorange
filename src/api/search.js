import request from '@/utils/request'

export function searchGoods (data) {
  return request({
    url: '/goods/search/' + data.keyword + '/' + data.page + '/' + data.size,
    method: 'get'
  })
}
