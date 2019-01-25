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
