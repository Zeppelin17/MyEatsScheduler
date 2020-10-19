<script>
/**
 * Configurare day form component
 *
 * @summary Configurare day form component
 * @author Zeppelin17 <elzeppelin17@gmail.com>
 *
 * Created at     : 2020-09-14 06:27:04 
 * Last modified  : 2020-10-17 06:38:47
 */
</script>
<template>
  <div class="configure-day-form">
    <div class="form-wrapper">
      <div v-if="validationMsg !== ''" id="validation-msg">
        <span class="close" @click="resetValidationMsg()">x</span>
        <span>{{ validationMsg }}</span>
      </div>

      <form>
        <div class="form-col">
          <div v-if="daySplits.length > 0" class="col-title-btn">
            <h3>{{ $t("appPages.myeats.weekDetail.splitsFormTitle") }}</h3>
            <button
              @click="addMoreSplits"
              type="button"
              class="btn-small"
            >
              {{ $t("appPages.myeats.weekDetail.newSplitShowForm") }}
            </button>
          </div>
          
          <h3 v-if="daySplits.length === 0">{{ $t("appPages.myeats.weekDetail.noSplitsFormTitle") }}</h3>
          
          <div class="form-group">
            <div class="splits-list">
              
              <div v-show="showSplitInput || daySplits.length === 0" class="add-split-input">
                <label for="split-name-input">
                  <span>{{ $t("appPages.myeats.weekDetail.inputSplitName") }}</span>
                  <input
                    v-model="splitName"
                    name="split-name-input"
                    type="text"
                    @keydown.enter.prevent="addSplit"
                  />
                </label>

                <button
                  @click="addSplit"
                  type="button"
                  class="new-split btn-small"
                >
                  {{ $t("appPages.myeats.weekDetail.newSplit") }}
                </button>
              </div>

              <div class="splits">
                <div
                  v-for="split in daySplits"
                  :key="split.order+'split-definition'"
                  class="split"
                  @mouseover="showSplitActionsButtons(split)"
                  @mouseout="hideSplitActionsButtons()"
                >
                  <span v-if="editingSplit !== split.order">{{ split.name }}</span>
                  
                  <label v-if="editingSplit === split.order" for="edit-split-input">
                    <span>{{ $t("appPages.myeats.weekDetail.inputEditSplitName") }}</span>
                    <input
                      v-model="split.name"
                      name="edit-split-input"
                      type="text"
                      @keydown.enter.prevent="saveSplit"
                    />
                  </label>

                  <span v-show="(showSplitActions && activeSplit === split.order) || editingSplit === split.order" class="split-actions">
                    <button
                      v-if="editingSplit !== split.order"
                      class="btn-small btn-split update-order"
                      type="button"
                      @click="orderUpSplit(split)">
                      <img :src="require('../../assets/img/ikonate/arrow-up.svg')" class="t-all-ease" >
                    </button>

                    <button
                      v-if="editingSplit !== split.order"
                      class="btn-small btn-split update-order"
                      type="button"
                      @click="orderDownSplit(split)">
                      <img :src="require('../../assets/img/ikonate/arrow-down.svg')" class="t-all-ease" >
                    </button>
                    
                    <button 
                      v-if="editingSplit !== split.order"
                      class="btn-small btn-split edit-split"
                      type="button"
                      @click="editSplit(split)"
                    >
                      {{ $t("appPages.myeats.weekDetail.editSplit") }}
                    </button>
                    
                    <button 
                      v-if="editingSplit !== split.order"
                      class="btn-small btn-split delete-split"
                      type="button"
                      @click="deleteSplit(split)"
                    >
                      {{ $t("appPages.myeats.weekDetail.deleteSplit") }}
                    </button>

                    <button 
                      v-if="editingSplit === split.order"
                      class="btn-small btn-split save-split"
                      type="button"
                      @click="saveSplit"
                    >
                      {{ $t("appPages.myeats.weekDetail.saveSplit") }}
                    </button>
                  </span>
                </div>
              </div>  

            </div>
          </div>
            
        </div>

        <div class="form-col">
          <div v-if="daySplits.length > 0" class="col-title-btn">
            <h3>{{ $t("appPages.myeats.weekDetail.recipeFormTitle") }}</h3>
            <button
              @click="linkNewRecipe"
              type="button"
              class="btn-small"
            >
              {{ $t("appPages.myeats.weekDetail.linkRecipeShowForm") }}
            </button>
          </div>
          
          <h3 v-if="daySplits.length === 0">{{ $t("appPages.myeats.weekDetail.recipeFormTitle") }}</h3>



          <div v-if="showRecipeInputs" class="form-group add-recipe-inputs">
            <label for="recipe-cat-select">
              <span>{{ $t("appPages.myeats.weekDetail.inputLinkRecipeCatName") }}</span>
              <select
                v-model="searchCatId"
                name="recipe-cat-select"
              >
                <option 
                  v-for="cat in categoriesList"
                  :key="cat.id+'cat-list'"
                  :value="cat.id"
                >
                  {{ cat.name }}
                </option>
              </select>
              
            </label>

            <label for="recipe-select">
              <span>{{ $t("appPages.myeats.weekDetail.inputLinkRecipeName") }}</span>
              
              <select
                v-model="selectedRecipe"
                name="recipe-select"
              >
                <option 
                  v-for="recipe in filteredRecipes"
                  :key="recipe.id+'recipe-select'"
                  :value="recipe.id"
                >
                  {{ recipe.name }}
                </option>
              </select>
            </label>

            <label for="split-select">
              <span>{{ $t("appPages.myeats.weekDetail.inputLinkSplitName") }}</span>
              
              <select
                v-model="selectedSplit"
                name="split-select"
              >
                <option 
                  v-for="split in daySplits"
                  :key="split.order+'split-select'"
                  :value="split.order"
                >
                  {{ split.name }}
                </option>
              </select>
            </label>

            <button
              @click="linkRecipe"
              type="button"
              class="new-split btn-small"
            >
              {{ $t("appPages.myeats.weekDetail.newSplit") }}
            </button>
          </div>




          <div class="form-group">
            <div class="recipe-split-links">
              <div
                class="link"
                v-for="split in daySplits"
                :key="split.order+'split-order'"
              >
                <p class="split-name">{{ split.name }}</p>
                <ul class="recipe-name">
                  <li 
                    v-for="recipe in split.recipes"
                    :key="recipe.id+'recipe'+split.id"
                    @mouseover="showLinkActionsButtons(split, recipe)"
                    @mouseout="hideLinkActionsButtons()"
                  >
                    <span v-if="editingLink !== split.order + '|' + recipe.id">{{ recipe.name }}</span>


                    <label v-if="editingLink === split.order + '|' + recipe.id" for="recipe-select">
                      <span>{{ $t("appPages.myeats.weekDetail.inputLinkRecipeName") }}</span>
                      
                      <select
                        v-model="selectedEditRecipe"
                        name="recipe-select"
                      >
                        <option 
                          v-for="recipe in filteredRecipes"
                          :key="recipe.id+'recipe-option'"
                          :value="recipe.id"
                        >
                          {{ recipe.name }}
                        </option>
                      </select>
                    </label>


                    <span
                      v-show="(showLinkActions && activeLink === split.order + '|' + recipe.id) || editingLink === split.order + '|' + recipe.id"
                      class="link-actions"
                    >
                      <button 
                        v-if="editingLink !== split.order + '|' + recipe.id"
                        class="btn-small btn-split edit-link"
                        type="button"
                        @click="editLink(split, recipe)"
                      >
                        {{ $t("appPages.myeats.weekDetail.editSplit") }}
                      </button>
                      
                      <button 
                        v-if="editingLink !== split.order + '|' + recipe.id"
                        class="btn-small btn-split delete-link"
                        type="button"
                        @click="deleteLink(split, recipe)"
                      >
                        {{ $t("appPages.myeats.weekDetail.deleteSplit") }}
                      </button>

                      <button 
                        v-if="editingLink === split.order + '|' + recipe.id"
                        class="btn-small btn-split save-link"
                        type="button"
                        @click="saveLink(split, recipe)"
                      >
                        {{ $t("appPages.myeats.weekDetail.saveSplit") }}
                      </button>
                    </span>
                  </li>

                  
                </ul>
              </div>
            </div>
          </div>
        </div>
        

        


        <div class="submit">
          <button disabled v-if="weekStatus === 'loading'" class="loading-button">
            <img src="../../assets/img/loading.svg" alt="Loading">
          </button>
          <button v-else="editableData.name.length === 0" @click.prevent="updateDay">
            {{ $t("appPages.myeats.weekDetail.editSubmitButton") }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapGetters } from 'vuex'
