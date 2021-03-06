import Cookies from 'js-cookie'

const token_key = 'access_token'
const token_type = 'token_type'

export function getToken() {
    return Cookies.get(token_key)
}

export function getTokenType() {
    return Cookies.get(token_type)
}

export function setToken(token) {
    return Cookies.set(token_key, token)
}

export function setTokenType(type) {
    return Cookies.set(token_type, type)
}

export function destroyToken() {
    return Cookies.remove(token_key)
    return Cookies.remove(token_type)
}
