<script>
/**
 * Week details view
 *
 * @summary Week details view
 * @author Zeppelin17 <elzeppelin17@gmail.com>
 *
 * Created at     : 2020-09-04 13:02:49 
 * Last modified  : 2020-09-11 09:07:09
 */
</script>


<template>
  <div class="week-detail">
    <div v-if="weekStatus === 'success'">
      <AppPageActionButtons
        :actions="pageActionButtons"
        v-on:execute-action="childEventEmit($event)"
      />

      <h1>{{ weekData.name }}</h1>

      <div class="week">
        <div
          v-if="Array.isArray(dayListOrdered) && dayListOrdered.length > 0"
          class="day"
          v-for="day in dayListOrdered"
          :key="day.id"
          @mouseover="overDayId = day.id"
          @mouseleave="overDayId = 0"
        >
          <div 
            class="head"
          >
            <span class="edit t-all-ease" >
              <button 
                class="t-all-ease" 
                v-show="day.id == overDayId && Array.isArray(day.splits) && day.splits.length > 0"
              >
                {{ $t('appPages.myeats.weekDetail.editButton') }}
              </button>
            </span>
            <span class="name">{{ day.name }}</span>
          </div>

          <div v-if="Array.isArray(day.splits) && day.splits.length > 0" class="split-wrapper">
            <div 
              v-for="split in day.splits"
              :key="split.id"
              class="split"
            >
              split name: {{ split.name }}
              <!-- 
                TODO: update this part with all info of recipes. 
                In create method, update all splits with their recipes
               -->
              <div
                v-for="recipe in split.recipes"
                :key="recipe"
              >
                Recipe ID: {{ recipe }}
              </div>
            </div>
          </div>
          
          <div v-else class="configure">
            <button class="t-all-ease">{{ $t('appPages.myeats.weekDetail.configureButton') }}</button>
          </div>
        </div>
      </div>
      

    </div>



    <UserNotification ref="notify"/>


    <ModalBox 
      v-show="isCreateWeekModalVisible"
      v-on:close='closeEditWeekModal'
    >
      <template v-slot:header>
        <h2>{{ $t('appPages.myeats.weekDetail.editWeekFormTitle') }}</h2>
      </template>

      <template v-slot:body>
        <CreateWeekForm 
          v-if="weekData.hasOwnProperty('name')"
          v-on:week-updated='weekUpdatedNotification($event)' 
          :editableData='weekData'
        />
      </template>

    </ModalBox>


    <ModalBox
      v-if="isConfirmDeleteModalVisible"
      v-on:close='closeDeleteConfirmationModal'
    >
      <template v-slot:header>
        <h2>{{ $t('appPages.myeats.weeks.deleteConfirmation') }}</h2>
      </template>

      <template v-slot:body>
        <div class="confirm-delete-buttons">
          <button class="confirm" @click="deleteWeekConfirmed">{{ $t('appPages.generic.yes') }}</button>
          <button class="cancel" @click="closeDeleteConfirmationModal">{{ $t('appPages.generic.no') }}</button>
        </div>
      </template>
    </ModalBox>


    <div v-if="weekStatus === 'loading'" id="details-loading">
        <img src="../../assets/img/loading.svg" alt="Loading">
        <p>{{ $t('appPages.myeats.weekDetail.loadingMsg') }}</p>
    </div>
    


  </div>
  
</template>

<script>
import { mapGetters } from 'vuex'
import { GET_WEEK_DAYS, GET_WEEKS, DELETE_WEEK } from '@/store/actionTypes'
import AppPageActionButtons from '@/components/AppPageActionButtons.vue'
import ModalBox from '@/components/blocks/ModalBox.vue'
import UserNotification from '@/components/UserNotification.vue'
import CreateWeekForm from '@/components/forms/CreateWeekForm.vue'


