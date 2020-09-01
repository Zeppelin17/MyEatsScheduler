/**
 * Store module that handles recipe management
 *
 * @summary short description for the file
 * @author Zeppelin17 <elzeppelin17@gmail.com>
 *
 * Created at     : 2020-08-07 06:33:21 
 * Last modified  : 2020-09-01 19:53:28
 */

import { RECIPE_CREATE, GET_CATEGORIES, UPDATE_CATEGORIES, GET_RECIPES, GET_RECIPE, DELETE_RECIPE, PUT_RECIPE } from '../actionTypes'
import { RECIPE_SET_LIST, SET_STATUS_LOADING, RECIPE_STATUS_SET_ERROR, RECIPE_STATUS_SET_SUCCESS, SET_CATEGORIES, RECIPE_DELETE_FROM_LIST } from '../mutationTypes'
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
    return new Promise((resolve) => {
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

  [GET_RECIPES]: ({ commit }) => {
    let recipes = []

    return new Promise((resolve) => {
      commit(SET_STATUS_LOADING)
      recipeService.getRecipes()
      .then((resp) => {
        // now we get ingredients
        recipes = resp.data
        return recipeService.getIngredients(recipes)
      })
      .then((ingredients) => { 
        recipes.map((recipe) => {
          recipe["ingredients"] = ingredients.filter((ing) => ing.recipe === recipe.id)
        })

        return recipeService.getCategories()
      })
      .then((resp) => {
        // get categories
        const categories = resp.data
        recipes.map((recipe) => {
          recipe.categories.forEach((recipeCat, index) => {
            recipe.categories[index] = categories.find((category) => category.id === recipeCat)
          })
        })

        // sort recipes from newer to older
        recipes = recipes.sort((a, b) => (a.id < b.id) ? 1 : -1)
        
        commit(RECIPE_STATUS_SET_SUCCESS)
        commit(RECIPE_SET_LIST, recipes)
        resolve(recipes)
      })
      .catch((err) => {
        console.log("ERROR", err)
      })
    })
  },

  [GET_RECIPE]: ({ commit }, id) => {
    let recipe = {}

    return new Promise((resolve) => {
      commit(SET_STATUS_LOADING)
      recipeService.getRecipe(id)
      .then((resp) => {
        recipe = resp
        return recipeService.getIngredients([recipe])
      })
      .then((ingredients) => {
        recipe.ingredients = ingredients
        commit(RECIPE_STATUS_SET_SUCCESS)
        resolve(recipe)
      })
      .catch(err => {
        commit(RECIPE_STATUS_SET_ERROR)
      })
    })

  },

  [DELETE_RECIPE]: ({commit}, id) => {
    return new Promise((resolve) => {
      recipeService.deleteRecipe(id)
      .then((resp) => {
        commit(RECIPE_DELETE_FROM_LIST, id)
        resolve(resp)
      })
    })
  },

  [PUT_RECIPE]: ({commit}, recipe) => {
    commit(SET_STATUS_LOADING)
    return new Promise((resolve) => {
      // recreate ingredients
      recipeService.deleteIngredients(recipe)
      .then(() => {
        const ingredientsToCreate = []
        recipe.ingredients.forEach((data) => {
          let ingredient = {
            name: data.name,
            quantity: data.qty,
            unit_of_measure: data.uom,
            recipe: recipe.id
          }
          
          ingredientsToCreate.push(ingredient)
        })
        
        // create ingredients
        return recipeService.createIngredients(ingredientsToCreate)
      })
      .then(() => {
        // update recipe
        return recipeService.putRecipe(recipe)
      })
      .then(() => {
        commit(RECIPE_STATUS_SET_SUCCESS)
        resolve(recipe)
      })
    })
  }
  
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
  },

  [RECIPE_SET_LIST]: (state, recipes) => {
    state.recipes = recipes
  },

  [RECIPE_DELETE_FROM_LIST]: (state, recipeId) => {
    state.recipes = state.recipes.filter((recipe) => recipe.id != recipeId)
  }
}




export default {
  state,
  getters,
  actions,
  mutations
}