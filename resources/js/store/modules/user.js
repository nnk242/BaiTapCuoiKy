import {getToken, setToken, destroyToken} from '../../utils/auth'
import {getUserInfo, login} from "../../api/login";

const user = {
    state: {
        user: '',
        name: '',
        avatar: '',
        status: '',
        access_token: getToken(),
        roles: [],
        expires_in: 0
    },
    mutations: {
        SET_TOKEN: (state, token) => {
            state.access_token = token
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
                        const token = token_type + ' ' + access_token
                        commit('SET_TOKEN', token)
                        setToken(token)
                        resolve()
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },
        getUserInfo({commit, state}) {
            return new Promise((resolve, reject) => {
                getUserInfo(state.access_token)
                    .then(response => {
                        if (!response.data) {
                            reject('Verification failed, please login again.')
                        } else {
                            console.log(456)
                        }
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },
        logout({commit, state}) {
            commit('SET_ROLES', [])
            commit('SET_TOKEN', '')
        }
    }
}

export default user