export default {
  name: "WeekDetail",
  
  components: {
    AppPageActionButtons,
    ModalBox,
    UserNotification,
    CreateWeekForm
  },

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
      weekData: {},
      isCreateWeekModalVisible: false,
      isConfirmDeleteModalVisible: false,
      overDayId: 0
    }
  },
  
  computed: {
    ...mapGetters({
      weekStatus: 'weekStatus',
      dayList: 'dayList',
      weekList: 'weekList'
    }),
  
    /**
     * If the first day of week is established as sunday, change days order
     */
    dayListOrdered() {
      if (this.dayList.length > 0 && this.weekList.length > 0) {
        let week = this.weekList.filter((w) => w.id === Number.parseInt(this.$route.params.id))
      
        if (week.length > 0 && week[0].first_day === "sun") {
          let newDays = this.dayList
          let sunday = newDays.pop()
          newDays.unshift(sunday)

          return newDays
        }
        return this.dayList
      }
      return this.dayList
    }
    
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
      this.isCreateWeekModalVisible = true
    },

    deleteWeek() {
      this.isConfirmDeleteModalVisible = true
    },

    closeEditWeekModal() {
      this.isCreateWeekModalVisible = false
    },

    closeDeleteConfirmationModal() {
      this.isConfirmDeleteModalVisible = false
    },

    deleteWeekConfirmed() {
      this.$store.dispatch(DELETE_WEEK, this.weekData.id)
      .then(() => {
        this.$router.push({name: 'MyEats'})
        this.$refs.notify.success(event, this.$t("appPages.myeats.weeks.weekDeleteSuccess"), 3000, true)
      })
      
    },

    weekUpdatedNotification(newWeek) {
      this.closeEditWeekModal()
      this.getWeekData()

      const week = {
        first_day: newWeek.first_day,
        name: newWeek.name
      }

      this.setWeek(week)
      
      this.$refs.notify.success(event, this.$t("appPages.myeats.weekDetail.weekEditedSuccess"), 3000, true)
    },

    setWeek(week) {
      this.weekData = week
    },

    async getWeeks() {
      await this.$store.dispatch(GET_WEEKS)
    },

    async getWeekData() {
      await this.$store.dispatch(GET_WEEK_DAYS, this.$route.params.id)
    }
  },

  created() {
    // get week related data
    this.getWeekData()
    this.getWeeks()
  },

  watch: {
    weekList() {
      const week = this.weekList.filter((w) => w.id === Number.parseInt(this.$route.params.id))
      if (week.length > 0) this.setWeek(week[0])
    }
  }
}
</script>

<style scoped>
.t-all-ease {
  transition: all .5s ease;
}

.week-detail {
  @apply px-6
}

.week-detail h1 {
  @apply text-center mb-5
}

.week-detail .week {
  @apply flex justify-between overflow-x-hidden overflow-x-scroll;
  height: 80vh;
}

.week-detail .week .day {
  @apply min-w-full max-w-full border-blue-900 border-2 rounded-md mr-1 overflow-hidden
}

.week-detail .week .day .head {
  @apply flex flex-col bg-blue-900 text-blue-100 pt-1 pb-3 px-3
}

.week-detail .week .day .head.no-button {
  @apply pt-6
}

.week-detail .week .day .head .edit {
  @apply self-end
}

.week-detail .week .day .head .edit button {
  @apply border-blue-300 border rounded-sm px-3 text-xs outline-none
}

.week-detail .week .day .head .edit button:hover {
  @apply bg-blue-300 text-blue-900 shadow-md
}

.week-detail .week .day .head .name {
  @apply self-center text-lg  mt-3
}

.week-detail .week .day .configure button{
  @apply block mx-auto my-24 border-blue-900 border-2 bg-blue-900 text-blue-200 rounded-md p-2 outline-none
}

.week-detail .week .day .configure button:hover {
  @apply bg-blue-200 text-blue-900
}

.week-detail #details-loading {
    @apply absolute flex flex-col items-center justify-center inset-0 bg-blue-700 bg-opacity-75 m-auto
}

.week-detail #details-loading p {
    @apply font-bold text-xl px-2 py-1 bg-blue-900 text-gray-200 rounded-lg
}

.week-detail .confirm-delete-buttons {
  @apply flex items-center justify-center
}

.week-detail .confirm-delete-buttons button{
  @apply mx-1 py-2 px-6 rounded-md text-sm text-blue-200 outline-none border-2 outline-none whitespace-no-wrap
}

.week-detail .confirm-delete-buttons button.confirm {
  @apply bg-red-500 border-red-500
}

.week-detail .confirm-delete-buttons button.confirm:hover {
  @apply bg-red-200 text-red-600
}

.week-detail .confirm-delete-buttons button.cancel {
  @apply bg-blue-500 border-blue-500
}

.week-detail .confirm-delete-buttons button.cancel:hover {
  @apply bg-blue-200 text-blue-600
}

/* MEDIUM SIZES */
@media (min-width: 640px) {
  .week-detail .week {
    @apply h-auto;
    min-height: 75vh;
  }

  .week-detail .week .day {
    min-width: 33%;
  }
}

/* LARGE SIZES */
@media (min-width: 1024px) {
  .week-detail .week {
    @apply overflow-auto
  }

  .week-detail .week .day {
    @apply w-full min-w-0 max-w-none
  }
}
</style>