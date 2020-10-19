/**
 * Store module that handles weeks management
 *
 * @summary Store module that handles weeks management
 * @author Zeppelin17 <elzeppelin17@gmail.com>
 *
 * Created at     : 2020-09-02 19:04:30 
 * Last modified  : 2020-10-13 19:51:43
 */

import { CREATE_WEEK, GET_WEEKS, DELETE_WEEK, GET_WEEK_DAYS, PUT_WEEK, UPDATE_WEEK_DAY_SPLITS } from '../actionTypes'
import { WEEK_SET_STATUS_LOADING, WEEK_STATUS_SET_SUCCESS, WEEK_STATUS_SET_ERROR, WEEK_SET_LIST, WEEK_DELETE_FROM_LIST, WEEK_SET_DAYS, WEEK_SET_DAYS_LOADED } from '../mutationTypes'
import weekService from '../../services/weekService'
import recipeService from '../../services/recipeService'
import Vue from 'vue'

export const state = {
  weekStatus: '', // API call status
  weeks: [],
  days: [],
  daysLoaded: false
}


const getters = {
  weekStatus: state => state.weekStatus,
  weekList: state => state.weeks,
  dayList: state => state.days,
  daysLoaded: state => state.daysLoaded
}




export const actions = {
  [CREATE_WEEK]: ({commit}, week) => {
    return new Promise((resolve, reject) => {
      commit(WEEK_SET_STATUS_LOADING)
      weekService.createWeek(week)
      .then(async (resp) => {
        // create days of week
        const weekId = resp.data.id
        
        async function asyncCreateDays() {
          for (const day of week.days) {
            
            let newDay = {
              "name": day,
              "week": weekId
            }
            await weekService.createDay(newDay)
          }
        }
        
        
        await asyncCreateDays()

        return true
        
        
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
      commit(WEEK_SET_STATUS_LOADING)
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
      commit(WEEK_SET_STATUS_LOADING)
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
      commit(WEEK_SET_STATUS_LOADING)
      return weekService.getDays(weekId)
      .then((resp) => {
        let days = resp.data
        
        // get splits of each day
        async function updateDaysWithSplits() {
          for (const day of days) {
            Vue.set(day, "splits", [])
            let resp = await weekService.getSplits(day.id)
            for (const split of resp.data) {
              const recipes = []
              for (const recipeId of split.recipes) {
                let recipe = await recipeService.getRecipe(recipeId)
                recipes.push(recipe)
              }
              Vue.set(split, "recipes", recipes)
              day.splits.push(split)
            }

            Vue.set(day, "splits", day.splits.sort((a, b) => (a.order > b.order) ? 1 : -1))

          }
          commit(WEEK_SET_DAYS_LOADED)
        }

        updateDaysWithSplits()
        commit(WEEK_SET_DAYS, days)
        commit(WEEK_STATUS_SET_SUCCESS)
        resolve(days)
      })
    })
  },

  [PUT_WEEK]: ({commit}, week) => {
    return new Promise((resolve, reject) => {
      commit(WEEK_SET_STATUS_LOADING)
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
  },

  [UPDATE_WEEK_DAY_SPLITS]: ({commit}, {oldSplits, newSplits}) => {
    return new Promise((resolve, reject) => {
      // delete current day splits
      commit(WEEK_SET_STATUS_LOADING)
      return Promise.all(
        oldSplits.map(split => {
          async function asyncDeleteSplit(s) {
            return await weekService.deleteSplit(s.id)
          }
          return asyncDeleteSplit(split)
        })
        
      )
      .then((resp) => {
        // recreate day splits
        return Promise.all(
          newSplits.map(split => {
            async function asyncCreateSplit(s) {
              let newSplit = {
                name: s.name,
                order: s.order,
                day: s.day,
                recipes: s.recipes
              }
              return await weekService.createSplit(newSplit)
            }
            return asyncCreateSplit(split)
          })
          
        )
      })
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
  [WEEK_SET_STATUS_LOADING]: (state) => {
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
  },

  [WEEK_SET_DAYS_LOADED]: (state) => {
    state.daysLoaded = true
  }
}




export default {
  state,
  getters,
  actions,
  mutations
}