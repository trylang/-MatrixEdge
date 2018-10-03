/**
 * 接口域名的管理
 */



const base = {    
  mock: ' https://www.easy-mock.com/mock/5bb3790d0b166245847a1c30/MatrixEdge',
  baseURL: '',
}

let domain = document.domain
switch (domain) {
  case '127.0.0.1':
  case 'localhost':
    // base.baseURL = 'http://192.168.88.203:8000';
    base.baseURL = '/api/'
    break
  default:
    break
}

export default base;
