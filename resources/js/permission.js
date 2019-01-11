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
            next({path: '/admin/dashboard'})
            NProgress.done()
        } else {
            if (typeof store.getters.role === 'undefined') {
                store.dispatch('getUserInfo')
                    .then(response => {
                        let roles = []
                        roles.push(response.data.role)
                        store.dispatch('GenerateRoutes', roles)
                            .then(response => {
                                // router.addRoutes()

                                // console.log(router)
                                                    // console.log(store.getters.addRouters)
                                // router.addRoutes(store.getters.addRouters)
                                //                     console.log(store.getters.addRouters)
                                next()
                            })
                    })
                    .catch((error) => {
                        store.dispatch('fedLogout')
                            .then(() => {
                                Message.error(error)
                                next({path: '/admin/login'})
                            })
                            .catch((error) => {
                                console.log('logout error')
                            })
                    })
            }

        }
    } else {
        next()
    }
})


router.afterEach(() => {
    NProgress.done() // finish progress bar
})
