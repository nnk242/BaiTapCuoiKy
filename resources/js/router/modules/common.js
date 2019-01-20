import Layout from '../../views/backend/layout' //layout
import loginView from '../../views/backend/login/index'
import redirect from '../../views/backend/redirect'

export default [
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
    }
]
