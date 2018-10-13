import request from '@/utils/request'

export function tfjobList(query) {
  return request({
    url: 'v1/tfjob/list/',
    method: 'get',
    params: query
  })
}

function addTfjobs(param) {
  return request({
    url: '/v1/tfjob/create/',
    method: 'post',
    data: param
  })
}

function deleteTfjobs(name) {
  return request({
    url: `/v1/tfjob/delete`,
    data: name,
    method: 'delete',
  })
}

export default {  
  tfjobList,
  addTfjobs,
  deleteTfjobs
}