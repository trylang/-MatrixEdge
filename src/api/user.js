import request from '@/utils/request'

export function login(username, password) {
    return request({
        url: '/user/auth',
        method: 'post',
        data: {
            username,
            password
        }
    })
}

export function getInfo(token) {
    return request({
        url: '/user/info',
        method: 'get',
        params: { token }
    })
}

export function logout() {
    return request({
        url: '/user/logout',
        method: 'get'
    })
}

function getUserList(params) {
    return request({
        url: '/user/list',
        method: 'get',
        params
    }) 
}

function updateUser(params) {
    return request({
        url: '/user/update',
        method: 'put',
        data: params
    })
}

function deleteUser(params) {
    return request({
        url: '/user/delete',
        method: 'delete',
        data: params
    })
}

export default {
    login,
    logout,
    getInfo,
    getUserList,
    updateUser,
    deleteUser
}
