import request from '@/utils/request'

function addHub(param) {
  return request({
    url: '/v1/hub/spawn',
    method: 'post',
    data: param
  })
}

function getHubList(param) {
  return request({
    url: '/v1/hub/list',
    method: 'get',
    params: param
  })
}

function deleteHub(param) {
  return request({
    url: '/v1/hub/delete',
    method: 'delete',
    params: param
  })
}

export default {
  addHub,
  getHubList,
  deleteHub
}