import { GET_RECIPES, GET_CATEGORIES, UPDATE_WEEK_DAY_SPLITS } from '@/store/actionTypes'

export default {
  name: "ConfigureDayForm",
  props: {
    editableData: {
      type: Object,
      default: () => ({
        id: 0,
        name: "",
        splits: [],
        week: 0,
      }),
    }, 
  },
  data() {
    return {
      validationMsg: "",
      dayName: "",
      daySplits: [],
      splitName: "",
      showSplitInput: true,
      showSplitActions: false,
      activeSplit: -1,
      editingSplit: -1,
      searchCatId: "",
      selectedRecipe: "",
      selectedSplit: "",
      showRecipeInputs: false,
      showLinkActions: false,
      activeLink: -1,
      editingLink: -1,
      selectedEditRecipe: ""
    };
  },
  computed: {
    ...mapGetters({
        userId: 'userId',
        weekStatus: 'weekStatus',
        recipeList: 'recipeList',
        categoriesList: 'categoriesList'
    }),

    filteredRecipes() {
      if (this.searchCatId !== "") {
        const result = []
        this.recipeList.forEach((recipe) => {
          recipe.categories.forEach((cat) => {
            if (cat.id === this.searchCatId) {
              result.push(recipe)
            }
          })
        })

        return result
      }
      return this.recipeList
    }
  },
  methods: {
    resetValidationMsg() {
      this.validationMsg = ""
    },

    /**
     * Update day with API Service
     */
    updateDay() {

      this.resetValidationMsg()

      const oldSplits = []
      this.editableData.splits.forEach((s) => {
        if (s.hasOwnProperty("id")) {
          oldSplits.push(s)
        }
      })

      const newSplits = []
      this.daySplits.forEach((s) => {
        let recipeIds = []
        s.recipes.forEach((r) => {
          recipeIds.push(r.id)
        })
        Vue.set(s, "recipes", recipeIds)
        newSplits.push(s)
      })
      return this.$store.dispatch(UPDATE_WEEK_DAY_SPLITS, {oldSplits, newSplits})
      .then((resp) => {
        this.$emit("day-updated") 
        
      })
      
    },

    updateDayWithEditableData() {
      if (this.editableData.name.length > 0) {
        this.dayName = this.editableData.name
        this.daySplits = [ ...this.editableData.splits ]
        if (this.daySplits.length > 0) {
          this.showSplitInput = false
        }
      }
      
    },

    addMoreSplits() {
      this.showSplitInput = true
    },

    addSplit() {
      if (this.splitName.trim().length === 0) {
        this.validationMsg = this.$t("appPages.myeats.weekDetail.errorSplitNameMandatory")
        return false
      }

      const newSplit = {
        name: this.splitName,
        day: this.editableData.id,
        order: this.daySplits.length,
        recipes: []
      }
      this.splitName = ""
      this.showSplitInput = false
      this.daySplits.push(newSplit)
    },

    editSplit(split) {
      this.editingSplit = split.order
    },

    saveSplit() {
      this.editingSplit = -1
    },

    deleteSplit(split) {
      this.daySplits = this.daySplits.filter((s) => s.order !== split.order)

      // update order of splits
      this.daySplits.forEach((split) => {
        let index = this.daySplits.findIndex((s) => s.order === split.order)
        Vue.set(split, "order", index)
      })
    },

    orderUpSplit(split) {
      if (split.order === 0) {
        return false
      }

      const tmpSplitOrder = split.order
      const exchangeOrderSplit = this.daySplits.filter((s) => s.order === (split.order - 1))[0]
      Vue.set(split, "order", exchangeOrderSplit.order)
      Vue.set(exchangeOrderSplit, "order", tmpSplitOrder)
      this.sortDaySplits()
    },
    
    orderDownSplit(split) {
      if (split.order === this.daySplits.length - 1) {
        return false
      }

      const tmpSplitOrder = split.order
      const exchangeOrderSplit = this.daySplits.filter((s) => s.order === (split.order + 1))[0]
      Vue.set(split, "order", exchangeOrderSplit.order)
      Vue.set(exchangeOrderSplit, "order", tmpSplitOrder)
      this.sortDaySplits()
    },

    editLink(split, recipe) {
      this.editingLink = split.order + '|' + recipe.id
    },

    saveLink(split, recipe) {
      const selectedRecipe = this.recipeList.filter((r) => r.id === this.selectedEditRecipe)[0]
      
      if (split.recipes.find((r) => r.id === selectedRecipe.id)) {
        this.editingLink = -1
        this.selectedEditRecipe = ""

        return false
      }

      split.recipes.forEach((r, index) => {
        if (r.id === recipe.id) {
          split.recipes[index] = selectedRecipe
        }
      })

      this.editingLink = -1
      this.selectedEditRecipe = ""
    },

    deleteLink(split, recipe) {
      
      split.recipes.forEach((r, index) => {
        if (r.id === recipe.id) {
          Vue.set(split, "recipes", split.recipes.slice(0, index).concat(split.recipes.slice(index+1, split.recipes.length)))
        }
      })
    },

    showSplitActionsButtons(split) {
      this.showSplitActions = true
      this.activeSplit = split.order
    },

    hideSplitActionsButtons() {
      this.showSplitActions = false
      this.activeSplit = -1
    },

    showLinkActionsButtons(split, recipe) {
      this.showLinkActions = true
      this.activeLink = split.order + '|' + recipe.id
    },

    hideLinkActionsButtons() {
      this.showLinkActions = false
      this.activeLink = -1
    },


    linkNewRecipe() {
      this.showRecipeInputs = true
    },

    linkRecipe() {
      if (this.selectedRecipe === "" || this.selectedSplit === "") {
        return false
      }

      const recipe = this.recipeList.filter((r) => r.id === this.selectedRecipe)[0]
      const split = this.daySplits.filter((s) => s.order === this.selectedSplit)[0]

      if (split.recipes.find((r) => r.id === recipe.id)) {
        this.selectedRecipe = ""
        this.selectedSplit = ""
        this.searchCatId = ""
        this.showRecipeInputs = false
        
        return false
      }

      split.recipes.push(recipe)

      this.selectedRecipe = ""
      this.selectedSplit = ""
      this.searchCatId = ""

      this.showRecipeInputs = false
    },

    sortDaySplits() {
      const sorted = this.daySplits.sort((a, b) => (a.order > b.order) ? 1 : -1)
      Vue.set(this.daySplits, sorted)
    }
  }, 

  watch: {
    editableData() {
      this.updateDayWithEditableData()
    }
  },

  created() {
    this.$store.dispatch(GET_RECIPES)
    this.$store.dispatch(GET_CATEGORIES)
    this.updateDayWithEditableData()
  }
}
</script>

