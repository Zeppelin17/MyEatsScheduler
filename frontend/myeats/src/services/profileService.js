/**
 * API calls related to profile management
 *
 * @summary API calls related to profile management
 * @author Zeppelin17 <elzeppelin17@gmail.com>
 *
 * Created at     : 2020-10-21 06:44:13
 * Last modified  : 2020-10-23 06:15:43
 */

import Vue from 'vue'
import { API_ENDPOINT, API_GET_USER, API_PATCH_USER } from '@/appConfig'


export default {
  // get user data
  getUser(userId) {
    const url = API_ENDPOINT + API_GET_USER + userId

    return Vue.axios({method: 'get', url: url})
  },

  // update user
  updateUser(userData) {
    const url = API_ENDPOINT + API_PATCH_USER + userData.id

    return Vue.axios({method: 'patch', url: url, data: userData}) 
  }


}