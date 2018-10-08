import request from '@/utils/request'

export function login(username, password) {
    return request({
        url: '/user/auth/',
        method: 'post',
        data: {
            username,
            password
        }
    })
}

export function getInfo() {
    return request({
        url: '/user/info',
        method: 'get',
    })
}

export function logout() {
    return request({
        url: '/user/logout/',
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


function createUser(params) {
    return request({
        url: '/user/create/',
        method: 'post',
        data: params
    })
}

function updateUser(params) {
    return request({
        url: '/user/update/',
        method: 'put',
        data: params
    })
}

function deleteUser(params) {
    return request({
        url: '/user/delete/',
        method: 'delete',
        data: params
    })
}

function changePsd(params) {
    return request({
        url: '/user/changepassword/',
        method: 'post',
        data: params
    })
}

export default {
    login,
    logout,
    getInfo,
    getUserList,
    createUser,
    updateUser,
    deleteUser,
    changePsd
}
