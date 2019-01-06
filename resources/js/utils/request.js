import axios from 'axios'
import {Message} from 'element-ui'
import store from '../store'
import {getToken} from './auth'

const service = axios.create({
    baseURL: 'http://127.0.0.1:8000',
    timeout: 5000
})


service.interceptors.request.use(
    config => {
        if(store.getters.token) {
            config.headers['X-Token'] = getToken()
        }
        return config
    },
    error => {
        console.log(error + ' 1')
        Promise.reject(error)
    }
)

service.interceptors.response.use(
    response => response,
    error => {
        console.log('err: ' + error + ' 2')
        return Promise.reject(error)
    }
)


export default service

