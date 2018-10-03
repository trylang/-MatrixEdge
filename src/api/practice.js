import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/transaction/list',
    method: 'get',
    params: query
  })
}

function addTfjobs(param) {
  return request({
    url: '/tfjobs/api/tfjob',
    method: 'post',
    data: param
  })
}

export default {
  addTfjobs
}