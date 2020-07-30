 <script>
/**
 * Layout for the application
 *
 * @summary Layout for the application
 * @author Zeppelin17 <elzeppelin17@gmail.com>
 *
 * Created at     : 2020-06-18 06:36:48 
 * Last modified  : 2020-07-30 06:46:22
 */
 </script>
<template>
    <!-- User private area -->
    <div class="app-view">
      <AppMenu v-if="isAuthenticated" />
      <slot/>
      <AppFooter v-if="isAuthenticated" />
    </div>
</template>


<script>
import AppMenu from '@/components/menus/AppMenu.vue'
import AppFooter from '@/components/AppFooter'
import { mapGetters } from 'vuex'

export default {
  components: {
    AppMenu,
    AppFooter
  },
  computed: {
      ...mapGetters({
          isAuthenticated: 'isAuthenticated'
      })
  },
  data() {
    return {
      dropdownMenuVisible: false
    }
  }
}
</script>


<style>
.app-view {
  @apply min-h-screen bg-blue-100
}

.app-view #app-menu-wrapper {
  @apply inline-block
}


</style>