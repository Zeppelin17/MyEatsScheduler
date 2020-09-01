/**
 * API calls related to recipes management
 *
 * @summary API calls related to recipes management
 * @author Zeppelin17 <elzeppelin17@gmail.com>
 *
 * Created at     : 2020-08-07 06:20:45 
 * Last modified  : 2020-09-01 19:45:00
 */

import Vue from 'vue'
import { API_ENDPOINT, API_CREATE_RECIPE, API_GET_CATEGORIES, API_CREATE_CATEGORY, API_CREATE_INGREDIENT, API_GET_RECIPES, API_GET_INGREDIENTS, API_GET_RECIPE, API_GET_CATEGORY, API_DELETE_RECIPE, API_DELETE_INGREDIENT, API_PUT_RECIPE } from '@/appConfig'


export default {

  // create recipe
  create(recipe) {
    const url = API_ENDPOINT + API_CREATE_RECIPE

    return Vue.axios({method: 'post', url: url, data: recipe})
  },

  // get categories
  getCategories() {
    const url = API_ENDPOINT + API_GET_CATEGORIES

    return Vue.axios({method: 'get', url: url})
  },


  // update categories
  updateCategories(newCategories) {
    return new Promise((resolve) => {
    
      this.getCategories()
      .then((resp) => {
        // get current categories
        const categories = resp.data
        const myeats_user = localStorage.getItem("user-id")
        const categoriesToCreate = []
        newCategories.forEach(newCat => {
          let exists = categories.filter(cat => cat.name === newCat)
          if(exists.length === 0) {
            let catObj = {
              name: newCat,
              color: "#000000",
              myeats_user: myeats_user
            }
            categoriesToCreate.push(catObj)
          }
        })
        return categoriesToCreate
      })
      .then((categoriesToCreate) => {
        // update categories
        return Promise.all(
          categoriesToCreate.map(cat => {
            this.createCategory(cat)
          })
        )
      })
      .then(() => {
        // get categories again with updated results
        return this.getCategories()
      })
      .then((resp) => {
        resolve(resp)
      })
    })

  },

  // create category
  createCategory(cat) {
    const url = API_ENDPOINT + API_CREATE_CATEGORY

    return Vue.axios({method: 'post', url: url, data: cat})
  },

  
  // create ingredients
  createIngredients(ingredients) {
    const url = API_ENDPOINT + API_CREATE_INGREDIENT
    return Promise.all(
      ingredients.map((ingredient) => {
        Vue.axios({method: 'post', url: url, data: ingredient})
      })
    )
  },


  // get recipes
  getRecipes() {
    const url = API_ENDPOINT + API_GET_RECIPES

    return Vue.axios({method: 'get', url: url})
  },

  // get all ingredients
  getIngredients(recipes) {
    let url = ""
    let ingredients = []

    return Promise.all(
      recipes.map((recipe) => {
        url = API_ENDPOINT + API_GET_INGREDIENTS + '?recipeid=' + recipe.id
        return Vue.axios({method: 'get', url: url})
        .then((resp) => {
          resp.data.forEach((ing) => {
            ingredients.push(ing)
          })
        })
      })
    )
    .then(() => {
      return ingredients
    })
  },

  // get recipe
  getRecipe(id) {
    const url = API_ENDPOINT + API_GET_RECIPE + id + '/'
    let recipe = {}
    let categories = []

    return new Promise((resolve, reject) => {
      Vue.axios({method: 'get', url: url})
      .then((resp) => {
        recipe = resp.data
        return Promise.all(
          recipe.categories.map((catId) => {
            return this.getCategory(catId)
          })
        )
        
      })
      .then((resps) => {
        resps.forEach((resp) => {
          categories.push(resp.data)
        })

        recipe.categories = categories

        resolve(recipe)
      })
      .catch((err) => {
        reject(err)
      })
      
    })
  },

  // get category
  getCategory(id) {
    const url = API_ENDPOINT + API_GET_CATEGORY + id + '/'

    return Vue.axios({method: 'get', url: url})
  },

  // delete recipe
  deleteRecipe(id) {
    const url = API_ENDPOINT + API_DELETE_RECIPE + id + '/'

    return Vue.axios({method: 'delete', url: url})
  },

  // delete ingredient
  deleteIngredients(recipe) {
    return new Promise ((resolve) => {
      this.getIngredients([recipe])
      .then((ingredients) => {
        return Promise.all(
          ingredients.map((ingredient) => {
            let url = API_ENDPOINT + API_DELETE_INGREDIENT + ingredient.id + '/'

            return Vue.axios({method: 'delete', url: url})
          })
        )
      })
      .then((resps) => {
        resolve(resps)
      })
    })
  },

  putRecipe(recipe) {
    const url = API_ENDPOINT + API_PUT_RECIPE + recipe.id + '/'

    return Vue.axios({method: 'put', url: url, data: recipe})
  }

}

