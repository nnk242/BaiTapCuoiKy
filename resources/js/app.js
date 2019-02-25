import Vue from 'vue'

import router from './router'

import Cookies from 'js-cookie'

import Element from 'element-ui'

import 'element-ui/lib/theme-chalk/index.css'

import './permission'

import App from './components/App'

import i18n from './lang'

import store from './store'

import '../sass/index.scss'

import VueMaterial from './components/vue-material'
import './components/vue-material/dist/vue-material.min.css'
import './components/vue-material/dist/theme/custom.css'
Vue.use(VueMaterial)

Vue.use(Element, {
    size: Cookies.get('size') || 'medium',
    i18n: (key, value) => i18n.t(key, value)
})

const app = new Vue({
    el: '#h',
    router,
    store,
    i18n,
    render: h=>h(App)
});
