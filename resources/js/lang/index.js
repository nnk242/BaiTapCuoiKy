import Vue from 'vue'
import VueI18n from 'vue-i18n'
import Cookies from 'js-cookie'

import elementVilocale from 'element-ui/lib/locale/lang/vi'
import elementEnlocale from 'element-ui/lib/locale/lang/en'

import viLocale from './vi'
import enLocale from './en'


Vue.use(VueI18n)

const messages = {
    vi: {
        ...elementVilocale,
        ...viLocale
    },
    en: {
        ...elementEnlocale,
        ...enLocale
    }
}

const i18n = new VueI18n({
    locale: Cookies.get('language_app') || 'vi',
    messages
})

export default i18n
