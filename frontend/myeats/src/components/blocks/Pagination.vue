<script>
/**
 * Pagination component
 *
 * @summary Pagination component
 * @author Zeppelin17 <elzeppelin17@gmail.com>
 *
 * Created at     : 2020-08-17 15:39:02
 * Last modified  : 2020-08-18 06:31:56
 */
</script>


<template>
  <div class="pagination-wrapper">
    <ul class="pagination">
      <li class="pagination-item">
        <button type="button" @click="onClickFirstPage" :disabled="isInFirstPage">{{ $t('appPages.pagination.first') }}</button>
      </li>
      <li class="pagination-item">
        <button type="button" @click="onClickPreviousPage" :disabled="isInFirstPage">{{ $t('appPages.pagination.prev') }}</button>
      </li>
      
      <li class="pagination-item" 
        v-for="page in pages"
        :key="page.name"
        v-show="page.name > 0"
      >
        <button 
          type="button" 
          @click="onClickPage(page.name)" 
          :disabled="page.isDisabled"
          :class="{ active: isPageActive(page.name) }"
        >
          {{ page.name }}
        </button>
      </li>

      <li class="pagination-item">
        <button type="button" @click="onClickNextPage" :disabled="isInLastPage">{{ $t('appPages.pagination.next') }}</button>
      </li>
      <li class="pagination-item">
        <button type="button" @click="onClickLastPage" :disabled="isInLastPage">{{ $t('appPages.pagination.last') }}</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {    
  name: "pagination",
  props: {
    maxVisibleButtons: {
      type: Number,
      required: false,
      default: 3
    },
    totalPages: {
      type: Number,
      required: true
    },
    total: {
      type: Number,
      required: true
    },
    currentPage: {
      type: Number,
      required: true
    }
  },

  computed: {
    startPage() {
      // when on the first page
      if (this.currentPage === 1) {
        return 1
      }
      // when on the last page
      if (this.currentPage === this.totalPages) {
        return this.totalPages - this.maxVisibleButtons + 1
      }

      // when in between
      return this.currentPage - 1
    },

    endPage() {
      return Math.min(this.startPage + this.maxVisibleButtons - 1, this.totalPages)
    },

    pages() {
      const range = [];

      for (let i = this.startPage; i <= this.endPage; i += 1) {
          range.push({
            name: i,
            isDisabled: i === this.currentPage
          })
      }

      return range
    },

    isInFirstPage() {
      return this.currentPage === 1
    },
    
    isInLastPage() {
      return this.currentPage === this.totalPages
    }
  },

  methods: {
    onClickFirstPage() {
      this.$emit("pagechanged", 1)
    },

    onClickPreviousPage() {
      this.$emit("pagechanged", this.currentPage - 1)
    },

    onClickPage(page) {
      this.$emit("pagechanged", page)
    },

    onClickNextPage() {
      this.$emit("pagechanged", this.currentPage + 1)
    },

    onClickLastPage() {
      this.$emit("pagechanged", this.totalPages)
    },

    isPageActive(page) {
      return this.currentPage === page
    } 
  }
}
</script>

<style scoped>
  .pagination {
    @apply flex flex-wrap items-center justify-center m-auto mt-5
  }

  .pagination .pagination-item button{
    @apply bg-blue-400 border-blue-400 border-2 m-1 py-1 px-2 rounded-sm outline-none text-sm
  }

  .pagination .pagination-item button.active{
    @apply border-blue-900
  }

  .pagination .pagination-item button:hover{
    @apply border-blue-900 text-blue-200
  }
</style>