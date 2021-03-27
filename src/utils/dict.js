import request from '@/utils/request'

export function getTestItem() {
  return request({
    url: '/dict/testItem',
    method: 'post'
  })
}

