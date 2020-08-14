/**
 * Store module that handles recipe management
 *
 * @summary short description for the file
 * @author Zeppelin17 <elzeppelin17@gmail.com>
 *
 * Created at     : 2020-08-07 06:33:21 
 * Last modified  : 2020-08-14 16:36:04
 */

import { RECIPE_CREATE, GET_CATEGORIES, UPDATE_CATEGORIES } from '../actionTypes'
import { RECIPE_SET_LIST, SET_STATUS_LOADING, RECIPE_STATUS_SET_ERROR, RECIPE_STATUS_SET_SUCCESS, SET_CATEGORIES } from '../mutationTypes'
import recipeService from '../../services/recipeService'


export const state = {
  recipeStatus: '', // API call status
  recipes: [],
  categories: []
}


const getters = {
  recipeStatus: state => state.recipeStatus,
  recipeList: state => state.recipes,
  categoriesList: state => state.categories
}




export const actions = {
  [RECIPE_CREATE]: ({ commit }, recipe) => {
    return new Promise((resolve, reject) => {
      commit(SET_STATUS_LOADING)
      recipeService.create(recipe.newRecipe)
      .then((resp) => {
        const recipeId = resp.data.id
        const ingredientsToCreate = []
        recipe.ingredients.forEach((data) => {
          let ingredient = {
            name: data.name,
            quantity: data.qty,
            unit_of_measure: data.uom,
            recipe: recipeId
          }

          ingredientsToCreate.push(ingredient)
        })

        // create ingredients
        return recipeService.createIngredients(ingredientsToCreate)
        
      })
      .then((resp) => {
        commit(RECIPE_STATUS_SET_SUCCESS)
        resolve(resp)
      })
      .catch(err => {
        console.log(err.response)
        
        commit(RECIPE_STATUS_SET_ERROR)
        
        reject(err)
      })
    })
  },

  [GET_CATEGORIES]: ({ commit }) => {
    return new Promise((resolve, reject) => {
      recipeService.getCategories()
      .then((resp) => {
        const categoryList = resp.data
        commit(SET_CATEGORIES, categoryList)
        resolve(resp)
        
      })
      .catch(err => {
        console.log(err.response)
        
        commit(RECIPE_STATUS_SET_ERROR)
        
        reject(err)
      })
    })
  },

  [UPDATE_CATEGORIES]: ({ commit }, categories) => {
    return new Promise((resolve, reject) => {
      recipeService.updateCategories(categories)
      .then((resp) => {
        const categoryList = resp.data
        commit(SET_CATEGORIES, categoryList)
        resolve(categoryList)
      })
      .catch((err) => {
        console.log("[VUEX] ERROR", err)
      })
      
        
    })
  },
}




export const mutations = {
  [SET_STATUS_LOADING]: (state) => {
    state.recipeStatus = 'loading'
  },

  [RECIPE_STATUS_SET_ERROR]: (state) => {
    state.recipeStatus = 'error'
  },

  [RECIPE_STATUS_SET_SUCCESS]: (state) => {
    state.recipeStatus = 'success'
  },

  [SET_CATEGORIES]: (state, categoriesList) => {
    state.categories = categoriesList
  }
}




export default {
  state,
  getters,
  actions,
  mutations
}