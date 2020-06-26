<script>
/**
 * Block component to show a card of a recipe
 *
 * @summary Block component to show a card of a recipe
 * @author Zeppelin17 <elzeppelin17@gmail.com>
 *
 * Created at     : 2020-06-25 06:28:12
 * Last modified  : 2020-06-26 07:00:33
 */
</script>
<template>
  <div class="card-recipe-block">
    <div class="name t-all-ease">
        <p>{{ name }}</p>
    </div>
    <div class="content-wrapper">
      <div class="content">
        <span>{{ $t('appPages.recipes.categories') }}: </span>

        <div class="tags-wrapper">
          <span class="tag t-all-ease" v-for="(category, index) in categories" :key="index">{{ category }}</span>
        </div>
      </div>
      <div class="content">
        <span>{{ $t('appPages.recipes.ingredients') }}: </span>

        <div class="tags-wrapper">
          <span class="tag t-all-ease">{{ ingredients }}</span>
        </div>
      </div>
      
      <div class="action">
        <router-link :to="$i18nRoute({ name: 'Dashboard' })" class="button t-all-ease">
          {{ $t('appPages.recipes.openRecipe') }}
        </router-link>

        <a href="#" class="button danger t-all-ease">
          {{ $t('appPages.recipes.deleteRecipe') }}
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardRecipeBlock',
  props: {
    id: {
      type: String,
      required: true,
    }, 
    name: {
      type: String,
      required: true,
    },
    categories: {
      type: Array,
      required: true,
    },
    ingredients: {
      type: String,
      required: true,
    }
  }
}
</script>


<style scoped>
.t-all-ease {
  transition: all .5s ease;
}

.card-recipe-block {
  @apply w-full bg-blue-300 rounded-lg overflow-hidden shadow-xl
}

.card-recipe-block .content-wrapper {
  @apply p-4
}

.card-recipe-block .content-wrapper .content {
  @apply mb-6
}

.card-recipe-block .content-wrapper .content .tags-wrapper {
  @apply flex items-center justify-center flex-wrap
}

.card-recipe-block .content-wrapper .tag {
  @apply py-1 px-2 m-1 bg-blue-700 rounded-md text-xs text-blue-300
}

.card-recipe-block:hover .content-wrapper .tag {
  @apply text-blue-100
}

.card-recipe-block .name{
  @apply px-3 py-10 bg-blue-900 border-blue-900 border-b-4 text-xl leading-tight font-bold text-blue-200 overflow-hidden
}

.card-recipe-block:hover .name{
  @apply bg-blue-500 text-blue-100
}

.card-recipe-block .action {
  @apply flex items-center justify-around mt-6 mb-1
}

.card-recipe-block .action .button {
  @apply block w-full p-1 m-2 text-center text-sm rounded-md bg-blue-900 text-blue-200 border-2 border-blue-900 outline-none align-bottom
}

.card-recipe-block .action .button:hover {
  @apply bg-blue-200 text-blue-900 font-bold
}




@media (min-width: 640px) {
  .card-recipe-block {
    @apply w-1/3 max-w-xs
  }
}
</style>
