/**
 * Store module that handles weeks management
 *
 * @summary Store module that handles weeks management
 * @author Zeppelin17 <elzeppelin17@gmail.com>
 *
 * Created at     : 2020-09-02 19:04:30 
 * Last modified  : 2020-09-11 08:41:22
 */

import { CREATE_WEEK, GET_WEEKS, DELETE_WEEK, GET_WEEK_DAYS, PUT_WEEK } from '../actionTypes'
import { SET_STATUS_LOADING, WEEK_STATUS_SET_SUCCESS, WEEK_STATUS_SET_ERROR, WEEK_SET_LIST, WEEK_DELETE_FROM_LIST, WEEK_SET_DAYS } from '../mutationTypes'
import weekService from '../../services/weekService'

export const state = {
  weekStatus: '', // API call status
  weeks: [],
  days: []
}


const getters = {
  weekStatus: state => state.weekStatus,
  weekList: state => state.weeks,
  dayList: state => state.days
}




export const actions = {
  [CREATE_WEEK]: ({commit}, week) => {
    return new Promise((resolve, reject) => {
      commit(SET_STATUS_LOADING)
      weekService.createWeek(week)
      .then((resp) => {
        // create days of week
        const weekId = resp.data.id
        return Promise.all(
          week.days.map(day => {
            async function asyncCreateDay(day) {
              let newDay = {
                "name": day,
                "week": weekId
              }
              return await weekService.createDay(newDay)
            }
            asyncCreateDay(day)
          })
          
        )
      })
      .then(() => {
        commit(WEEK_STATUS_SET_SUCCESS)
        resolve(true)
      })
      .catch((err) => {
        console.log(err.response)
        
        commit(WEEK_STATUS_SET_ERROR)
        
        reject(err)
      })
    })
  },

  [GET_WEEKS]: ({commit}) => {
    return new Promise((resolve) => {
      commit(SET_STATUS_LOADING)
      weekService.getWeeks()
      .then((resp) => {
        let weeks = resp.data

        weeks = weeks.sort((a, b) => (a.id < b.id) ? 1 : -1)


        commit(WEEK_STATUS_SET_SUCCESS)
        commit(WEEK_SET_LIST, weeks)
        resolve(weeks)
      })
    })
  },

  [DELETE_WEEK]: ({commit}, weekId) => {
    return new Promise((resolve) => {
      commit(SET_STATUS_LOADING)
      weekService.deleteWeek(weekId)
      .then(() => {
        commit(WEEK_DELETE_FROM_LIST, weekId)
        commit(WEEK_STATUS_SET_SUCCESS)
        resolve(true)
      })
    })
  },

  [GET_WEEK_DAYS]: ({commit}, weekId) => {
    return new Promise((resolve) => {
      commit(SET_STATUS_LOADING)
      weekService.getDays(weekId)
      .then((resp) => {
        let days = resp.data

        // get splits of each day
        async function updateDaysWithSplits() {
          let updatedDays = []
          for (const day of days) {
            resp = await weekService.getSplits(day.id)
            day["splits"] = resp.data
          }
        }

        updateDaysWithSplits()
        commit(WEEK_STATUS_SET_SUCCESS)
        commit(WEEK_SET_DAYS, days)
        resolve(days)
      })
    })
  },

  [PUT_WEEK]: ({commit}, week) => {
    return new Promise((resolve, reject) => {
      commit(SET_STATUS_LOADING)
      weekService.putWeek(week)
      .then((resp) => {
        commit(WEEK_STATUS_SET_SUCCESS)
        resolve(resp)
      })
      .catch((err) => {
        console.log(err.response)
        
        commit(WEEK_STATUS_SET_ERROR)
        
        reject(err)
      })
    })
  }
}


export const mutations = {
  [SET_STATUS_LOADING]: (state) => {
    state.weekStatus = 'loading'
  },

  [WEEK_STATUS_SET_SUCCESS]: (state) => {
    state.weekStatus = 'success'
  },

  [WEEK_STATUS_SET_ERROR]: (state) => {
    state.weekStatus = 'error'
  },

  [WEEK_SET_LIST]: (state, weeks) => {
    state.weeks = weeks
  },

  [WEEK_DELETE_FROM_LIST]: (state, id) => {
    state.weeks = state.weeks.filter((week) => week.id != id)
  },

  [WEEK_SET_DAYS]: (state, days) => {
    state.days = days
  }
}




export default {
  state,
  getters,
  actions,
  mutations
}