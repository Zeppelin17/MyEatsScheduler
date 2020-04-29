/**
 * Main js config file for Translations
 *
 * @summary Main js config file for Translations
 * @author Zeppelin17 <elzeppelin17@gmail.com>
 *
 * Created at     : 2020-04-29 16:39:31 
 * Last modified  : 2020-04-29 16:40:01
 */

import Vue from 'vue'
import VueI18n from 'vue-i18n'
import en from '@/locales/en.json'

Vue.use(VueI18n)

export const i18n = new VueI18n({
  locale: process.env.VUE_APP_I18N_LOCALE || 'en',
  fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || 'en',
  messages: { en }
})
