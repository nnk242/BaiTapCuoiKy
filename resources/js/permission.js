import router from './router'
import store from './store'
import {Message} from 'element-ui'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import {getToken} from './utils/auth'
import {charactersProtocolToCodeHex} from './utils'

NProgress.configure({showSpinner: false})

//has permission
function hasPermission(role, permissionRoles) {
    let roles = ['admin', 'member', 'staff']
    if (roles.includes(role)) {
        return true //permission pass
    }
    if (!permissionRoles) {
        return true
    }

    return roles.some(role => permissionRoles.indexOf(role) >= 0)
}

// const whileList = ['/admin/login']

router.beforeEach((to, from, next) => {
    NProgress.start() //start nprogress
    if (getToken()) {
        if (to.path === '/admin/login') {
            next({path: '/admin/dashboard'})
            NProgress.done()
        } else {
            if (store.getters.role === "") {
                store.dispatch('getUserInfo')
                    .then(response => {
                        store.dispatch('GenerateRoutes', response.data.role)
                            .then(() => {
                                router.addRoutes(store.getters.addRouters)
                                next({...to, replace: true})
                            })
                    })
                    .catch((error) => {
                        store.dispatch('fedLogout')
                            .then(() => {
                                Message.error(error)
                                this.router.replace({
                                    path: '/admin/login?redirect=' +
                                        charactersProtocolToCodeHex(window.location.pathname) + charactersProtocolToCodeHex(window.location.search)
                                })
                            })
                    })
            } else {
                if (hasPermission(store.getters.role, to.meta.roles)) {
                    next()
                } else {
                    console.log('401')
                    next()
                }
            }
        }
    } else {
        // if (whileList.indexOf(to.path) !== -1) {
        //     next()
        // } else {
        //     next(`/admin/login?redirect=${to.path}`)
        //     NProgress.done()
        // }
        next()
    }
})


router.afterEach(() => {
    NProgress.done() // finish progress bar
})
