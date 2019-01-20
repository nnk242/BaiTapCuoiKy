import Layout from '../../../views/backend/layout' //layout
import dashboardView from '../../../views/backend/dashboard'
import testView from '../../../views/test'
import {ROLE_ADMIN_STAFF, ROLE_ADMIN, ROLE_STAFF} from "../../roles";

export default [
    {
        path: '/admin/dashboard',
        component: Layout,
        redirect: '/admin/dashboard',
        children: [
            {
                path: '/admin/dashboard',
                component: dashboardView,
                name: 'dashboard',
                meta: {title: 'dashboard', icon: 'fas fa-tachometer-alt', noCache: true}
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
                meta: {title: 'test', icon: 'fas fa-tachometer-alt test', noCache: true, roles: ROLE_STAFF}
            }
        ]
    }
]
