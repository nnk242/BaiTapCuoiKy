import router from './router'
import store from './store'
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

const path = window.location.origin + '/admin/login?redirect=' +
    charactersProtocolToCodeHex(window.location.pathname) + charactersProtocolToCodeHex(window.location.search)

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
                    .catch(() => {
                        store.dispatch('fedLogout')
                            .then(() => {
                                if (to.meta.roles)
                                    window.location.href = path
                                else
                                    next()
                            })
                    })
            } else {
                if (hasPermission(store.getters.role, to.meta.roles)) {
                    store.dispatch('getUserInfo')
                        .then(() => {
                            next()
                        })
                        .catch(() => {
                            store.dispatch('fedLogout')
                                .then(() => {
                                    window.location.href = path
                                })
                        })
                    next()
                } else {
                    console.log('401')
                    next()
                }
            }
        }
    } else {
        next()
    }
})


router.afterEach((to, from) => {
    store.dispatch('setTitle', to.meta.title)
    document.title = store.getters.title
    NProgress.done() // finish progress bar
})
