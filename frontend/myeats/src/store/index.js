/**
 * Vuex store main file
 *
 * @summary Vuex store main file
 * @author Zeppelin17 <elzeppelin17@gmail.com>
 *
 * Created at     : 2020-04-29 17:24:45 
 * Last modified  : 2020-06-04 06:27:17
 */

import Vue from 'vue'
import Vuex from 'vuex'
import authentication from './modules/authentication'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    authentication,
  },
  state: {
    
  },
  mutations: {


  },
  actions: {


  }
})