<style scoped>
.t-all-ease {
  transition: all .5s ease;
}

.configure-day-form h3 {
  @apply mb-3
}

.configure-day-form .form-wrapper form .form-group {
    @apply mb-2
}

.configure-day-form .form-wrapper form .form-group label {
    @apply flex flex-col max-w-full mx-auto bg-blue-300 rounded-t-md rounded-b-md border-2 border-blue-300
}
.configure-day-form .form-wrapper form .form-group label span {
    @apply py-0 px-2 pb-0 text-left text-xs text-gray-600
}

.configure-day-form .form-wrapper form .form-group label input,
.configure-day-form .form-wrapper form .form-group label select {
    @apply py-0 px-2 bg-blue-300 rounded-b-md text-sm
}

.configure-day-form .form-wrapper form input:focus,
.configure-day-form .form-wrapper form select:focus {
    @apply outline-none shadow-md
}


.configure-day-form .form-wrapper form .submit{
    @apply mt-6 w-full
}

.configure-day-form .form-wrapper form .submit button {
    @apply text-blue-100 bg-blue-900 border-2 border-blue-900 p-2 rounded-md outline-none
}

.configure-day-form .form-wrapper form .submit button:hover,
.configure-day-form .form-wrapper form .submit button:focus {
    @apply bg-blue-100 text-blue-900 shadow-md
}

