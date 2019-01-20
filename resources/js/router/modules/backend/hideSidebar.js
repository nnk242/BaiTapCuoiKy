import Layout from '../../../views/backend/layout' //layout
import changePasswordView from '../../../views/backend/auth/changePassword'
import accountBEView from '../../../views/backend/auth/account'

import {ROLE_ADMIN_STAFF} from "../../roles";

export default [
    {
        path: 'admin/account',
        component: Layout,
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
        children: [
            {
                path: '/admin/changePassword',
                component: changePasswordView,
                name: 'changePassword',
                meta: {
                    roles: ROLE_ADMIN_STAFF,
                    noCache: true,
                    title: 'changePassword'
                }
            }
        ],
        hidden: true,
    }
]
