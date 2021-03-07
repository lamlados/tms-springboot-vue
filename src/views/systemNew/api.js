import request from '@/utils/request' // 请求真实后端
export function GetList(query) {
  return request({
    url: '/system/item/all',
    method: 'get',
    params: query
  })
}
export function AddObj(obj) {
  return request({
    url: '/system/item/add',
    method: 'post',
    data: obj
  })
}
export function UpdateObj(obj) {
  return request({
    url: '/system/item/update',
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
