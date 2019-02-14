import Layout from '../../../views/frontend/layout'
import error_404 from '../../../views/error/404'
import testView from '../../../views/test'

export default [
    {
        path: '/',
        component: Layout,
        children: [
            {
                path: '/',
                component: testView,
                name: 'fdhome'
            }
        ],
        hidden: true,
    },
    {
        path: '*',
        component: error_404,
        meta: {title: 'error404'}
    }
]
