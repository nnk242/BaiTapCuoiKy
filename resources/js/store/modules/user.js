import {getToken, getTokenType, setToken, setTokenType,destroyToken} from '../../utils/auth'
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
        role: '',
        expires_in: 0
    },
    mutations: {
        SET_TOKEN: (state, access_token) => {
            state.access_token = access_token
        },
        SET_TOKEN_TYPE: (state, toke_type) => {
            state.token_type = toke_type
        },
        SET_ROLE: (state, role) => {
            state.role = role
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
                        console.log(access_token)
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
                        const {data} = response
                        if (!data) {
                            reject('Verification failed, please login again.')
                        }
                        if(typeof data.role !== 'undefined') {
                            commit('SET_ROLE', data.role)

                        } else {
                            reject('getInfo: roles must be a non-null array!')
                        }
                        console.log(data)
                        commit('SET_AVATAR', data.avatar)
                        resolve(response)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },
        logout({commit, state}) {
            return new Promise((resolve, reject) => {
                let access_token_full =  getTokenType() +' ' + getToken();
                if (access_token_full = '') {
                    commit('SET_ROLE', '')
                    commit('SET_TOKEN', '')
                    commit('SET_TOKEN_TYPE', '')
                    destroyToken()
                    resolve('Logout success')
                } else
                logout(access_token_full)
                    .then(response => {
                        commit('SET_ROLE', '')
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
                commit('SET_ROLE', '')
                destroyToken()
                resolve()
            })
        }
    }
}

export default user
