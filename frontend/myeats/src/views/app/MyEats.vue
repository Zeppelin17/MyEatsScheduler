<script>
/**
 * MyEats main view listing weeks
 *
 * @summary MyEats main view listing weeks
 * @author Zeppelin17 <elzeppelin17@gmail.com>
 *
 * Created at     : 2020-06-07 15:58:57  
 * Last modified  : 2020-09-04 13:23:57
 */
</script>


<template>
  <div class="myeats">

    <AppPageActionButtons
        :actions="pageActionButtons"
        v-on:execute-action="childEventEmit($event)"
    />

    <h1>{{ $t('appPages.myeats.weeks.mainTitle') }}</h1>

    <div v-if="weekList.length === 0 && weekStatus !== 'loading'" class="no-weeks-img">
      <h2>{{ $t('appPages.myeats.weeks.noWeeks') }}</h2>
      <img src="../../assets/img/diet.svg" :alt="$t('appPages.myeats.weeks.noWeeks')">
    </div>


    <h4 v-if="selectedWeeks.length > 0">{{ $t('appPages.myeats.weeks.selectedWeeks', {num: selectedWeeks.length}) }}</h4>
    <div class="filter" v-if="this.weekList.length > 0">
      <form>
        <div class="form-group">
            <label for="filter-name">
                <span>{{ $t('appPages.myeats.weeks.filterName') }}</span>
                <input v-model="filterName" name="filter-name" type="text" autocomplete="off" />
            </label>
        </div>
      </form>
    </div>


    <div class="cards-wrapper">
        <CardWeekBlock
          v-for="week in weeksListPaginated"
          :key="week.id"
          :id="week.id" 
          :name="week.name"
          v-on:week-deleted="weekDeletedNotification()"
          v-on:week-selected="updateSelectedWeeks($event)"
        />
      </div>

      <Pagination v-if="PagTotalPages >= 1"
          :maxVisibleButtons=PagMaxVisibleButtons
          :totalPages=PagTotalPages
          :total=PagTotal
          :currentPage=PagCurrentPage
          v-on:pagechanged="updatePagination($event)"
        />

    


    <UserNotification ref="notify"/>


    <ModalBox 
      v-show="isCreateWeekModalVisible"
      v-on:close='closeCreateWeekModal'
    >
      <template v-slot:header>
        <h2>{{ $t('appPages.myeats.weeks.createWeekFormTitle') }}</h2>
      </template>

      <template v-slot:body>
        <CreateWeekForm v-on:week-created='weekCreatedNotification' />
      </template>

    </ModalBox>
    
    <!-- 
      Todo: figure out why using v-show instead of v-if here shows wrong modal 
      the second time you do a bactch delete.
    -->
    <ModalBox
      v-if="isConfirmDeleteModalVisible"
      v-on:close='closeBatchDeleteConfirmationModal'
    >
      <template v-slot:header>
        <h2>{{ $t('appPages.myeats.weeks.batchDeleteConfirmation') }}</h2>
      </template>

      <template v-slot:body>
        <div class="confirm-delete-buttons">
          <button class="confirm" @click="deleteWeeksConfirmed">{{ $t('appPages.generic.yes') }}</button>
          <button class="cancel" @click="closeBatchDeleteConfirmationModal">{{ $t('appPages.generic.no') }}</button>
        </div>
      </template>
    </ModalBox>


    <div v-if="weekStatus === 'loading'" id="week-loading">
        <img src="../../assets/img/loading.svg" alt="Loading">
        <p>{{ $t('appPages.myeats.weeks.loadingMsg') }}</p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { GET_WEEKS } from '@/store/actionTypes'
import UserNotification from '@/components/UserNotification.vue'
import AppPageActionButtons from '@/components/AppPageActionButtons.vue'
import CardWeekBlock from '@/components/blocks/CardWeekBlock.vue'
import Pagination from '@/components/blocks/Pagination.vue'
import CreateWeekForm from '@/components/forms/CreateWeekForm.vue'
import ModalBox from '@/components/blocks/ModalBox.vue'
import { DELETE_WEEK } from '../../store/actionTypes'


