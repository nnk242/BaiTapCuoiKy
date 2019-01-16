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

export function logout(access_token) {
    return request({
        url: 'api/auth/logout',
        method: 'GET',
        headers: {
            Authorization: access_token
        }
    })
}

export function checkPassword(access_token, old_password) {
    return request({
        url: 'api/auth/checkPassword',
        method: 'POST',
        headers: {
            Authorization: access_token,
        },
        data: {
            password: old_password
        }
    })
}

export function changePassword(access_token, old_password, new_password) {
    const data = {old_password, new_password}
    return request({
        url: 'api/auth/changePassword',
        method: 'PUT',
        headers: {
            Authorization: access_token,
        },
        data
    })
}
