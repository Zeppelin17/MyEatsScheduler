/**
 * API calls related to authentication within the app
 *
 * @summary API calls related to authentication within the app
 * @author Zeppelin17 <elzeppelin17@gmail.com>
 *
 * Created at     : 2020-06-04 06:43:23 
 * Last modified  : 2020-06-15 06:25:16
 */

import Vue from 'vue'
import { API_ENDPOINT, API_AUTH, API_CREATE_USER } from '@/appConfig'

export default {

    authRequest(user) {
        const url = API_ENDPOINT + API_AUTH

        return Vue.axios({method: 'post', url: url, data: user})
    },

    createAccount(user) {
        const url = API_ENDPOINT + API_CREATE_USER

        return Vue.axios({method: 'post', url: url, data: user})
    }
}