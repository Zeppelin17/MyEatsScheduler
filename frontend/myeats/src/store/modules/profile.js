/**
 * Store module that handles profile management
 *
 * @summary Store module that handles profile management
 * @author Zeppelin17 <elzeppelin17@gmail.com>
 *
 * Created at     : 2020-10-21 06:42:24
 * Last modified  : 2020-10-23 06:22:59
 */

import { GET_USER_DATA, PATCH_USER_DATA } from '../actionTypes'
import { USER_SET_STATUS_LOADING, USER_SET_STATUS_SUCCESS, USER_SET_STATUS_ERROR, USER_SET_DATA, USER_UPDATE_NAME } from '../mutationTypes'
import profileService from '../../services/profileService'
import Vue from 'vue'

export const state = {
  profileStatus: '', // API call status
  user: {
    id: '',
    email: '',
    firstName: '',
    lastName: ''
  }
}


const getters = {
  profileStatus: state => state.profileStatus,
  profile: state => state.user
}




export const actions = {
  [GET_USER_DATA]: ({commit}, userId) => {
    return new Promise((resolve, reject) => {
      commit(USER_SET_STATUS_LOADING)
      profileService.getUser(userId)
      .then((resp) => {
        const data = resp.data
        commit(USER_SET_DATA, data)
        commit(USER_SET_STATUS_SUCCESS)
        resolve(resp.data)
      })
      .catch((error) => {
        commit(USER_SET_STATUS_ERROR)
        reject(error.response)
      }) 
    })
  },

  [PATCH_USER_DATA]: ({commit}, userData) => {
    return new Promise((resolve, reject) => {
      commit(USER_SET_STATUS_LOADING)
      profileService.updateUser(userData)
      .then(() => {
        commit(USER_UPDATE_NAME, userData)
        commit(USER_SET_STATUS_SUCCESS)
        resolve(true)
      })
      .catch((error) => {
        commit(USER_SET_STATUS_ERROR)
        reject(error.response.data)
      }) 
    })
  }
}


export const mutations = {
  [USER_SET_STATUS_LOADING]: (state) => {
    state.profileStatus = 'loading'
  },

  [USER_SET_STATUS_SUCCESS]: (state) => {
    state.profileStatus = 'success'
  },

  [USER_SET_STATUS_ERROR]: (state) => {
    state.profileStatus = 'error'
  },

  [USER_SET_DATA]: (state, data) => {
    Vue.set(state.user, "id", data.id)
    Vue.set(state.user, "email", data.email)
    Vue.set(state.user, "firstName", data.first_name)
    Vue.set(state.user, "lastName", data.last_name)
  },

  [USER_UPDATE_NAME]: (state, user) => {
    Vue.set(state.user, "firstName", user.first_name)
    Vue.set(state.user, "lastName", user.last_name)
  }
}




export default {
  state,
  getters,
  actions,
  mutations
}