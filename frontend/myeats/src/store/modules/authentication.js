/**
 * long description for the file
 *
 * @summary short description for the file
 * @author Zeppelin17 <elzeppelin17@gmail.com>
 *
 * Created at     : 2020-06-03 06:58:43 
 * Last modified  : 2020-06-07 18:06:34
 */

import { AUTH_REQUEST, AUTH_LOGOUT } from '../actionTypes'
import { AUTH_SUCCESS, AUTH_ERROR } from '../mutationTypes'
import authService from '../../services/authenticationService'

export const state = {
    token: localStorage.getItem('user-token') || '',
    status: '', // status of the API call (loading, success, error)
}

const getters = {
    isAuthenticated: state => !!state.token,
    authStatus: state => state.status,
}

export const actions = {
    // router redirect in login
    [AUTH_REQUEST]: ({commit, dispatch}, user) => {
        return new Promise((resolve, reject) => {
            commit(AUTH_REQUEST)
            authService.authRequest(user)
            .then(resp => {
                const token = resp.data.token
                localStorage.setItem('user-token', token)
                axios.defaults.headers.common['Authorization'] = 'Token ' + token //REVISAR QUE SEA CORRECTO

                commit(AUTH_SUCCESS, token)

                
                // dispatch(USER_REQUEST) // PONER EN.. ??
                resolve(resp)
            })
            .catch(err => {
                commit(AUTH_ERROR, err)
                localStorage.removeItem('user-token')
                reject(err)
            })
        })
    },

    [AUTH_LOGOUT]: () => {
        return new Promise((resolve) => {
            localStorage.removeItem('user-token')
            delete axios.defaults.headers.common['Authorization']
            resolve()
        })
    }
}

export const mutations = {
    [AUTH_REQUEST]: (state) => {
        state.status = 'loading'
    },

    [AUTH_SUCCESS]: (state, token) => {
        state.status = 'success'
        state.token = token
    },

    [AUTH_ERROR]: (state) => {
        state.status = 'error'
    }
}


export default {
    state,
    getters,
    actions,
    mutations
}