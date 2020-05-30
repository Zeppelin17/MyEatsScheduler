/**
 * Vuex store main file
 *
 * @summary Vuex store main file
 * @author Zeppelin17 <elzeppelin17@gmail.com>
 *
 * Created at     : 2020-04-29 17:24:45 
 * Last modified  : 2020-05-30 06:51:52
 */

import Vue from 'vue'
import Vuex from 'vuex'

import {TOGGLE_GENERAL_VIEW} from './actionTypes'
import {SET_GENERAL_VIEW} from './mutationTypes'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {

  },
  state: {
    userInAppView: false
  },
  mutations: {

    [SET_GENERAL_VIEW](currentState, payload) {
      currentState.userInAppView = payload
    }

  },
  actions: {

    [TOGGLE_GENERAL_VIEW]({ commit }, payload) {
      commit(SET_GENERAL_VIEW, payload)
    }

  }
})