.configure-day-form .form-wrapper form .submit button {
  @apply m-auto block
}

.configure-day-form .form-wrapper form .submit .loading-button img {
    @apply w-8
}


.configure-day-form .form-wrapper #validation-msg {
    @apply py-3 px-1 mb-4  relative bg-red-500 bg-opacity-50 rounded-md text-gray-100 text-sm text-center max-w-sm mx-auto
}

.configure-day-form .form-wrapper #validation-msg .close {
    @apply absolute right-0 top-0 py-1 px-2 cursor-pointer text-gray-300
}

.configure-day-form .form-wrapper #validation-msg .close:hover {
    @apply text-gray-100
}

.configure-day-form .form-wrapper form button.btn-small {
  @apply mt-1 mb-3 mx-auto block text-xs text-blue-100 bg-blue-700 border-2 border-blue-700 px-1 rounded-sm outline-none
}

.configure-day-form .form-wrapper form button.btn-small:hover,
.configure-day-form .form-wrapper form button.btn-small:focus  {
  @apply bg-blue-100 text-blue-700 shadow-md
}


.configure-day-form .form-wrapper form .form-col .col-title-btn {
  @apply flex items-center
}

.configure-day-form .form-wrapper form .form-col .col-title-btn .btn-small {
  @apply m-0 mb-3 ml-3
}

