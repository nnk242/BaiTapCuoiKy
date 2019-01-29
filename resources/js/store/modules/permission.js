import {asyncRouterMap, constantRouterMap} from '../../router'

/**
 *
 * meta.roles
 * @param role
 * @param route
 */
function hasPermission(role, route) {
    if (route.meta && route.meta.roles) {
        return route.meta.roles.includes(role)
    }
}

/**
 *
 * @param routes
 * @param roles
 */
function filterAsyncRouter(routes, roles) {
    const res = []
    routes.forEach(route => {
        const tmp = {...route}
        if (hasPermission(roles[0], route)) {
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
        GenerateRoutes({commit}, role) {
            //
            return new Promise(resolve => {
                let accessedRouters
                if (role === 'admin') {
                    accessedRouters = asyncRouterMap
                } else {
                    let roles = []
                    roles.push(role)
                    accessedRouters = filterAsyncRouter(asyncRouterMap, roles)
                }
                commit('SET_ROUTERS', accessedRouters)
                resolve()
            })
        }
    }
}

export default permission
