import error_404 from '../../../views/error/404'
import testView from '../../../views/test'

export default [
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
