import Layout from '../../../views/backend/layout' //layout
import changePasswordView from '../../../views/backend/auth/changePassword'
import accountBEView from '../../../views/backend/auth/account'
//
import distributorAdd from '../../../views/backend/distributor/add'
import distributorView from '../../../views/backend/distributor/view'

import {ROLE_ADMIN_STAFF, ROLE_ALL} from "../../roles";

export default [
    {
        path: 'admin/account',
        component: Layout,
        meta: {
            roles: ROLE_ADMIN_STAFF // you can set roles in root nav
        },
        children: [
            {
                path: '/admin/account',
                component: accountBEView,
                name: 'accountbe',
                meta: {
                    roles: ROLE_ADMIN_STAFF,
                    noCache: true,
                    title: 'accountbe'
                }
            }
        ],
        hidden: true,
    },
    {
        path: 'admin/changePassword',
        component: Layout,
        meta: {
            roles: ROLE_ADMIN_STAFF
        },
        children: [
            {
                path: '/admin/changePassword',
                component: changePasswordView,
                name: 'changePassword',
                meta: {
                    roles: ROLE_ALL,
                    noCache: true,
                    title: 'changePassword'
                }
            }
        ],
        hidden: true,
    },

    {
        path: '/admin/distributo/addr',
        component: Layout,
        meta: {
            roles: ROLE_ADMIN_STAFF
        },
        children: [
            {
                path: '/admin/distributor/add',
                component: distributorAdd,
                name: 'distributorAdd',
                meta: {
                    roles: ROLE_ALL,
                    noCache: true,
                    title: 'distributorAdd'
                }
            },
            {
                path: '/admin/distributor/:id/view',
                component: distributorView,
                name: 'distributorView',
                meta: {
                    roles: ROLE_ALL,
                    noCache: true,
                    title: 'distributorAdd'
                }
            }
        ],
        hidden: true,
    }
]
