import store from '../store'

export function token_type() {
    return (store.getters.token_type).trim()
}

export function TOKEN() {
    return (store.getters.token).trim()
}

export function token_full() {
    return (store.getters.token_type).trim() + ' ' + (store.getters.token).trim()
}
