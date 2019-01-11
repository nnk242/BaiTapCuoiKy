import {getToken, getTokenType, getRoles, setToken, setTokenType, setRoles, destroyToken} from '../../utils/auth'
import {login} from "../../api/login";
import {getUserInfo, logout} from "../../api/auth";

const user = {
    state: {
        user: '',
        name: '',
        avatar: '',
        status: '',
        access_token: getToken(),
        token_type: getTokenType(),
        roles: [],
        expires_in: 0
    },
    mutations: {
        SET_TOKEN: (state, access_token) => {
            state.access_token = access_token
        },
        SET_TOKEN_TYPE: (state, toke_type) => {
            state.token_type = toke_type
        },
        SET_NAME: (state, name) => {
            state.name = name
        },
        SET_AVATAR: (state, avatar) => {
            state.avatar = avatar
        },
        SET_STATUS: (state, status) => {
            state.status = status
        },
        SET_ROLES: (state, roles) => {
            state.roles = roles
        },
        SET_EXPIRES: (state, expires) => {
            state.expires_in = expires
        }
    },
    actions: {
        login({commit}, userInfor) {
            const {username, password} = userInfor
            return new Promise((resolve, reject) => {
                login(username, password)
                    .then(response => {
                        const {access_token, token_type} = response.data
                        commit('SET_TOKEN', access_token)
                        commit('SET_TOKEN_TYPE', token_type)
                        setToken(access_token)
                        setTokenType(token_type)
                        resolve()
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },
        getUserInfo({commit, state}) {
            return new Promise((resolve, reject) => {
                const {token_type, access_token} = state
                getUserInfo((token_type + ' ' + access_token).trim())
                    .then(response => {
                        if (!response.data) {
                            reject('Verification failed, please login again.')
                        }

                        const {data} = response

                        let roles = new Array(data.role)

                        if(roles && roles.length) {
                            commit('SET_ROLES', roles)
                            console.log(typeof roles)

                        } else {
                            reject('getInfo: roles must be a non-null array!')
                        }
                        resolve(response)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },
        logout({commit, state}) {
            return new Promise((resolve, reject) => {
                logout()
                    .then(response => {
                        commit('SET_ROLES', [])
                        commit('SET_TOKEN', '')
                        commit('SET_TOKEN_TYPE', '')
                        destroyToken()
                        resolve(response)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },
        fedLogout({commit}) {
            return new Promise(resolve => {
                commit('SET_ROLES', [])
                destroyToken()
                resolve()
            })
        }
    }
}

export default user
