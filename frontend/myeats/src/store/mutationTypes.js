/**
 * Mutation types constants for Vuex
 *
 * @summary Mutation types constants for Vuex
 * @author Zeppelin17 <elzeppelin17@gmail.com>
 *
 * Created at     : 2020-05-28 06:33:27 
 * Last modified  : 2020-10-05 06:39:42
 */

export const SET_STATUS_LOADING = "setStatusLoading"

// authentication
export const AUTH_SUCCESS = "authSuccess"
export const AUTH_ERROR = "authError"
export const AUTH_SET_ERROR = "authSetError"

// recipes
export const RECIPE_SET_LIST = "recipeSetList"
export const RECIPE_STATUS_SET_ERROR = "recipeStatusSetError"
export const RECIPE_STATUS_SET_SUCCESS = "recipeStatusSetSuccess"
export const SET_CATEGORIES = "setCategories"
export const RECIPE_DELETE_FROM_LIST = "recipeDeleteFromList"

// weeks
export const WEEK_SET_STATUS_LOADING = "weekSetStatusLoading"
export const WEEK_STATUS_SET_SUCCESS = "weekSetStatusSuccess"
export const WEEK_STATUS_SET_ERROR = "weekSetStatusError"
export const WEEK_SET_LIST = "weekSetList"
export const WEEK_DELETE_FROM_LIST = "weekDeleteFromList"
export const WEEK_SET_DAYS = "weekSetDays"
export const WEEK_SET_DAYS_LOADED = "weekSetDaysLoaded"