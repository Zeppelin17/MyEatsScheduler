/**
 * Store module that handles authentication logic
 * help post: https://blog.sqreen.com/authentication-best-practices-vue/
 *
 * @summary Store module that handles authentication logic
 * @author Zeppelin17 <elzeppelin17@gmail.com>
 *
 * Created at     : 2020-06-03 06:58:43 
 * Last modified  : 2020-08-08 18:21:58
 */

import { AUTH_REQUEST, AUTH_LOGOUT, AUTH_CREATE } from '../actionTypes'
import { AUTH_SUCCESS, AUTH_ERROR, AUTH_SET_ERROR } from '../mutationTypes'
import authService from '../../services/authenticationService'
import axios from 'axios'


const errorKeys = {
    serverError: "serverError",
    passLength: "passLength",
    emailExist: "emailExist"
}


export const state = {
    token: localStorage.getItem('user-token') || '',
    userId: localStorage.getItem('user-id') || '',
    status: '', // status of the API call (loading, success, error)
    errorKey: ''
}

const getters = {
    isAuthenticated: state => !!state.token,
    userId: state => state.userId,
    authStatus: state => state.status,
    authErrorKey: state => state.errorKey,
}

export const actions = {
    [AUTH_REQUEST]: ({commit}, user) => {
        return new Promise((resolve, reject) => {
            commit(AUTH_REQUEST)
            authService.authRequest(user)
            .then(resp => {
                const token = resp.data.token
                const userId = resp.data.user_id
                localStorage.setItem('user-token', token)
                localStorage.setItem('user-id', userId)
                axios.defaults.headers.common['Authorization'] = 'Token ' + token 

                commit(AUTH_SUCCESS, token, userId)
                resolve(resp)
            })
            .catch(err => {
                console.log(err.response)
                
                commit(AUTH_ERROR, err)
                localStorage.removeItem('user-token')
                localStorage.removeItem('user-id')
                reject(err)
            })
        })
    },

    [AUTH_LOGOUT]: ({commit}) => {
        return new Promise((resolve) => {
            localStorage.removeItem('user-token')
            localStorage.removeItem('user-id')
            delete axios.defaults.headers.common['Authorization']
            commit(AUTH_LOGOUT)
            resolve()
        })
    },

    [AUTH_CREATE]: ({commit, dispatch}, user) => {
        return new Promise((resolve, reject) => {
            commit(AUTH_REQUEST)
            authService.createAccount(user)
            .then(resp => {
                localStorage.removeItem('user-token')
                localStorage.removeItem('user-id')
                
                // dispatch user login
                const credentials = {
                    username: user.email, 
                    password: user.password
                }

                dispatch(AUTH_REQUEST, credentials)
                .then(() => {
                    resolve(resp)
                }) 
                
            })
            .catch(err => {
                console.log(err.response)
                
                commit(AUTH_ERROR, err)
                if (err.response.data.hasOwnProperty("password")) {
                    commit(AUTH_SET_ERROR, errorKeys.passLength)
                }

                if (err.response.data.hasOwnProperty("email")) {
                    commit(AUTH_SET_ERROR, errorKeys.emailExist)
                }

                if (err.response.status >= 500) {
                    commit(AUTH_SET_ERROR, errorKeys.serverError)
                }
                reject(err)
            })
        })
    }
}




export const mutations = {
    [AUTH_REQUEST]: (state) => {
        state.status = 'loading'
    },

    [AUTH_SUCCESS]: (state, token, userId) => {
        state.status = 'success'
        state.token = token
        state.userId = userId
    },

    [AUTH_ERROR]: (state) => {
        state.status = 'error'
    },

    [AUTH_LOGOUT]: (state) => {
        state.token = ''
    },

    [AUTH_SET_ERROR]: (state, error) => {
        state.errorKey = error
    }
}


export default {
    state,
    getters,
    actions,
    mutations
}