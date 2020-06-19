 <script>
/**
 * Layout for the website
 *
 * @summary Layout for the website
 * @author Zeppelin17 <elzeppelin17@gmail.com>
 *
 * Created at     : 2020-06-18 06:36:48 
 * Last modified  : 2020-06-18 06:38:02
 */
 </script>

<template>
    <!-- Public website -->
    <div>
      <header class="std-container header-container text-lg px-3 py-1 sm:px-12 sm:items-end">
        <img 
            class="h-20"
            src="../assets/img/logo.png" :alt="$t('header.logoAltText')"
          >
        
        <div class="block sm:hidden">
          <button
            @click="dropdownMenuVisible = !dropdownMenuVisible"
            class="flex items-center px-3 py-2 border rounded primary-color border-blue-900 hover:text-white hover:border-blue-400"
          >
            <svg class="fill-current h-4 w-4" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
          </button>
        </div>

        <div class="hidden sm:flex sm:items-end">
          <MainMenu />
          <LocaleSwitcher />
        </div>
      </header>

      <div 
        @click="dropdownMenuVisible = !dropdownMenuVisible"
        :class="dropdownMenuVisible ? 'dropdown' : 'hidden'"
      >
        <MainMenu />
      </div>


      <div class="std-container text-lg px-3 sm:px-12 sm:text-xl">
        <slot/>
      </div>

      <MainFooter />
    </div>
</template>


<script>
import LocaleSwitcher from '@/components/LocaleSwitcher.vue'
import MainMenu from '@/components/menus/MainMenu.vue'
import MainFooter from '@/components/MainFooter.vue'

export default {
  components: {
    LocaleSwitcher,
    MainMenu,
    MainFooter
  },
  data() {
    return {
      dropdownMenuVisible: false
    }
  }
}
</script>