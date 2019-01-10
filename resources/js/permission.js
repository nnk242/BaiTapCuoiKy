import router from './router'
import store from './store'
import {Message} from 'element-ui'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import {getToken} from './utils/auth'

NProgress.configure({showSpinner: false})


//has permission
function hasPermission(roles, permissionRoles) {
    if (roles.indexOf('admin') >= 0) {
        return true //permission pass
    }
    if (!permissionRoles) {
        return true
    }

    return roles.some(role => permissionRoles.indexOf(role) >= 0)
}

const whileList = ['admin/login']

router.beforeEach((to, from, next) => {
    NProgress.start() //start nprogress
    if (getToken()) {
        if (to.path === '/admin/login') {
            next({name: 'dashboard'})
            NProgress.done() //so manually handle it
        } else {
            if (typeof store.getters.roles === 'undefined') {
                store.dispatch('getUserInfo')
                    .then(response => {
                        console.log('get user info success')
                        console.log(response)
                    })
                    .catch(error=> {
                        store.dispatch('logout')
                    })
            } else {

            }
        }
    }
})


router.afterEach(() => {
    NProgress.done() // finish progress bar
})
