import {asyncRouterMap, constantRouterMap} from '../../router'

/**
 *
 * meta.role
 * @param role
 * @param route
 */
function hasPermission(role, route) {
    if (route.meta && route.meta.roles) {
        // console.log(route)
        return route.meta.roles.includes(role)
    } else {
        return true
    }
}

/**
 *
 * @param routes asyncRouterMap
 * @param role
 */
function filterAsyncRouter(routes, role) {
    console.log('filterAsyncRouter')
    const res = []
    routes.forEach(route => {
        const tmp = {...route}
        if (hasPermission(role, tmp)) {
            if (tmp.children) {
                tmp.children = filterAsyncRouter(tmp.children, role)
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
            if(typeof state.routers === "undefined")
                state.routers = constantRouterMap.concat(routers)
        }
    },
    actions: {
        GenerateRoutes({commit}, role) {
            // console.log(role)
            //
            return new Promise(resolve => {
                let accessedRouters
                if (role === 'admin') {
                    console.log('admin__')
                    accessedRouters = asyncRouterMap
                } else {
                    accessedRouters = filterAsyncRouter(asyncRouterMap, role)
                }
                commit('SET_ROUTERS', accessedRouters)
                resolve()
            })
        }
    }
}

export default permission
