import request from '@/utils/request'

export function login(data) {
    return request({
        url: '/dev/user/login',
        method: 'post',
        data: data
    })
}

