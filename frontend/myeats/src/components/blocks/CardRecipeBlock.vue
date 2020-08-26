<script>
/**
 * Block component to show a card of a recipe
 *
 * @summary Block component to show a card of a recipe
 * @author Zeppelin17 <elzeppelin17@gmail.com>
 *
 * Created at     : 2020-06-25 06:28:12
 * Last modified  : 2020-08-24 07:00:27
 */
</script>
<template>
  <div class="card-recipe-block t-all-ease" :class="selected ? 'big-shadow' : ''">
    <div 
      @click="toggleSelected"
      class="name t-all-ease" 
      :class="selected ? 'selected' : ''"
    >
        <p>{{ name }}</p>
    </div>
    <div class="content-wrapper">
      <div class="content">
        <span>{{ $t('appPages.recipes.categories') }}: </span>

        <div class="tags-wrapper">
          <span class="tag t-all-ease" v-for="(category) in categories" :key="category.id">{{ category.name }}</span>
        </div>
      </div>
      <div class="content">
        <span>{{ $t('appPages.recipes.ingredients') }}: </span>

        <div class="tags-wrapper">
          <span class="tag t-all-ease">{{ ingredients }}</span>
        </div>
      </div>
      
      <div class="action">
        <router-link :to="$i18nRoute({ name: 'RecipeDetail', params: {id: id} })" class="button t-all-ease">
          {{ $t('appPages.recipes.openRecipe') }}
        </router-link>

        <a href="#" @click.prevent="showConfirmDeleteModal" class="button danger t-all-ease">
          {{ $t('appPages.recipes.deleteRecipe') }}
        </a>
      </div>
    </div>


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
import UserNotification from '@/components/UserNotification.vue'
import ModalBox from '@/components/blocks/ModalBox.vue'
import { DELETE_RECIPE } from '@/store/actionTypes'

export default {
  name: 'CardRecipeBlock',
  components: {
    UserNotification,
    ModalBox
  },
  props: {
    id: {
      type: Number,
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
      type: Number,
      required: true,
    }
  },
  data() {
    return {
      isConfirmDeleteModalVisible: false,
      selected: false
    }
  },
  methods: {
    closeConfirmDeleteModal() {
      this.isConfirmDeleteModalVisible = false
    },

    showConfirmDeleteModal() {
      this.isConfirmDeleteModalVisible = true
    },
    deleteRecipe() {
      this.showConfirmDeleteModal()
    },

    deleteRecipeConfirmed() {
      this.$store.dispatch(DELETE_RECIPE, this.id)
      this.$emit('recipe-deleted')
    },

    toggleSelected() {
      this.selected = !this.selected
      const values = {
        id: this.id,
        selected: this.selected
      }
      this.$emit('recipe-selected', values)
    }
    
  }
}
</script>


<style scoped>
.t-all-ease {
  transition: all .5s ease;
}

.card-recipe-block {
  @apply w-full bg-blue-300 rounded-lg overflow-hidden shadow-md
}

.card-recipe-block.big-shadow {
  @apply shadow-xl
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

.card-recipe-block:hover .name,
.card-recipe-block .name.selected{
  @apply bg-blue-500 text-blue-100 cursor-pointer
}

.card-recipe-block .name.selected {
  @apply border-b-8
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

.card-recipe-block .confirm-delete-buttons {
  @apply flex items-center justify-center
}

.card-recipe-block .confirm-delete-buttons button{
  @apply mx-1 py-2 px-6 rounded-md text-sm text-blue-200 outline-none border-2 outline-none whitespace-no-wrap
}

.card-recipe-block .confirm-delete-buttons button.confirm {
  @apply bg-red-500 border-red-500
}

.card-recipe-block .confirm-delete-buttons button.confirm:hover {
  @apply bg-red-200 text-red-600
}

.card-recipe-block .confirm-delete-buttons button.cancel {
  @apply bg-blue-500 border-blue-500
}

.card-recipe-block .confirm-delete-buttons button.cancel:hover {
  @apply bg-blue-200 text-blue-600
}



@media (min-width: 640px) {
  .card-recipe-block {
    @apply w-1/3 max-w-xs
  }
}
</style>
