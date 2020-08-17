<script>
/**
 * Recipes View
 *
 * @summary Recipes View
 * @author Zeppelin17 <elzeppelin17@gmail.com>
 *
 * Created at     : 2020-06-24 09:06:55
 * Last modified  : 2020-08-17 06:45:29
 */
</script>


<template>
    <div class="recipes">

      <AppPageActionButtons
        :actions="pageActionButtons"
        v-on:execute-action="childEventEmit($event)"
      />


      <h1>{{ $t('appPages.recipes.mainTitle') }}</h1>

      <div class="cards-wrapper">
        <CardRecipeBlock
          v-for="recipe in recipeList"
          :key="recipe.id"
          :id="recipe.id" 
          :name="recipe.name"
          :categories="recipe.categories"
          :ingredients="recipe.ingredients.length"
        />
      </div>


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
              text: "Create",
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
      }
  },
  computed: {
      ...mapGetters({
          recipeList: 'recipeList',
          recipeStatus: 'recipeStatus'
      })
  },
  components: {
      CardRecipeBlock,
      AppPageActionButtons,
      UserNotification,
      ModalBox,
      CreateRecipeForm
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
    }
  },
  created() {
    this.getCategories()
    this.getRecipes()   
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

.recipes .cards-wrapper .card-recipe-block{
  @apply m-3
}

.recipes #recipe-loading {
    @apply absolute flex flex-col items-center justify-center inset-0 bg-blue-700 bg-opacity-75 m-auto
}

.recipes #recipe-loading p {
    @apply font-bold text-xl px-2 py-1 bg-blue-900 text-gray-200 rounded-lg
}
</style>
