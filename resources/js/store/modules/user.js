import {getToken} from '../../utils/auth'
import {login} from "../../api/login";

const user = {
    state: {
        user: '',
        name: '',
        avatar: '',
        status: '',
        token: getToken(),
        roles: []
    },
    mutations: {
        SET_TOKEN: (state, token)=>{
            state.token = token
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
        SET_ROLEs: (state, roles) => {
            state.roles = roles
        }
    },
    actions: {
        login({commit}, userInfor) {
            const {username, password} = userInfor
            return new Promise((resolve, reject)=>{
                login(username, password)
                    .then(response => {
                        console.log('success api store')
                    }).catch(error=> {
                        console.log('error api store')
                })
            })
        }
    }
}

export default user