export default {
  name: 'myeats',
  components: {
    AppPageActionButtons,
    UserNotification,
    Pagination,
    CardWeekBlock,
    ModalBox,
    CreateWeekForm
  },
  data() {
      return {
        selectedWeeks: [],
        isCreateWeekModalVisible: false,
        isConfirmDeleteModalVisible: false,
        pageActionButtons: [
          {
            type: "create",
            entity: "Week",
            text: this.$t('appPages.myeats.weeks.createButton'),
            onClick: "createNewWeek"
          },
          {
            type: "delete",
            entity: "Week",
            text: this.$t('appPages.myeats.weeks.batchDeleteButton'),
            onClick: "showBatchDeleteConfirmationModal",
            visible: false
          }
        ],
        PagMaxVisibleButtons: 3,
        PagTotalPages: 0,
        PagTotal: 0,
        PagCurrentPage: 1,
        PagNumItems: 6,
        filterName: "",
      }
  },
  computed: {
    ...mapGetters({
          weekList: 'weekList',
          weekStatus: 'weekStatus'
      }),

      weeksListPaginated() {

        let weeksToPaginate = this.filterWeeks(this.weekList)

        if (weeksToPaginate.length <= this.PagNumItems) {
          return weeksToPaginate
        }

        return weeksToPaginate.slice((this.PagCurrentPage-1)*this.PagNumItems, (this.PagCurrentPage*this.PagNumItems))
      }
  },


  methods: {
    /**
     * This function receives a method name and it executes dynamicly
     */
    childEventEmit(action) {
      this[action]()
    },

    createNewWeek() {
      this.showCreateWeekModal()
    },

    closeCreateWeekModal() {
      this.isCreateWeekModalVisible = false
    },

    showCreateWeekModal() {
      this.isCreateWeekModalVisible = true
    },

    closeBatchDeleteConfirmationModal() {
      this.isConfirmDeleteModalVisible = false
    },

    showBatchDeleteConfirmationModal() {
      this.isConfirmDeleteModalVisible = true
    },

    deleteWeeksConfirmed() {
      this.closeBatchDeleteConfirmationModal()
      this.selectedWeeks.forEach((id) => {
        this.$store.dispatch(DELETE_WEEK, id)
      })
      this.selectedWeeks = []
      this.$refs.notify.success(event, this.$t("appPages.myeats.weeks.weekBatchDeleteSuccess"), 2000, true)
    },

    weekCreatedNotification() {
      this.closeCreateWeekModal()
      this.getWeeks()

      this.$refs.notify.success(event, this.$t("appPages.myeats.weeks.weekCreatedSuccess"), 10000, true)
      //this.$refs.notify.info(event, "info notification", 5000, true)
      //this.$refs.notify.warning(event, "warning notification", 10000, true)
      //this.$refs.notify.error(event, "error notification", 10000, true)
      //this.$refs.notify.success(event, "success notification", 10000, true)
    },

    filterWeeks(weeks) {
      if (this.filterName.trim() === "") {
        return weeks
      }
      
      let filteredByName = weeks.filter((week) => this.filterName.trim().length > 0 && week.name.includes(this.filterName.trim()))

      return filteredByName
    },

    weekDeletedNotification() {
      this.$refs.notify.success(event, this.$t("appPages.myeats.weeks.weekDeleteSuccess"), 2000, true)
    },

    updateSelectedWeeks(weekInfo) {
      if (weekInfo.selected) {
        this.selectedWeeks.push(weekInfo.id)
      }else {
        this.selectedWeeks = this.selectedWeeks.filter((id) => id != weekInfo.id)
      }
    },

    updatePagination(pag) {
      this.selectedRecipes = []
      this.PagCurrentPage = pag
    },

    async getWeeks() {
      await this.$store.dispatch(GET_WEEKS)
    }
  },

  created() {
    this.getWeeks()   
  },

  watch: {
    weekList() {
      this.PagTotal = this.weekList.length
      this.PagTotalPages = Math.ceil(this.PagTotal / this.PagNumItems)
    },

    /**
     * To control if the "delete selected" button should be displayed or not
     * looking at the length of selected recipes
     */
    selectedWeeks() {
      if (this.selectedWeeks.length > 0) {
        this.pageActionButtons[1].visible = true
      }else{
        this.pageActionButtons[1].visible = false
      }
    }
  }
}
</script>

<style scoped>
.myeats {
  @apply text-center
}

.myeats .no-weeks-img {
  @apply flex flex-col justify-center
}

.myeats .no-weeks-img img {
  @apply w-5/12 mx-auto mb-10
}

.myeats .no-weeks-img h2{
  @apply  mt-6 mb-12
}

.myeats .cards-wrapper {
  @apply flex flex-wrap justify-center
}

.myeats .cards-wrapper .card-week-block {
  @apply m-3
}

.myeats #week-loading {
    @apply absolute flex flex-col items-center justify-center inset-0 bg-blue-700 bg-opacity-75 m-auto
}

.myeats #week-loading p {
    @apply font-bold text-xl px-2 py-1 bg-blue-900 text-gray-200 rounded-lg
}

.myeats .filter form {
    @apply flex flex-grow items-center justify-center flex-wrap
}

.myeats .filter form .form-group {
    @apply m-2
}

.myeats .filter form .form-group label {
    @apply flex flex-col mx-auto bg-blue-300 rounded-t-md rounded-b-md border-2 border-blue-300
}
.myeats .filter form .form-group label span {
    @apply py-1 px-2 pb-0 text-left text-xs text-gray-600
}

.myeats .filter form .form-group label input {
    @apply py-1 px-2 bg-blue-300 rounded-b-md
}

.myeats .filter form input:focus {
    @apply outline-none shadow-md
}

.myeats .confirm-delete-buttons {
  @apply flex items-center justify-center
}

.myeats .confirm-delete-buttons button{
  @apply mx-1 py-2 px-6 rounded-md text-sm text-blue-200 outline-none border-2 outline-none whitespace-no-wrap
}

.myeats .confirm-delete-buttons button.confirm {
  @apply bg-red-500 border-red-500
}

.myeats .confirm-delete-buttons button.confirm:hover {
  @apply bg-red-200 text-red-600
}

.myeats .confirm-delete-buttons button.cancel {
  @apply bg-blue-500 border-blue-500
}

.myeats .confirm-delete-buttons button.cancel:hover {
  @apply bg-blue-200 text-blue-600
}


@media (min-width: 640px) {
  .myeats .no-weeks-img img {
    @apply w-2/5 mx-auto
  }
}
</style>
