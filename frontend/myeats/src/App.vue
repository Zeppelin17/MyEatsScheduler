<script>
/**
 * Main App file
 *
 * @summary Main App file
 * @author Zeppelin17 <elzeppelin17@gmail.com>
 *
 * Created at     : 2020-04-29 17:23:13 
 * Last modified  : 2020-05-25 06:40:44
 */
</script>


<template>
  <div id="app">

    <!-- Public website -->
    <div v-if="webView">
      <header class="std-container header-container text-lg px-3 py-1 sm:px-12 sm:items-end">
        <img 
            class="h-20"
            src="./assets/img/logo.png" :alt="$t('header.logoAltText')"
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
        <router-view/>
      </div>

      <MainFooter />
    </div>
    


    <!-- User private area -->
    <div v-if="appView">
      
    </div>


  </div>
</template>


<script>
import LocaleSwitcher from '@/components/LocaleSwitcher.vue'
import MainMenu from '@/components/menus/MainMenu.vue'
import MainFooter from '@/components/MainFooter.vue'

export default {
  name: 'App',
  components: {
    LocaleSwitcher,
    MainMenu,
    MainFooter
  },
  data() {
    return {
      webView: true,
      appView: false,
      dropdownMenuVisible: false
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Righteous&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,400;0,700;1,400;1,700&family=Righteous&display=swap');

#app {
  font-family: 'Raleway', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#app .std-container {
  @apply text-gray-800
}

#app .header-container {
  @apply h-20 flex justify-between items-center bg-blue-200 overflow-visible
}

#app .dropdown {
  @apply static w-full bg-blue-200
}
#app .dropdown #nav {
  @apply flex flex-col items-center
}

h1, h2, h3, h4, h5, h6 {
  font-family: 'Righteous', cursive;
  line-height: 1.25;
}
#app .primary-color {
  @apply text-blue-900
}

#app .primary-color-light {
  @apply text-blue-400
}
#app h1 {
  @apply text-4xl
}
#app h2 {
  @apply text-3xl
}
#app h3 {
  @apply text-2xl
}
#app h4 {
  @apply text-xl
}
#app h5 {
  @apply text-lg
}
#app h6 {
  @apply text-base
}
</style>
