<script>
/**
 * Recipe details view
 *
 * @summary Recipe details view
 * @author Zeppelin17 <elzeppelin17@gmail.com>
 *
 * Created at     : 2020-08-21 06:21:29 
 * Last modified  : 2020-09-07 18:52:07
 */
</script>

<template>
  <div class="recipe-detail">
    <div v-if="recipeStatus === 'success'">
      <AppPageActionButtons
        :actions="pageActionButtons"
        v-on:execute-action="childEventEmit($event)"
      />

      <h1>{{ recipeData.name }}</h1>
      <div class="recipe-info">
        <div class="info-col">
          <div class="info-block categories">
            <h2>{{ $t('appPages.recipeDetail.categoriesTitle') }}</h2>
            <span 
              class="tag"
              v-for="cat in recipeData.categories"
              :key="cat.id"
            >
            {{ cat.name }}
            </span>
          </div>

          <div class="info-block description">
            <h2>{{ $t('appPages.recipeDetail.descriptionTitle') }}</h2>
            <span class="desc-text">{{ recipeData.description }}</span>
          </div>
        </div>


        <div class="info-col">
          <div class="info-block ingredients">
            <h2>{{ $t('appPages.recipeDetail.ingredientsTitle') }}</h2>
            <span 
              class="tag"
              v-for="ing in recipeData.ingredients"
              :key="ing.id"
            >
            {{ ing.name
            }}<span v-if="ing.quantity !== 0"
              >: {{ ing.quantity }}</span
            >
            <span v-if="ing.unit_of_measure !== '0'"> {{
              ing.unit_of_measure
            }}</span>
            </span>
          </div>

          <div class="info-block steps">
            <h2>{{ $t('appPages.recipeDetail.stepsTitle') }}</h2>
            <span class="steps-text">{{ recipeData.steps }}</span>
          </div>
        </div>
      </div>

    </div>

    <div v-if="recipeStatus === 'loading'" id="recipe-loading">
        <img src="../../assets/img/loading.svg" alt="Loading">
        <p>{{ $t('appPages.recipeDetail.loadingMsg') }}</p>
    </div>

    <!-- Create new recipe modal -->
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



    <!-- Edit recipe modal -->
    <ModalBox 
      v-show="isEditRecipeModalVisible"
      v-on:close='closeEditRecipeModal'
    >
      <template v-slot:header>
        <h2>{{ $t('appPages.recipes.editRecipeFormTitle') }}</h2>
      </template>

      <template v-slot:body>
        <CreateRecipeForm v-if="recipeData.name && recipeData.name.length > 0"
          v-on:recipe-updated='recipeUpdatedNotification'
          :editableData='recipeData' />
      </template>
    </ModalBox>



    <!-- Confirm deletion modal -->
    <ModalBox 
      v-show="isConfirmDeleteModalVisible"
      v-on:close='closeConfirmDeleteModal'
    >
      <template v-slot:header>
        <h2>{{ $t('appPages.recipes.deleteConfirmation') }}</h2>
      </template>

      <template v-slot:body>
        <div class="confirm-delete-buttons">
          <button class="confirm" @click="deleteRecipeConfirmed">{{ $t('appPages.generic.yes') }}</button>
          <button class="cancel" @click="closeConfirmDeleteModal">{{ $t('appPages.generic.no') }}</button>
        </div>
      </template>
    </ModalBox>

    <UserNotification ref="notify"/>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { GET_RECIPE, GET_RECIPES, DELETE_RECIPE } from '@/store/actionTypes'
import AppPageActionButtons from '@/components/AppPageActionButtons.vue'
import ModalBox from '@/components/blocks/ModalBox.vue'
import UserNotification from '@/components/UserNotification.vue'
import CreateRecipeForm from '@/components/forms/CreateRecipeForm.vue'

