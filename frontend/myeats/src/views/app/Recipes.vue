<script>
/**
 * Recipes View
 *
 * @summary Recipes View
 * @author Zeppelin17 <elzeppelin17@gmail.com>
 *
 * Created at     : 2020-06-24 09:06:55
 * Last modified  : 2020-08-19 06:50:32
 */
</script>


<template>
    <div class="recipes">

      <AppPageActionButtons
        :actions="pageActionButtons"
        v-on:execute-action="childEventEmit($event)"
      />


      <h1>{{ $t('appPages.recipes.mainTitle') }}</h1>

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
import { GET_RECIPES } from '@/store/actionTypes'
import { GET_CATEGORIES } from '../../store/actionTypes'

export default {
  name: 'recipes', 
  data() {
      return {
          isCreateRecipeModalVisible: false,
          pageActionButtons: [
            {
              type: "create",
              entity: "Recipe",
              text: this.$t('appPages.recipes.createButton'),
              onClick: "createNewRecipe" 
            },
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
          filterCategory: "",
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

    
    recipeCreatedNotification() {
      this.closeCreateRecipeModal()
      this.$store.dispatch(GET_RECIPES)
      this.$refs.notify.success(event, this.$t("appPages.recipes.RecipeCreatedSuccess"), 10000, true)
      //this.$refs.notify.info(event, "info notification", 5000, true)
      //this.$refs.notify.warning(event, "warning notification", 10000, true)
      //this.$refs.notify.error(event, "error notification", 10000, true)
      //this.$refs.notify.success(event, "success notification", 10000, true)
    },


    getRecipes() {
      this.$store.dispatch(GET_RECIPES)
    },

    getCategories() {
      this.$store.dispatch(GET_CATEGORIES)
    },

    updatePagination(pag) {
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
</style>
