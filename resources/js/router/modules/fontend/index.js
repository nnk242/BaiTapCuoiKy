import Layout from '../../../views/frontend/layout'
import error_404 from '../../../views/error/404'
import home from '../../../views/frontend/home'
import cart from '../../../views/frontend/cart'

export default [
    {
        path: '/',
        component: Layout,
        children: [
            {
                path: '/',
                component: home,
                name: 'fdhome'
            },{
                path: '/cart',
                component: cart,
                name: 'fcart'
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
