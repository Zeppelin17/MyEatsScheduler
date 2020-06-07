/**
 * Routes configuration
 *
 * @summary Routes configuration
 * @author Zeppelin17 <elzeppelin17@gmail.com>
 *
 * Created at     : 2020-04-29 16:41:03 
 * Last modified  : 2020-06-07 18:22:03
 */

import Vue from 'vue'
import VueRouter from 'vue-router'
import { Trans } from '@/plugins/Translation'
import store from './store'


function load(component) {
  // '@' is aliased to src/components
  return () => import(`@/views/${component}.vue`)
}

function loadApp(component) {
  // '@' is aliased to src/components
  return () => import(`@/views/app/${component}.vue`)
}


Vue.use(VueRouter)


const ifAuthenticated = (to, from, next) => {
  if (store.getters.isAuthenticated) {
    next({name: 'Dashboard', params: {locale: to.params.locale}})
    return
  }
  next()
}



const appRoutes = [
  {
    path: '',
    name: 'Dashboard',
    meta: {requiresAuth: true},
    component: loadApp('Dashboard')
  },
]

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
        component: load('Login'),
        beforeEnter: ifAuthenticated
      },
      {
        path: 'app',
        component: {
          template: "<router-view></router-view>"
        },
        children: appRoutes
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

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // check if user is logged in, redirect to login page otherwise
    if (!store.getters.isAuthenticated) {
      next({name: 'Login', params: {locale: to.params.locale}})
    }else {
      next()
    }
  }else {
    next()
  }
})


export default router