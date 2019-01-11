import {asyncRouterMap, constantRouterMap} from '../../router'

/**
 *
 * meta.role
 * @param role
 * @param route
 */
function hasPermission(roles, route) {
    if (route.meta && route.meta.roles) {
        return roles.some(role => route.meta.roles.includes(role))
    } else {
        return true
    }
}

/**
 *
 * @param routes asyncRouterMap
 * @param role
 */
function filterAsyncRouter(routes, roles) {
    const res = []
    routes.forEach(route => {
        const tmp = {...route}
        if (hasPermission(roles, tmp)) {
            if (tmp.children) {
                tmp.children = filterAsyncRouter(tmp.children, roles)
            }
            res.push(tmp)
        }
    })

    return res
}

const permission = {
    state: {
        routers: constantRouterMap,
        addRouters: []
    },
    mutations: {
        SET_ROUTERS: (state, routers) => {
            state.addRouters = routers
            state.routers = constantRouterMap.concat(routers)
        }
    },
    actions: {
        GenerateRoutes({commit}, roles) {
            console.log(roles)
            //
            // return new Promise(resolve => {
            //     let accessedRouters
            //     if (roles.includes('admin')) {
            //         accessedRouters = asyncRouterMap
            //     } else {
            //         accessedRouters = filterAsyncRouter(asyncRouterMap, roles)
            //     }
            //     commit('SET_ROUTERS', accessedRouters)
            //     resolve()
            // })
        }
    }
}

export default permission
