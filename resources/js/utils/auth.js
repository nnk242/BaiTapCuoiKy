import Cookies from 'js-cookie'

const token_key = 'access_token'
const token_type = 'token_type'
const roles = 'roles'

export function getToken() {
    return Cookies.get(token_key)
}

export function getTokenType() {
    return Cookies.get(token_type)
}

export function setToken(token) {
    return Cookies.set(token_key, token)
}

export function destroyToken() {
    return Cookies.remove(token_key)
}

export function setTokenType(type) {
    return Cookies.set(token_type, type)
}
