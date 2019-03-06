import request from '../utils/request'
import {token_full} from './TOKEN'

const url = 'api/menu/'

export function create(data) {
    return request({
        url: url,
        method: 'POST',
        headers: {
            Authorization: token_full()
        },
        data
    })
}

export function destroy(id) {
    return request({
        url: url + id,
        method: 'DELETE',
        headers: {
            Authorization: token_full()
        }
    })
}

export function restore(id) {
    return request({
        url: url + 'restore/' + id,
        method: 'POST',
        headers: {
            Authorization: token_full()
        }
    })
}

export function view(id) {
    return request({
        url: url + id,
        method: 'GET',
        headers: {
            Authorization: token_full()
        }
    })
}
