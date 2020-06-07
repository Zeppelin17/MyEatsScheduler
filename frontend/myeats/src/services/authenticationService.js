/**
 * API calls related to authentication within the app
 *
 * @summary API calls related to authentication within the app
 * @author Zeppelin17 <elzeppelin17@gmail.com>
 *
 * Created at     : 2020-06-04 06:43:23 
 * Last modified  : 2020-06-07 15:58:44
 */

import Vue from 'vue'
import { API_ENDPOINT, API_AUTH } from '@/appConfig'

export default {

    authRequest(user) {
        
        const url = API_ENDPOINT + API_AUTH

        return Vue.axios({method: 'post', url: url, data: user})
    }
}