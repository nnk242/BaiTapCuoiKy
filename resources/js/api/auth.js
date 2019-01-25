import request from '../utils/request'
import {token_full} from './TOKEN'

const url = 'api/auth/'

export function getUserInfo() {
    return request({
        url: url + 'getUserInfo',
        method: 'GET',
        headers: {
            Authorization: token_full()
        }
    })
}

export function logout() {
    return request({
        url: url + 'logout',
        method: 'GET',
        headers: {
            Authorization: token_full()
        }
    })
}

export function checkPassword(old_password) {
    return request({
        url: url + 'checkPassword',
        method: 'POST',
        headers: {
            Authorization: token_full(),
        },
        data: {
            password: old_password
        }
    })
}

export function changePassword(old_password, new_password) {
    const data = {old_password, new_password}
    return request({
        url: url + 'changePassword',
        method: 'PUT',
        headers: {
            Authorization: token_full(),
        },
        data
    })
}

export function updateUserInfo(data) {
    return request({
        url: url + 'updateUserInfo',
        method: 'PUT',
        headers: {
            Authorization: token_full(),
        },
        data
    })
}
