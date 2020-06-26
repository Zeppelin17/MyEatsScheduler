<script>
/**
 * Recipes View
 *
 * @summary Recipes View
 * @author Zeppelin17 <elzeppelin17@gmail.com>
 *
 * Created at     : 2020-06-24 09:06:55
 * Last modified  : 2020-06-26 07:03:29
 */
</script>


<template>
    <div class="recipes">
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
    </div>
</template>

<script>
import CardRecipeBlock from '@/components/blocks/CardRecipeBlock.vue'

export default {
  name: 'recipes',
  data() {
      return {
          
      }
  },
  components: {
      CardRecipeBlock
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
