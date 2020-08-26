<script>
/**
 * Recipes View
 *
 * @summary Recipes View
 * @author Zeppelin17 <elzeppelin17@gmail.com>
 *
 * Created at     : 2020-06-24 09:06:55
 * Last modified  : 2020-08-26 15:46:51
 */
</script>


<template>
    <div class="recipes">

      <AppPageActionButtons
        :actions="pageActionButtons"
        v-on:execute-action="childEventEmit($event)"
      />


      <h1>{{ $t('appPages.recipes.mainTitle') }}</h1>
      <h4 v-if="selectedRecipes.length > 0">{{ $t('appPages.recipes.selectedRecipes', {num: selectedRecipes.length}) }}</h4>
      <div class="filter" v-if="this.recipeList.length > 0">
        <form>
          <div class="form-group">
              <label for="filter-name">
                  <span>{{ $t('appPages.recipes.filterName') }}</span>
                  <input v-model="filterName" name="filter-name" type="text" autocomplete="off" />
              </label>
          </div>

          <div class="form-group">
              <label for="filter-category">
                  <span>{{ $t('appPages.recipes.filterCategory') }}</span>
                  <input v-model="filterCategory" name="filter-category" type="text" autocomplete="off" />
              </label>
          </div>
        </form>
      </div>
      <div class="cards-wrapper">
        <CardRecipeBlock
          v-for="recipe in recipesListPaginated"
          :key="recipe.id"
          :id="recipe.id" 
          :name="recipe.name"
          :categories="recipe.categories"
          :ingredients="recipe.ingredients.length"
          v-on:recipe-deleted="recipeDeletedNotification()"
          v-on:recipe-selected="updateSelectedRecipes($event)"
        />
      </div>

      <Pagination v-if="PagTotalPages >= 1"
          :maxVisibleButtons=PagMaxVisibleButtons
          :totalPages=PagTotalPages
          :total=PagTotal
          :currentPage=PagCurrentPage
          v-on:pagechanged="updatePagination($event)"
        />


      <UserNotification ref="notify"/>

      <ModalBox 
        v-show="isCreateRecipeModalVisible"
        v-on:close='closeCreateRecipeModal'
      >
        <template v-slot:header>
          <h2>{{ $t('appPages.recipes.createRecipeFormTitle') }}</h2>
        </template>

        <template v-slot:body>
          <CreateRecipeForm v-on:recipe-created='recipeCreatedNotification' />
        </template>

      </ModalBox>


      <ModalBox 
        v-show="isConfirmDeleteModalVisible"
        v-on:close='closeConfirmDeleteModal'
      >
        <template v-slot:header>
          <h2>{{ $t('appPages.recipes.batchDeleteConfirmation') }}</h2>
        </template>

        <template v-slot:body>
          <div class="confirm-delete-buttons">
            <button class="confirm" @click="deleteRecipesConfirmed">{{ $t('appPages.generic.yes') }}</button>
            <button class="cancel" @click="closeConfirmDeleteModal">{{ $t('appPages.generic.no') }}</button>
          </div>
        </template>
      </ModalBox>

      <div v-if="recipeStatus === 'loading'" id="recipe-loading">
          <img src="../../assets/img/loading.svg" alt="Loading">
          <p>{{ $t('appPages.recipes.loadingMsg') }}</p>
      </div>
    </div>
</template>

<script>
import CardRecipeBlock from '@/components/blocks/CardRecipeBlock.vue'
import AppPageActionButtons from '@/components/AppPageActionButtons.vue'
import UserNotification from '@/components/UserNotification.vue'
import ModalBox from '@/components/blocks/ModalBox.vue'
import Pagination from '@/components/blocks/Pagination.vue'
import CreateRecipeForm from '@/components/forms/CreateRecipeForm.vue'
import { mapGetters } from 'vuex'
import { GET_RECIPES, GET_CATEGORIES, DELETE_RECIPE } from '@/store/actionTypes'

