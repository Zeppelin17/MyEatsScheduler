/**
 * Vuex store main file
 *
 * @summary Vuex store main file
 * @author Zeppelin17 <elzeppelin17@gmail.com>
 *
 * Created at     : 2020-04-29 17:24:45 
 * Last modified  : 2020-10-22 06:42:19
 */

import Vue from 'vue'
import Vuex from 'vuex'
import authentication from './modules/authentication'
import recipe from './modules/recipe'
import week from './modules/week'
import profile from './modules/profile'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    authentication,
    recipe,
    week,
    profile,
  },
  state: {
    
  },
  mutations: {


  },
  actions: {


  }
})
