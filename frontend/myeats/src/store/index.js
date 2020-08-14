/**
 * Vuex store main file
 *
 * @summary Vuex store main file
 * @author Zeppelin17 <elzeppelin17@gmail.com>
 *
 * Created at     : 2020-04-29 17:24:45 
 * Last modified  : 2020-08-08 18:55:05
 */

import Vue from 'vue'
import Vuex from 'vuex'
import authentication from './modules/authentication'
import recipe from './modules/recipe'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    authentication,
    recipe,
  },
  state: {
    
  },
  mutations: {


  },
  actions: {


  }
})
