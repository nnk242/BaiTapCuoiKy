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
import dashboardView from '../views/test'
import loginView from '../views/login/index'

export const routes = [
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
        hidden: true
    },
    {
        path: '/admin',
        component: Layout,
        redirect: '/admin/dashboard',
        children: [
            {
                path: '/admin/dashboard',
                component: dashboardView,
                name: 'dashboard'
            }
        ]
    }
]

const router = new VueRouter({mode: 'history', routes})

export default router
