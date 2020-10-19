/**
 * Action types constants for Vuex
 *
 * @summary Action types constants for Vuex
 * @author Zeppelin17 <elzeppelin17@gmail.com>
 *
 * Created at     : 2020-05-28 06:30:05 
 * Last modified  : 2020-10-13 19:36:19
 */

// authentication
export const AUTH_REQUEST = "authRequest"
export const AUTH_LOGOUT = "authLogout"
export const AUTH_CREATE = "authCreate"

// recipes
export const GET_RECIPES = "getRecipes"
export const GET_RECIPE = "getRecipe"
export const DELETE_RECIPE = "deleteRecipe"
export const RECIPE_CREATE = "recipeCreate"
export const GET_CATEGORIES = "getCategories"
export const UPDATE_CATEGORIES = "updateCategories"
export const PUT_RECIPE = "putRecipe"

// weeks
export const CREATE_WEEK = "createWeek"
export const GET_WEEKS = "getWeeks"
export const DELETE_WEEK = "deleteWeek"
export const GET_WEEK_DAYS = "getWeekDays"
export const PUT_WEEK = "putWeek"
export const UPDATE_WEEK_DAY_SPLITS = "updateWeekDaySplits"