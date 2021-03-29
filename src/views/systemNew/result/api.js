import request from '@/utils/request' // 请求真实后端
export function GetList(query) {
  return request({
    url: '/system/result/all',
    method: 'get',
    params: query
  })
}

export function UpdateObj(obj) {
  return request({
    url: '/system/result/update',
    method: 'post',
    data: obj
  })
}
export function DelObj(id) {
  return request({
    url: '/system/item/delete',
    method: 'post',
    params: { id }
  })
}
