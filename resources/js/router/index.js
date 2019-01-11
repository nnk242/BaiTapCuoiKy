import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

/** layout */

import Layout from '../views/layout/layout'

/** redirect */

import Path from '../views/redirect/index'

/**  admin */

import Admin from '../views/admin/index'

/**
 *
 *  page view
 *  there are views
 *  page color #fc9724
 *
 * */
import testView from '../views/test'
import dashboardView from '../views/dashboard'
import loginView from '../views/login/index'

export const constantRouterMap = [
    {
        path: '/redirect',
        component: Layout,
        hidden: true,
        children: [
            {
                path: '/redirect/:path*',
                component: Path
            }
        ]
    },
    {
        path: '/admin/login',
        component: loginView,
        hidden: true,
        name: 'login'
    },
    {
        path: '/admin',
        component: Layout,
        redirect: '/admin/dashboard',
        children: [
            {
                path: '/admin/dashboard',
                component: dashboardView,
                name: 'dashboard',
                meta: { title: 'dashboard', icon: 'fas fa-tachometer-alt', noCache: true }
            }
        ]
    }
]

export default new VueRouter({mode: 'history', scrollBehavior: () => ({ y: 0 }), routes: constantRouterMap})

export const asyncRouterMap = [
    {
        path: '/admin',
        component: Layout,
        children: [
            {
                path: '/admin/test',
                component: testView,
                name: 'test',
                meta: { title: 'test', icon: 'fas fa-tachometer-alt', noCache: true }
            }
        ]
    }
]
