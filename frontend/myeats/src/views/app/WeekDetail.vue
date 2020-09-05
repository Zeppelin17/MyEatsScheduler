<script>
/**
 * Week details view
 *
 * @summary Week details view
 * @author Zeppelin17 <elzeppelin17@gmail.com>
 *
 * Created at     : 2020-09-04 13:02:49 
 * Last modified  : 2020-09-05 09:17:08
 */
</script>


<template>
  <div class="week-detail">
    <div v-if="weekStatus === 'success'">
      <AppPageActionButtons
        :actions="pageActionButtons"
        v-on:execute-action="childEventEmit($event)"
      />

      <h1>ID de la semana: {{ this.$route.params.id }}</h1>


    </div>


    <div v-if="weekStatus === 'loading'" id="details-loading">
        <img src="../../assets/img/loading.svg" alt="Loading">
        <p>{{ $t('appPages.myeats.weekDetail.loadingMsg') }}</p>
    </div>



  </div>
  
</template>

<script>
import { mapGetters } from 'vuex'
import { GET_WEEK_DAYS } from '@/store/actionTypes'
import AppPageActionButtons from '@/components/AppPageActionButtons.vue'
import ModalBox from '@/components/blocks/ModalBox.vue'
import UserNotification from '@/components/UserNotification.vue'

export default {
  name: "WeekDetail",
  data() {
    return {
      pageActionButtons: [
        {
          type: "return",
          entity: "Week",
          text: this.$t('appPages.myeats.weekDetail.backToMyeatsButton'),
          onClick: "backToWeeksList"
        },
        {
          type: "edit",
          entity: "Week",
          text: this.$t('appPages.myeats.weekDetail.editButton'),
          onClick: "editWeek"
        },
        {
          type: "delete",
          entity: "Week",
          text: this.$t('appPages.myeats.weekDetail.deleteButton'),
          onClick: "deleteWeek"
        }
      ],
    }
  },
  components: {
    AppPageActionButtons,
    ModalBox,
    UserNotification
  },
  computed: {
    ...mapGetters({
      weekStatus: 'weekStatus',
      dayList: 'dayList'
    }),
  },
  methods: {
    /**
     * This function receives a method name and it executes dynamicly
     */
    childEventEmit(action) {
      this[action]()
    },

    backToWeeksList() {
      this.$router.push({name: 'MyEats'})
    },

    editWeek() {
      /**
       * TODO: Show modal box to edit week name/first day
       */
    },

    deleteWeek() {
      /**
       * TODO: Show modal box to confirm deletion of week
       */
    },

    async getWeekData() {
      await this.$store.dispatch(GET_WEEK_DAYS, this.$route.params.id)
    }
  },

  created() {
    // get week related data
    this.getWeekData()
  }
}
</script>

<style scoped>
.week-detail #details-loading {
    @apply absolute flex flex-col items-center justify-center inset-0 bg-blue-700 bg-opacity-75 m-auto
}

.week-detail #details-loading p {
    @apply font-bold text-xl px-2 py-1 bg-blue-900 text-gray-200 rounded-lg
}
</style>