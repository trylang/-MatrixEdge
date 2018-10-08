import request from '@/utils/request'

function addHub(params) {
  return request({
    url: '/v1/hub/spawn/',
    contentType: 'application/x-www-form-urlencoded',
    method: 'post',
    transformRequest: [function (data) {
      let ret = ''
      for (let it in data) {
        // ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
        ret += it + '=' + data[it] + '&'
      }
      return ret
    }],
    data: params
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