.configure-day-form .form-wrapper form .form-group .splits-list .splits .split,
.configure-day-form .form-wrapper form .form-group .recipe-split-links .link ul.recipe-name li {
  @apply flex justify-between items-center px-1 py-2 rounded-sm border-2 border-transparent
}

.configure-day-form .form-wrapper form .form-group .splits-list .splits .split:hover,
.configure-day-form .form-wrapper form .form-group .recipe-split-links .link ul.recipe-name li:hover {
  @apply bg-blue-200 border-blue-400
}

.configure-day-form .form-wrapper form .form-group .splits-list .splits .split .split-actions,
.configure-day-form .form-wrapper form .form-group .recipe-split-links .link .link-actions {
  @apply flex items-center
}

.configure-day-form .form-wrapper form .form-group .splits-list .splits .split .split-actions .btn-split,
.configure-day-form .form-wrapper form .form-group .recipe-split-links .link .link-actions .btn-split  {
  @apply mx-1 my-0
}

.configure-day-form .form-wrapper form .form-group .splits-list .splits .split .split-actions .edit-split,
.configure-day-form .form-wrapper form .form-group .splits-list .splits .split .split-actions .update-order {
  @apply bg-blue-400 border-blue-400
}

.configure-day-form .form-wrapper form .form-group .splits-list .splits .split .split-actions .edit-split:hover,
.configure-day-form .form-wrapper form .form-group .splits-list .splits .split .split-actions .update-order:hover {
  @apply bg-blue-300
}

.configure-day-form .form-wrapper form .form-group .splits-list .splits .split .split-actions .update-order {
  @apply m-0 rounded-none
}

.configure-day-form .form-wrapper form .form-group .splits-list .splits .split .split-actions .update-order img{
  @apply w-4
}

.configure-day-form .form-wrapper form .form-group .splits-list .splits .split .split-actions .delete-split {
  @apply bg-red-400 border-red-400
}

.configure-day-form .form-wrapper form .form-group .splits-list .splits .split .split-actions .delete-split:hover {
  @apply bg-red-300 text-red-800
}

.configure-day-form .form-wrapper form .form-group.add-recipe-inputs,
.configure-day-form .form-wrapper form .form-group .add-split-input,
.configure-day-form .form-wrapper form .form-group .replication-confirm {
  @apply bg-blue-200 p-2 rounded-md mb-1
}

.configure-day-form .form-wrapper form .form-group .replication-confirm {
  @apply flex items-center gap-1 
}

.configure-day-form .form-wrapper form .form-group.add-recipe-inputs label {
 @apply mb-1
}

.configure-day-form .form-wrapper form .form-group .recipe-split-links .link {
  @apply mb-2
}

.configure-day-form .form-wrapper form .form-group .recipe-split-links .link .split-name {
  @apply text-lg border-b border-gray-400
}

.configure-day-form .form-wrapper form .form-group .recipe-split-links .link ul.recipe-name li {
  @apply flex justify-between text-sm
}


@media (min-width: 768px) {
  .configure-day-form .form-wrapper form {
    @apply flex justify-around items-center items-stretch flex-wrap
  }

  .configure-day-form .form-wrapper form .form-col {
    width: 47%;
  }

}
</style>