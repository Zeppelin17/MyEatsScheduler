/**
 * Translations plugin
 * All documentation in: https://lokalise.com/blog/vue-i18n
 *
 * @summary Translations plugin
 * @author Zeppelin17 <elzeppelin17@gmail.com>
 *
 * Created at     : 2020-04-29 16:40:08 
 * Last modified  : 2020-06-07 17:31:50
 */

import axios from 'axios'
import { i18n } from '../i18n'

const Trans = {
    get defaultLocale() {
        return process.env.VUE_APP_I18N_LOCALE
    },
    get supportedLocale() {
        return process.env.VUE_APP_I18N_SUPPORTED_LOCALE.split(",")
    },
    get currentLocale() {
        return i18n.locale
    },
    set currentLocale(locale) {
        i18n.locale = locale
    },

    isLocaleSupported(locale) {
        return Trans.supportedLocale.includes(locale)
    },

    loadLocaleFile(locale) {
        return import(`@/locales/${locale}.json`)
    },

    setI18nLocaleInServices(locale) {
        Trans.currentLocale = locale
        axios.defaults.headers.common['Accept-Language'] = locale
        document.querySelector('html').setAttribute('lang', locale)
        return locale
    },

    changeLocale(locale) {
        if(!Trans.isLocaleSupported(locale)) return Promise.reject(new Error('Locale not supported'))

        if(i18n.locale === locale) return Promise.resolve(locale)

        return Trans.loadLocaleFile(locale).then(msgs => {
            i18n.setLocaleMessage(locale, msgs.default || msgs)
            return Trans.setI18nLocaleInServices(locale)
        })
    },

    routeMiddleware(to, from, next) {
        const locale = to.params.locale
        if(!Trans.isLocaleSupported(locale)) return next(Trans.getUserSupportedLocale())

        return Trans.changeLocale(locale).then(() => next())
    },

    i18nRoute(to) {
        return {
            ...to,
            params: {locale: this.currentLocale, ...to.params}
        }
    },

    getUserLocale() {
        const locale = window.navigator.language || window.navigator.userLanguage || Trans.defaultLocale

        return {
            locale: locale,
            localeNoISO: locale.split('-')[0]
        }
    },

    getUserSupportedLocale() {
        const userPreferredLocale = Trans.getUserLocale()
    
        if (Trans.isLocaleSupported(userPreferredLocale.locale)) {
            return userPreferredLocale.locale
        }
    
        if (Trans.isLocaleSupported(userPreferredLocale.localeNoISO)) {
            return userPreferredLocale.localeNoISO
        }
    
        return Trans.defaultLocale
    }
}


export { Trans }