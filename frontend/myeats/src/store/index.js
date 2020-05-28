/**
 * Vuex store main file
 *
 * @summary Vuex store main file
 * @author Zeppelin17 <elzeppelin17@gmail.com>
 *
 * Created at     : 2020-04-29 17:24:45 
 * Last modified  : 2020-05-28 06:48:07
 */

import Vue from 'vue'
import Vuex from 'vuex'

import {TOGGLE_GENERAL_VIEW} from './actionTypes'
import {CHANGE_GENERAL_VIEW} from './mutationTypes'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {

  },
  state: {
    webView: true,
    appView: false
  },
  mutations: {

    [CHANGE_GENERAL_VIEW](currentState) {
      currentState.appView = !currentState.appView
      currentState.webView = !currentState.webView
    }

  },
  actions: {

    [TOGGLE_GENERAL_VIEW]({ commit }){
      commit(CHANGE_GENERAL_VIEW)
    }

  }
})
