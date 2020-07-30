<script>
/**
 * Recipes View
 *
 * @summary Recipes View
 * @author Zeppelin17 <elzeppelin17@gmail.com>
 *
 * Created at     : 2020-06-24 09:06:55
 * Last modified  : 2020-07-29 07:00:48
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
          id="1" 
          name="My first recipe"
          :categories="['categ_1', 'categ_2', 'categ_3', 'categ_4']"
          ingredients="7"
        />

        <CardRecipeBlock
          id="1" 
          name="Another recipe"
          :categories="['categ_1']"
          ingredients="3"
        />

        <CardRecipeBlock
          id="1" 
          name="This recipe has a longer title and it has to fit well"
          :categories="['categ_1', 'categ_2', 'categ_3']"
          ingredients="8"
        />

        <CardRecipeBlock
          id="1" 
          name="The recipe I love the most"
          :categories="['categ_1', 'categ_2', 'categ_3', 'categ_4', 'categ_5']"
          ingredients="12"
        />

        <CardRecipeBlock
          id="1" 
          name="Yet another recipe"
          :categories="['categ_1', 'categ_2']"
          ingredients="4"
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
          <CreateRecipeForm />
        </template>

        <template v-slot:footer>
          <p>footer test</p>
        </template>
      </ModalBox>
    </div>
</template>

<script>
import CardRecipeBlock from '@/components/blocks/CardRecipeBlock.vue'
import AppPageActionButtons from '@/components/AppPageActionButtons.vue'
import UserNotification from '@/components/UserNotification.vue'
import ModalBox from '@/components/blocks/ModalBox.vue'
import CreateRecipeForm from '@/components/forms/CreateRecipeForm.vue'

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
      //this.$refs.notify.info(event, "info notification", 5000, true)
      //this.$refs.notify.warning(event, "warning notification", 10000, true)
      //this.$refs.notify.error(event, "error notification", 10000, true)
      //this.$refs.notify.success(event, "success notification", 10000, true)
    },

    closeCreateRecipeModal() {
      this.isCreateRecipeModalVisible = false
    },

    showCreateRecipeModal() {
      this.isCreateRecipeModalVisible = true
    },

    /**
     * Create new recipe with API Service
     */
    createRecipeRequest() {

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

.recipes .cards-wrapper .card-recipe-block{
  @apply m-3
}

.recipes >>> .create-recipe-form h3 {
  @apply mb-3
}

.recipes >>> .create-recipe-form .form-wrapper form .form-group {
    @apply mb-2
}

.recipes >>> .create-recipe-form .form-wrapper form .form-group label {
    @apply flex flex-col max-w-lg mx-auto bg-blue-300 rounded-t-md rounded-b-md border-2 border-blue-300
}
.recipes >>> .create-recipe-form .form-wrapper form .form-group label span {
    @apply py-0 px-2 pb-0 text-left text-xs text-gray-600
}

.recipes >>> .create-recipe-form .form-wrapper form .form-group label input,
.recipes >>> .create-recipe-form .form-wrapper form .form-group label textarea {
    @apply py-0 px-2 bg-blue-300 rounded-b-md text-sm
}

.recipes >>> .create-recipe-form .form-wrapper form .form-group .ingredient-group label {
  @apply mb-2
}

.recipes >>> .create-recipe-form .form-wrapper form input:focus,
.recipes >>> .create-recipe-form .form-wrapper form textarea:focus {
    @apply outline-none shadow-md
}

.recipes >>> .create-recipe-form .form-wrapper form .form-group .ingredients-list button {
  @apply mt-1 mb-3 text-xs text-blue-100 bg-blue-700 border-2 border-blue-700 px-1 rounded-sm outline-none
}

.recipes >>> .create-recipe-form .form-wrapper form .form-group .ingredients-list button:hover {
  @apply bg-blue-100 text-blue-700 shadow-md
}


@media (min-width: 768px) {
  .recipes >>> .create-recipe-form .form-wrapper form {
    @apply flex justify-around items-center items-stretch
  }

  .recipes >>> .create-recipe-form .form-wrapper form .form-col {
    width: 47%;
  }

  .recipes >>> .create-recipe-form .form-wrapper form .form-group .ingredients-list {
    @apply max-w-full
  }

  .recipes >>> .create-recipe-form .form-wrapper form .form-group .ingredient-group {
    @apply flex justify-start flex-wrap
  }

  .recipes >>> .create-recipe-form .form-wrapper form .form-group .ingredient-group label {
    @apply w-5/12 mb-1 mx-1
  }

  .recipes >>> .create-recipe-form .form-wrapper form .form-group .ingredient-group label.name {
    @apply w-1/2
  }

  .recipes >>> .create-recipe-form .form-wrapper form .form-group .ingredient-group label.qty,
  .recipes >>> .create-recipe-form .form-wrapper form .form-group .ingredient-group label.uom {
    width: 21%
  }

}
</style>
