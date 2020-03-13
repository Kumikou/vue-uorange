import request from '@/utils/request'

export function getDetailByGoodsId (goodsId) {
  return request({
    url: '/goods/' + goodsId,
    method: 'get'
  })
}

export function collectGoods (goodsId) {
  return request({
    url: '/info/collect/goods/' + goodsId,
    method: 'post'
  })
}
