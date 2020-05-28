/**
 * Main Vue-cli js file
 *
 * @summary Main Vue-cli js file
 * @author Zeppelin17 <elzeppelin17@gmail.com>
 *
 * Created at     : 2020-04-29 16:38:01 
 * Last modified  : 2020-05-28 06:25:15
 */

import Vue from 'vue'
import App from './App.vue'
import { i18n } from './i18n'
import router from './router'
import store from './store'
import { Trans } from './plugins/Translation'
import '@/assets/css/tailwind.css'

Vue.prototype.$i18nRoute = Trans.i18nRoute.bind(Trans)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
