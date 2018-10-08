import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '../store'
import { getToken } from '@/utils/auth'
import base from '@/api/base.js'

// 创建axios实例


// var BASE_API = '';
// if (process.env.NODE_ENV == 'production') {
//     BASE_API = '"http://193.112.153.155:3001"';
// }else{
//     BASE_API = '"http://193.112.153.155:3001"';
// }
const service = axios.create({
    baseURL: base.baseURL, // api的base_url
    // baseURL: base.mock, // api的base_url
    timeout: 1000 * 5 * 60 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(config => {
    if (config.contentType) {
        config.headers['Content-Type'] = config.contentType // 让特定请求携带自定义Content-Type
    };
    if (store.getters.token) {
        config.headers.Authorization = `Token ${getToken()}`;
        // config.headers.Token = getToken();
    }
    return config
}, error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
    response => {
        /**
        * code为非20000是抛错 可结合自己业务进行修改
        */
        const res = response.data
        if (res.code !== 0) {
            debugger
            
            Message({
                message: res.message,
                type: 'error',
                duration: 5 * 1000
            })
            // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
            if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
                MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
                    confirmButtonText: '重新登录',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    store.dispatch('FedLogOut').then(() => {
                        location.reload()// 为了重新实例化vue-router对象 避免bug
                    })
                })
            }
            return Promise.reject('error')
        } else {
            return response.data.data
        }
    },
    error => {
        console.log('err' + error)// for debug
        let err = error.response ? error.response.data: {};
        Message({
            message: err.data ? err.data.msg : err.message,
            type: 'error',
            duration: 5 * 1000
        })
        return Promise.reject(error)
    }
)

export default service
