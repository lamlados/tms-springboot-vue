import request from '@/utils/request'

export function login(data) {
  return request({
    url: 'http://localhost:8090/auth/login',
    method: 'post',
    data
  })
}

export function getUserInfo(token) {
  return request({
    url: 'http://localhost:8090/sys/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: 'http://localhost:8090/sys/user/logout',
    method: 'get'
  })
}
// export function getData() {
//   return request({ url: 'http://localhost:8090/system/pageInfo?pageNum=1&pageSize=5', method: 'get' })
// }
