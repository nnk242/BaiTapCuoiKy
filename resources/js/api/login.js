import request from '../utils/request'

export function login(username, password) {
    const data = {
        username, password
    }

    return request({
        url: 'api/auth/login',
        method: 'POST',
        data
    })
}

export function getUserInfo(access_token) {
    return request({
        url: 'api/auth/getUserInfo',
        method: 'GET',
        headers: {
            Authorization: access_token
        }
    })
}
