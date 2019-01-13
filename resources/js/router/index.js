import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

/** layout */

import Layout from '../views/backend/layout/layout'

/** redirect */

import Path from '../views/backend/redirect/index'

/**  admin */

import Admin from '../views/backend/admin/index'

/**
 *
 *  page view
 *  there are views
 *  page color #fc9724
 *
 * */
import testView from '../views/test'
import dashboardView from '../views/backend/dashboard'
import loginView from '../views/backend/login/index'

export const constantRouterMap = [
    {
        path: '/admin/login',
        component: loginView,
        hidden: true,
        name: 'login'
    },
    {
        path: '/admin/dashboard',
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
        path: '/admin/test',
        component: Layout,
        // alwaysShow: true,
        children: [
            {
                path: '/admin/test',
                component: testView,
                name: 'test',
                meta: { title: 'test', icon: 'fas fa-tachometer-alt test', noCache: true, roles: ['editor']}
            }
        ]
    }
]
