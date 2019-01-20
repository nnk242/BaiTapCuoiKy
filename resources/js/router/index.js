import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
//router hidden in sidebar
import hide from './modules/backend/hideSidebar'
//router show in sidebar
import show from './modules/backend/showSidebar'

import Layout from '../views/backend/layout' //layout

import error_404 from '../views/error/404'

import testView from '../views/test'
import loginView from '../views/backend/login/index'
import redirect from '../views/backend/redirect'

export const constantRouterMap = [
    {
        path: '/admin/redirect',
        component: Layout,
        hidden: true,
        children: [
            {
                path: '/admin/redirect/:path*',
                component: redirect
            }
        ]
    },
    {
        path: '/admin/login',
        component: loginView,
        hidden: true,
        name: 'login',
        meta: {title: 'loginbe'}
    },
    //
    {
        path: '/',
        component: testView,
        hidden: true,
        name: 'fdhome'
    },
    {
        path: '*',
        component: error_404,
        meta: {title: 'error404'}
    }
]

export default new VueRouter({mode: 'history', scrollBehavior: () => ({y: 0}), routes: constantRouterMap})

export const asyncRouterMap = [
    ...show,
    ...hide
]
