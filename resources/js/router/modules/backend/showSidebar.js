import Layout from '../../../views/backend/layout' //layout
import dashboard from '../../../views/backend/dashboard'
import testView from '../../../views/test'
import distributorIndex from '../../../views/backend/distributor'
import distributorStopProviding from '../../../views/backend/distributor/stopProviding'
//role
import {ROLE_ADMIN_STAFF, ROLE_ADMIN, ROLE_STAFF} from "../../roles";

export default [
    {
        path: '/admin/dashboard',
        component: Layout,
        redirect: '/admin/dashboard',
        children: [
            {
                path: '/admin/dashboard',
                component: dashboard,
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
            roles: ROLE_ADMIN_STAFF // you can set roles in root nav
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
                meta: {title: 'staff', icon: 'fas fa-tachometer-alt', noCache: true, roles: ROLE_STAFF}
            }
        ]
    },
    {
        path: '/admin/distributor',
        component: Layout,
        // redirect: '/admin/distributor/active',
        alwaysShow: true, // will always show the root menu
        meta: {
            title: 'distributor',
            icon: 'fas fa-dolly-flatbed',
            roles: ROLE_ADMIN_STAFF // you can set roles in root nav
        },
        children: [
            {
                path: 'active',
                component: distributorIndex,
                name: 'DistributorActive',
                meta: {
                    title: 'distributorActive',
                    roles: ROLE_ADMIN_STAFF // or you can only set roles in sub nav
                }
            },
            {
                path: 'stopProviding',
                component: distributorStopProviding,
                name: 'DistributorStopProviding',
                meta: {
                    title: 'distributorStopProviding',
                    roles: ROLE_ADMIN // or you can only set roles in sub nav
                }
            }
        ]
    },
]
