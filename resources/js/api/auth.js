import request from '../utils/request'
import store from '../store'

function full_token() {
    return (store.getters.token_type + ' ' + store.getters.token).trim()
}

export function getUserInfo() {
    return request({
        url: 'api/auth/getUserInfo',
        method: 'GET',
        headers: {
            Authorization: full_token()
        }
    })
}

export function logout() {
    return request({
        url: 'api/auth/logout',
        method: 'GET',
        headers: {
            Authorization: full_token()
        }
    })
}

export function checkPassword(old_password) {
    return request({
        url: 'api/auth/checkPassword',
        method: 'POST',
        headers: {
            Authorization: full_token(),
        },
        data: {
            password: old_password
        }
    })
}

export function changePassword(old_password, new_password) {
    const data = {old_password, new_password}
    return request({
        url: 'api/auth/changePassword',
        method: 'PUT',
        headers: {
            Authorization: full_token(),
        },
        data
    })
}

export function updateUserInfo(data) {
    return request({
        url: 'api/auth/updateUserInfo',
        method: 'PUT',
        headers: {
            Authorization: full_token(),
        },
        data
    })
}
