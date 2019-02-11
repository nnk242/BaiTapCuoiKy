import request from '../utils/request'
import {token_full} from './TOKEN'

const url = 'api/distributor/'

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
