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
