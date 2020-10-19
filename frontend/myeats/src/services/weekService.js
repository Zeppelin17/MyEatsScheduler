/**
 * API calls related to weeks management
 *
 * @summary API calls related to weeks management
 * @author Zeppelin17 <elzeppelin17@gmail.com>
 *
 * Created at     : 2020-09-04 10:18:35 
 * Last modified  : 2020-10-07 06:48:52
 */

import Vue from 'vue'
import { API_ENDPOINT, API_CREATE_WEEK, API_CREATE_DAY, API_GET_WEEKS, API_DELETE_WEEK, API_GET_DAYS, API_GET_SPLITS, API_PUT_WEEK, API_CREATE_SPLIT, API_DELETE_SPLIT } from '@/appConfig'


export default {
  // create week
  createWeek(week) {
    const url = API_ENDPOINT + API_CREATE_WEEK

    return Vue.axios({method: 'post', url: url, data: week})
  },

  // create days for a week
  createDay(day) {
    const url = API_ENDPOINT + API_CREATE_DAY

    return Vue.axios({method: 'post', url: url, data: day})
  },

  // get weeks
  getWeeks() {
    const url = API_ENDPOINT + API_GET_WEEKS

    return Vue.axios({method: 'get', url: url})
  },

  // delete week
  deleteWeek(id) {
    const url = API_ENDPOINT + API_DELETE_WEEK + id + '/'

    return Vue.axios({method: 'delete', url: url})
  },

  // get days
  getDays(weekId) {
    const url = API_ENDPOINT + API_GET_DAYS + '?weekid=' + weekId

    return Vue.axios({method: 'get', url: url})
  },

  // get splits
  getSplits(dayId) {
    const url = API_ENDPOINT + API_GET_SPLITS + '?dayid=' + dayId

    return Vue.axios({method: 'get', url: url})
  },

  // update week
  putWeek(week) {
    const url = API_ENDPOINT + API_PUT_WEEK + week.id + '/'

    return Vue.axios({method: 'put', url: url, data: week})
  },

  // delete split
  deleteSplit(id) {
    const url = API_ENDPOINT + API_DELETE_SPLIT + id + '/'

    return Vue.axios({method: 'delete', url: url})
  },

  // create split
  createSplit(split) {
    const url = API_ENDPOINT + API_CREATE_SPLIT

    return Vue.axios({method: 'post', url: url, data: split})
  },


}