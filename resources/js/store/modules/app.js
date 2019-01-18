import Cookies from 'js-cookie'
import {generateTitle} from '../../utils/i18n'

const app = {
    state: {
        language: Cookies.get('language_app') || 'vi',
        sidebar: {
            opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true,
            withoutAnimation: false
        },
        device: 'desktop',
        size: Cookies.get('size') || 'medium',
        title: Cookies.get('title')
    },
    mutations: {
        SET_LANGUAGE: (state, language) => {
            state.language = language
            Cookies.set('language_app', language)
        },
        TOGGLE_SIDEBAR: state => {
            state.sidebar.opened = !state.sidebar.opened
            state.sidebar.withoutAnimation = false
            if (state.sidebar.opened) {
                Cookies.set('sidebarStatus', 1)
            } else {
                Cookies.set('sidebarStatus', 0)
            }
        },
        CLOSE_SIDEBAR: (state, withoutAnimation) => {
            Cookies.set('sidebarStatus', 0)
            state.sidebar.opened = false
            state.sidebar.withoutAnimation = withoutAnimation
        },
        TOGGLE_DEVICE: (state, device) => {
            state.device = device
        },
        SET_SIZE: (state, size) => {
            state.size = size
            Cookies.set('size', size)
        },
        SET_TITLE: (state, title) => {
            state.title = title
            Cookies.set('title', title)
        }

    },
    actions: {
        setLanguage({commit}, language) {
            commit('SET_LANGUAGE', language)
        },
        toggleSideBar({commit}) {
            commit('TOGGLE_SIDEBAR')
        },
        closeSideBar({commit}, withoutAnimation) {
            commit('CLOSE_SIDEBAR', withoutAnimation)
        },
        toggleDevice({commit}, device) {
            commit('TOGGLE_DEVICE', device)
        },
        setSize({commit}, size) {
            commit('SET_SIZE', size)
        },
        setTitle({commit}, title) {
            // const value = generateTitle(title)
            commit('SET_TITLE', title)
        }
    }
}

export default app
