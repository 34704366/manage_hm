import request from '@/utils/request'

export function login(data) {
    return request({
        url: '/dev/user/login',
        method: 'post',
        data: data
    })
}

export function getInfo(token) {
    return request({
        url: '/dev/user/getInfo',
        method: 'get',
        params: { token }
    })
}

export function logout() {
    return request({
        url: '/dev/user/logout',
        method: 'post'
    })
}
