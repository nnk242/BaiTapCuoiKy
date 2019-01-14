import request from '../utils/request'

export function getUserInfo(access_token) {
    return request({
        url: 'api/auth/getUserInfo',
        method: 'GET',
        headers: {
            Authorization: access_token
        }
    })
}

export function logout() {
    return request({
        url: 'api/auth/logout',
        method: 'GET'
    })
}
