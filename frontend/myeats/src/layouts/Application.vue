 <script>
/**
 * Layout for the application
 *
 * @summary Layout for the application
 * @author Zeppelin17 <elzeppelin17@gmail.com>
 *
 * Created at     : 2020-06-18 06:36:48 
 * Last modified  : 2020-06-28 08:32:15
 */
 </script>
<template>
    <!-- User private area -->
    <div class="app-view">
      <AppMenu />
      <slot/>
      <AppFooter />
    </div>
</template>


<script>
import AppMenu from '@/components/menus/AppMenu.vue'
import AppFooter from '@/components/AppFooter'

export default {
  components: {
    AppMenu,
    AppFooter
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