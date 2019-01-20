import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

//all site show user
import page from './modules/fontend'
//login and redirect
import common from './modules/common'
//router hidden in sidebar
import hideSidebar from './modules/backend/hideSidebar'
//router show in sidebar
import showSidebar from './modules/backend/showSidebar'

export const constantRouterMap = [
    ...page,
    ...common
]

export default new VueRouter({mode: 'history', scrollBehavior: () => ({y: 0}), routes: constantRouterMap})

export const asyncRouterMap = [
    ...showSidebar,
    ...hideSidebar
]