export default {
  name: "RecipeDetail",
  components: {
    AppPageActionButtons,
    CreateRecipeForm,
    ModalBox,
    UserNotification
  },
  data() {
    return {
      isCreateRecipeModalVisible: false,
      isEditRecipeModalVisible: false,
      isConfirmDeleteModalVisible: false,
      recipeData: {},

      pageActionButtons: [
        {
          type: "return",
          entity: "Recipe",
          text: this.$t('appPages.recipeDetail.backToRecipesButton'),
          onClick: "backToRecipesList"
        },
        {
          type: "create",
          entity: "Recipe",
          text: this.$t('appPages.recipeDetail.createButton'),
          onClick: "createNewRecipe"
        },
        {
          type: "edit",
          entity: "Recipe",
          text: this.$t('appPages.recipeDetail.editButton'),
          onClick: "editRecipe"
        },
        {
          type: "delete",
          entity: "Recipe",
          text: this.$t('appPages.recipeDetail.deleteButton'),
          onClick: "deleteRecipe"
        }
      ],
    }
  },
  computed: {
    ...mapGetters({
          recipeList: 'recipeList',
          recipeStatus: 'recipeStatus'
    }),
  },

  methods: {
    /**
     * This function receives a method name and it executes dynamicly
     */
    childEventEmit(action) {
      this[action]()
    },

    closeCreateRecipeModal() {
      this.isCreateRecipeModalVisible = false
    },

    closeEditRecipeModal() {
      this.isEditRecipeModalVisible = false
    },

    closeConfirmDeleteModal() {
      this.isConfirmDeleteModalVisible = false
    },

    showCreateRecipeModal() {
      this.isCreateRecipeModalVisible = true
    },

    showEditRecipeModal() {
      this.isEditRecipeModalVisible = true
    },

    showConfirmDeleteModal() {
      this.isConfirmDeleteModalVisible = true
    },

    backToRecipesList() {
      this.$router.push({name: 'Recipes'})
    },

    recipeCreatedNotification() {
      this.closeCreateRecipeModal()
      this.$refs.notify.success(event, this.$t("appPages.recipes.RecipeCreatedSuccess"), 3000, true)
    },

    recipeUpdatedNotification() {
      this.closeEditRecipeModal()
      this.getRecipe(true)
      this.$refs.notify.success(event, this.$t("appPages.recipes.RecipeEditedSuccess"), 3000, true)
      
    },

    createNewRecipe() {
      this.showCreateRecipeModal()
    },

    editRecipe() {
      this.showEditRecipeModal()
    },

    deleteRecipe() {
      this.showConfirmDeleteModal()
    },

    deleteRecipeConfirmed() {
      this.$store.dispatch(DELETE_RECIPE, this.recipeData.id)
      .then(() => {
        this.$router.push({name: 'Recipes'})
        this.$refs.notify.success(event, this.$t("appPages.recipes.RecipeDeleteSuccess"), 3000, true)
      })
      
    },

    setRecipe(recipe) {
      this.recipeData = recipe
    },

    getRecipe(force=false) {
      let recipeFound = false
      // get recipe from store
      let recipe = this.recipeList.filter((r) => r.id === this.$route.params.id)[0]

      // if the recipe is not in the store, then look for it through API
      if (recipe === undefined || force === true) {
        this.$store.dispatch(GET_RECIPE, this.$route.params.id)
        .then((resp) => {
          this.setRecipe(resp)
          this.$store.dispatch(GET_RECIPES)  //load in store the rest of recipes
        })
      }else {
        this.setRecipe(recipe)
      }
    }
  },

  created() {
    this.getRecipe()
  }
}
</script>

<style>
.recipe-detail #recipe-loading {
    @apply absolute flex flex-col items-center justify-center inset-0 bg-blue-700 bg-opacity-75 m-auto
}

.recipe-detail #recipe-loading p {
    @apply font-bold text-xl px-2 py-1 bg-blue-900 text-gray-200 rounded-lg
}

.recipe-detail {
  @apply p-6 pt-0
}

.recipe-detail h1 {
  @apply text-center mb-5
}

.recipe-detail .recipe-info {
  @apply flex flex-col justify-center p-3 bg-blue-300 rounded-lg shadow-lg
}

.recipe-detail .recipe-info .info-col {
  @apply px-2
}

.recipe-detail .recipe-info .info-col .info-block {
  @apply mb-4
}

.recipe-detail .recipe-info .info-col .info-block h2 {
  @apply mb-2
}

.recipe-detail .recipe-info .tag {
  @apply bg-blue-700 text-blue-100 rounded-sm inline-block mr-1 mb-1 px-2 py-1 whitespace-no-wrap
}

.recipe-detail .confirm-delete-buttons {
  @apply flex items-center justify-center
}

.recipe-detail .confirm-delete-buttons button{
  @apply mx-1 py-2 px-6 rounded-md text-sm text-blue-200 outline-none border-2 outline-none whitespace-no-wrap
}

.recipe-detail .confirm-delete-buttons button.confirm {
  @apply bg-red-500 border-red-500
}

.recipe-detail .confirm-delete-buttons button.confirm:hover {
  @apply bg-red-200 text-red-600
}

.recipe-detail .confirm-delete-buttons button.cancel {
  @apply bg-blue-500 border-blue-500
}

.recipe-detail .confirm-delete-buttons button.cancel:hover {
  @apply bg-blue-200 text-blue-600
}

@media (min-width: 640px) {

  .recipe-detail .recipe-info {
    @apply flex flex-row
  }

  .recipe-detail .recipe-info .info-col {
    @apply flex-1 px-6
  }

  .recipe-detail .recipe-info .info-col:first-child {
    @apply border-r-2 border-blue-200
  }
}
</style>