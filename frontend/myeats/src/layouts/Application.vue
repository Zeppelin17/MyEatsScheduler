 <script>
/**
 * Layout for the application
 *
 * @summary Layout for the application
 * @author Zeppelin17 <elzeppelin17@gmail.com>
 *
 * Created at     : 2020-06-18 06:36:48 
 * Last modified  : 2020-06-19 17:09:41
 */
 </script>
<template>
    <!-- User private area -->
    <div>
      <AppMenu />
      <slot/>
    </div>
</template>


<script>
import AppMenu from '@/components/menus/AppMenu.vue'

export default {
  components: {
    AppMenu
  },
  data() {
    return {
      dropdownMenuVisible: false
    }
  }
}
</script>