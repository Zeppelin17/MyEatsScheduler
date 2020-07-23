<script>
/**
 * Recipes View
 *
 * @summary Recipes View
 * @author Zeppelin17 <elzeppelin17@gmail.com>
 *
 * Created at     : 2020-06-24 09:06:55
 * Last modified  : 2020-07-02 06:40:56
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
    </div>
</template>

<script>
import CardRecipeBlock from '@/components/blocks/CardRecipeBlock.vue'
import AppPageActionButtons from '@/components/AppPageActionButtons.vue'
import UserNotification from '@/components/UserNotification.vue'

export default {
  name: 'recipes',
  data() {
      return {
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
          ]
      }
  },
  components: {
      CardRecipeBlock,
      AppPageActionButtons,
      UserNotification
  },
  methods: {
    /**
     * This function receives a method name and it executes dynamicly
     */
    childEventEmit(action) {
      this[action]()
    },

    createNewRecipe() {
      //this.$refs.notify.infoNotification(event, "test notification", 5000, true)
      //this.$refs.notify.warningNotification(event, "test notification", 10000, true)
      //this.$refs.notify.errorNotification(event, "test notification", 10000, true)
      this.$refs.notify.successNotification(event, "test notification", 10000, true)
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
</style>
