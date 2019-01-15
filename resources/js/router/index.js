import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import Layout from '../views/backend/layout/layout' //layout
/** redirect */
import Path from '../views/backend/redirect/index'
/**  admin */
import changePasswordView from '../views/backend/auth/changePassword'

import error_404 from '../views/error/404'
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
import redirect from '../views/backend/redirect'

const ROLE_ALL = ['admin', 'staff']

const ROLE_ADMIN = ['admin']
const ROLE_ADMIN_STAFF = ['admin', 'staff']
const ROLE_STAFF = ['staff']

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
        name: 'login'
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
        component: error_404
    }
]

export default new VueRouter({mode: 'history', scrollBehavior: () => ({ y: 0 }), routes: constantRouterMap})

export const asyncRouterMap = [
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
    },
    {
        path: '/admin',
        component: Layout,
        // redirect: '/admin/test1',
        alwaysShow: true, // will always show the root menu
        meta: {
            title: 'test 123',
            icon: 'fas fa-tooth',
            roles: ['admin', 'staff'] // you can set roles in root nav
        },
        children: [
            {
                path: 'test1',
                component: testView,
                name: 'test1',
                meta: {
                    title: 'test1',
                    roles: ROLE_ADMIN_STAFF // or you can only set roles in sub nav
                }
            },
            {
                path: 'test2',
                component: testView,
                name: 'test2',
                meta: {
                    title: 'test2',
                    // if do not set roles, means: this page does not require permission
                    roles: ROLE_ADMIN
                }
            }
        ]
    },
    {
        path: '/admin/staff',
        component: Layout,
        // alwaysShow: true,
        children: [
            {
                path: '/admin/staff',
                component: testView,
                name: 'staff',
                meta: { title: 'test', icon: 'fas fa-tachometer-alt test', noCache: true, roles: ROLE_STAFF}
            }
        ]
    },
    {
        path: 'admin/changePassword',
        component: Layout,
        children: [
            {
                path: '/admin/changePassword',
                component: changePasswordView,
                name: 'changePassword',
                meta: {
                    roles: ROLE_ALL,
                    noCache: true,
                    title: 'Change password'
                }
            }
        ],
        hidden: true,
    }
]
