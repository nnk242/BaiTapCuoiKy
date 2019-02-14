import error_404 from '../../../views/error/404'
import index from '../../../views/frontend/layout/index'

export default [
    {
        path: '/',
        component: index,
        hidden: true,
        name: 'fdhome'
    },
    {
        path: '*',
        component: error_404,
        meta: {title: 'error404'}
    }
]
