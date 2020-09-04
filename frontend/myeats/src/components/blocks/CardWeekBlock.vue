<script>
/**
 * Block component to show a card of a week
 *
 * @summary Block component to show a card of a week
 * @author Zeppelin17 <elzeppelin17@gmail.com>
 *
 * Created at     : 2020-09-03 06:13:59 
 * Last modified  : 2020-09-04 12:21:29
 */
</script>

<template>
  <div class="card-week-block t-all-ease" :class="selected ? 'big-shadow' : ''">
    <div 
      @click="toggleSelected"
      class="name t-all-ease" 
      :class="selected ? 'selected' : ''"
    >
        <p>{{ name }}</p>
    </div>
    <div class="content-wrapper">
      
      <div class="action">
        <router-link :to="$i18nRoute({ name: 'WeekDetail', params: {id: id} })" class="button t-all-ease">
          {{ $t('appPages.myeats.weeks.openWeek') }}
        </router-link>

        <a href="#" @click.prevent="showConfirmDeleteModal" class="button danger t-all-ease">
          {{ $t('appPages.myeats.weeks.deleteWeek') }}
        </a>
      </div>
    </div>


    <ModalBox 
      v-show="isConfirmDeleteModalVisible"
      v-on:close='closeConfirmDeleteModal'
    >
      <template v-slot:header>
        <h2>{{ $t('appPages.myeats.weeks.deleteConfirmation') }}</h2>
      </template>

      <template v-slot:body>
        <div class="confirm-delete-buttons">
          <button class="confirm" @click="deleteWeekConfirmed">{{ $t('appPages.generic.yes') }}</button>
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
import { DELETE_WEEK } from '@/store/actionTypes'

export default {
  name: 'CardWeekBlock',
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
    deleteWeek() {
      this.showConfirmDeleteModal()
    },

    deleteWeekConfirmed() {
      this.$store.dispatch(DELETE_WEEK, this.id)
      this.$emit('week-deleted')
    },

    toggleSelected() {
      this.selected = !this.selected
      const values = {
        id: this.id,
        selected: this.selected
      }
      this.$emit('week-selected', values)
    }
    
  }
}
</script>


<style scoped>
.t-all-ease {
  transition: all .5s ease;
}

.card-week-block {
  @apply w-full bg-blue-300 rounded-lg overflow-hidden shadow-md
}

.card-week-block.big-shadow {
  @apply shadow-xl
}

.card-week-block .content-wrapper {
  @apply p-4
}

.card-week-block .name{
  @apply px-3 py-10 bg-blue-900 border-blue-900 border-b-4 text-xl leading-tight font-bold text-blue-200 overflow-hidden
}

.card-week-block:hover .name,
.card-week-block .name.selected{
  @apply bg-blue-500 text-blue-100 cursor-pointer
}

.card-week-block .name.selected {
  @apply border-b-8
}

.card-week-block .action {
  @apply flex items-center justify-around mt-6 mb-1
}

.card-week-block .action .button {
  @apply block w-full p-1 m-2 text-center text-sm rounded-md bg-blue-900 text-blue-200 border-2 border-blue-900 outline-none align-bottom
}

.card-week-block .action .button:hover {
  @apply bg-blue-200 text-blue-900 font-bold
}

.card-week-block .confirm-delete-buttons {
  @apply flex items-center justify-center
}

.card-week-block .confirm-delete-buttons button{
  @apply mx-1 py-2 px-6 rounded-md text-sm text-blue-200 outline-none border-2 outline-none whitespace-no-wrap
}

.card-week-block .confirm-delete-buttons button.confirm {
  @apply bg-red-500 border-red-500
}

.card-week-block .confirm-delete-buttons button.confirm:hover {
  @apply bg-red-200 text-red-600
}

.card-week-block .confirm-delete-buttons button.cancel {
  @apply bg-blue-500 border-blue-500
}

.card-week-block .confirm-delete-buttons button.cancel:hover {
  @apply bg-blue-200 text-blue-600
}



@media (min-width: 640px) {
  .card-week-block {
    @apply w-1/3 max-w-xs
  }
}
</style>
