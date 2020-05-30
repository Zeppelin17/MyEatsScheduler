/**
 * Routes configuration
 *
 * @summary Routes configuration
 * @author Zeppelin17 <elzeppelin17@gmail.com>
 *
 * Created at     : 2020-04-29 16:41:03 
 * Last modified  : 2020-05-30 08:54:12
 */

import Vue from 'vue'
import VueRouter from 'vue-router'
import { Trans } from '@/plugins/Translation'

function load(component) {
  // '@' is aliased to src/components
  return () => import(`@/views/${component}.vue`)
}

Vue.use(VueRouter)

const routes = [
  {
    path: '/:locale',
    component: {
      template: "<router-view></router-view>"
    },
    beforeEnter: Trans.routeMiddleware,
    children: [
      {
        path: '',
        name: 'Home',
        meta: {layout: 'website'},
        component: load('Home')
      },
      {
        path: 'about',
        name: 'About',
        meta: {layout: 'website'},
        component: load('About')
      },
      {
        path: 'login',
        name: 'Login',
        component: load('Login')
      },
      {
        path: '*',
        name: '404NotFound',
        meta: {layout: 'website'},
        component: load('404NotFound')
      }
    ]
  },
  {
    path: '',
    redirect() {
      return Trans.getUserSupportedLocale()
    }
  }
]


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
export default router