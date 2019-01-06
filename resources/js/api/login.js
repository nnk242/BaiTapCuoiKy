import request from '../utils/request'

export function login(username, password) {
    const data = {
        username, password
    }

    console.log( request({
        url: '/api/v1/login',
        method: 'POST',
        data
    }))
    return request({
        url: 'api/v1/login',
        method: 'POST',
        data
    })
}
