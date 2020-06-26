<script>
/**
 * Recipes View
 *
 * @summary Recipes View
 * @author Zeppelin17 <elzeppelin17@gmail.com>
 *
 * Created at     : 2020-06-24 09:06:55
 * Last modified  : 2020-06-26 06:21:19
 */
</script>


<template>
    <div class="recipes">
      <h1>{{ $t('appPages.recipes.mainTitle') }}</h1>

      <CardRecipeBlock
        id="1" 
        name="My first recipe"
        :categories="['categ_1', 'categ_2', 'categ_3']"
        ingredients="6"
      />

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
</style>
