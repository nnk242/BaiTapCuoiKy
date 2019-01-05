import Cookies from 'js-cookie'

const app = {
    state: {
        language: Cookies.get('language_app') || 'vi'
    },
    mutations: {
        SET_LANGUAGE:(state, language) => {
            state.language = language
            Cookies.set('language_app', language)
        }
    },
    actions: {
        setLanguage({commit},language) {
            commit("SET_LANGUAGE", language)
        }
    }
}

export default app
