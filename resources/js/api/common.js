import request from '../utils/request'
import {token_full} from "./TOKEN";

export function per() {
    return request({
        url: 'api/get/per',
        method: 'GET',
    })
}

export function kind() {
    return request({
        url: 'api/get/kind',
        method: 'GET',
    })
}

export function menu() {
    return request({
        url: 'api/menu',
        method: 'GET',
    })
}

export function getCart(products) {
    return request({
        url: 'api/get/cart',
        method: 'POST',
        data: {
            products
        }
    })
}