export default {
  name: 'recipes', 
  data() {
      return {
        
          selectedRecipes: [],
          isCreateRecipeModalVisible: false,
          isConfirmDeleteModalVisible: false,
          pageActionButtons: [
            {
              type: "create",
              entity: "Recipe",
              text: this.$t('appPages.recipes.createButton'),
              onClick: "createNewRecipe"
            },
            {
              type: "delete",
              entity: "Recipe",
              text: this.$t('appPages.recipes.batchDeleteButton'),
              onClick: "showBatchDeleteConfirmationModal",
              visible: false
            }
            /* {
              type: "edit",
              entity: "Recipe",
              text: "Edit"
            },
            {
              type: "delete",
              entity: "Recipe",
              text: "Delete"
            } */
          ],
          PagMaxVisibleButtons: 3,
          PagTotalPages: 0,
          PagTotal: 0,
          PagCurrentPage: 1,
          PagNumItems: 6,
          filterName: "",
          filterCategory: ""
      }
  },
  computed: {
      ...mapGetters({
          recipeList: 'recipeList',
          recipeStatus: 'recipeStatus'
      }),

      recipesListPaginated() {
        this.filterName 
        this.filterCategory

        let recipesToPaginate = this.filterRecipes(this.recipeList)

        if (recipesToPaginate.length <= this.PagNumItems) {
          return recipesToPaginate
        }

        return recipesToPaginate.slice((this.PagCurrentPage-1)*this.PagNumItems, (this.PagCurrentPage*this.PagNumItems))
      }
  },
  components: {
      CardRecipeBlock,
      AppPageActionButtons,
      UserNotification,
      ModalBox,
      CreateRecipeForm,
      Pagination
  },
  methods: {
    /**
     * This function receives a method name and it executes dynamicly
     */
    childEventEmit(action) {
      this[action]()
    },

    /**
     * Show form to create new recipe
     */
    createNewRecipe() {
      this.showCreateRecipeModal()
    },

    closeCreateRecipeModal() {
      this.isCreateRecipeModalVisible = false
    },

    showCreateRecipeModal() {
      this.isCreateRecipeModalVisible = true
    },

    closeConfirmDeleteModal() {
      this.isConfirmDeleteModalVisible = false
    },

    showBatchDeleteConfirmationModal() {
      this.isConfirmDeleteModalVisible = true
    },

    deleteRecipesConfirmed() {
      this.closeConfirmDeleteModal()
      this.selectedRecipes.forEach((id) => {
        this.$store.dispatch(DELETE_RECIPE, id)
      })
      this.selectedRecipes = []
      this.$refs.notify.success(event, this.$t("appPages.recipes.RecipeBatchDeleteSuccess"), 2000, true)
    },
    
    recipeCreatedNotification() {
      this.closeCreateRecipeModal()
      this.getRecipes()
      this.$refs.notify.success(event, this.$t("appPages.recipes.RecipeCreatedSuccess"), 10000, true)
      //this.$refs.notify.info(event, "info notification", 5000, true)
      //this.$refs.notify.warning(event, "warning notification", 10000, true)
      //this.$refs.notify.error(event, "error notification", 10000, true)
      //this.$refs.notify.success(event, "success notification", 10000, true)
    },

    recipeDeletedNotification() {
      this.$refs.notify.success(event, this.$t("appPages.recipes.RecipeDeleteSuccess"), 2000, true)
    },

    getRecipes() {
      this.$store.dispatch(GET_RECIPES)
    },

    getCategories() {
      this.$store.dispatch(GET_CATEGORIES)
    },

    updatePagination(pag) {
      this.selectedRecipes = []
      this.PagCurrentPage = pag
    },

    filterRecipes(recipes) {
      if (this.filterName.trim() === "" && this.filterCategory.trim() === "") {
        return recipes
      }
      
      let filteredByName = recipes.filter((recipe) => this.filterName.trim().length > 0 && recipe.name.includes(this.filterName.trim()))

      let filteredByCat = [] 
      recipes.forEach((recipe) => {
        recipe.categories.forEach((cat) => {
          if ( this.filterCategory.trim().length > 0 && cat.name.includes(this.filterCategory.trim()) ) {
            filteredByCat.push(recipe)
          }
        })
      })

      // delete duplicates
      const uniqueSet = new Set([...filteredByName, ...filteredByCat])
      const recipesUnique = [...uniqueSet]

      
      return recipesUnique
    },

    updateSelectedRecipes(recipeInfo) {
      if (recipeInfo.selected) {
        this.selectedRecipes.push(recipeInfo.id)
      }else {
        this.selectedRecipes = this.selectedRecipes.filter((id) => id != recipeInfo.id)
      }
    }
  },

  created() {
    this.getCategories()
    this.getRecipes()   
  },

  watch: {
    recipeList() {
      this.PagTotal = this.recipeList.length
      this.PagTotalPages = Math.ceil(this.PagTotal / this.PagNumItems)
    },

    /**
     * To control if the "delete selected" button should be displayed or not
     * looking at the length of selected recipes
     */
    selectedRecipes() {
      if (this.selectedRecipes.length > 0) {
        this.pageActionButtons[1].visible = true
      }else{
        this.pageActionButtons[1].visible = false
      }
    }
  }
}
</script>

<style scoped>
.recipes {
  @apply text-center
}

.recipes h1 {
  @apply mb-4
}

.recipes .cards-wrapper {
  @apply flex flex-wrap justify-center
}

.recipes .cards-wrapper .card-recipe-block {
  @apply m-3
}

.recipes #recipe-loading {
    @apply absolute flex flex-col items-center justify-center inset-0 bg-blue-700 bg-opacity-75 m-auto
}

.recipes #recipe-loading p {
    @apply font-bold text-xl px-2 py-1 bg-blue-900 text-gray-200 rounded-lg
}


.recipes .filter form {
    @apply flex flex-grow items-center justify-center flex-wrap
}

.recipes .filter form .form-group {
    @apply m-2
}

.recipes .filter form .form-group label {
    @apply flex flex-col mx-auto bg-blue-300 rounded-t-md rounded-b-md border-2 border-blue-300
}
.recipes .filter form .form-group label span {
    @apply py-1 px-2 pb-0 text-left text-xs text-gray-600
}

.recipes .filter form .form-group label input {
    @apply py-1 px-2 bg-blue-300 rounded-b-md
}

.recipes .filter form input:focus {
    @apply outline-none shadow-md
}

.recipes .confirm-delete-buttons {
  @apply flex items-center justify-center
}

.recipes .confirm-delete-buttons button{
  @apply mx-1 py-2 px-6 rounded-md text-sm text-blue-200 outline-none border-2 outline-none whitespace-no-wrap
}

.recipes .confirm-delete-buttons button.confirm {
  @apply bg-red-500 border-red-500
}

.recipes .confirm-delete-buttons button.confirm:hover {
  @apply bg-red-200 text-red-600
}

.recipes .confirm-delete-buttons button.cancel {
  @apply bg-blue-500 border-blue-500
}

.recipes .confirm-delete-buttons button.cancel:hover {
  @apply bg-blue-200 text-blue-600
}
</style>
