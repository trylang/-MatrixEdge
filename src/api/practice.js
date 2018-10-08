import request from '@/utils/request'

export function tfjobList(query) {
  return request({
    url: '/tfjobs/api/tfjob/',
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

function deleteTfjobs(name) {
  return request({
    url: `tfjobs/api/tfjob/default/${name}`,
    method: 'delete',
  })
}

export default {  
  tfjobList,
  addTfjobs,
  deleteTfjobs
}