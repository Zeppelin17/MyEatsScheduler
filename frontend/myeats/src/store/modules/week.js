/**
 * Store module that handles weeks management
 *
 * @summary Store module that handles weeks management
 * @author Zeppelin17 <elzeppelin17@gmail.com>
 *
 * Created at     : 2020-09-02 19:04:30 
 * Last modified  : 2020-09-04 12:17:30
 */

import { CREATE_WEEK, GET_WEEKS, DELETE_WEEK } from '../actionTypes'
import { SET_STATUS_LOADING, WEEK_STATUS_SET_SUCCESS, WEEK_STATUS_SET_ERROR, WEEK_SET_LIST, WEEK_DELETE_FROM_LIST } from '../mutationTypes'
import weekService from '../../services/weekService'

export const state = {
  weekStatus: '', // API call status
  weeks: []
}


const getters = {
  weekStatus: state => state.weekStatus,
  weekList: state => state.weeks
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
            let newDay = {
              "name": day,
              "week": weekId
            }
            return weekService.createDay(newDay)
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
  }
}




export default {
  state,
  getters,
  actions,
  mutations
}