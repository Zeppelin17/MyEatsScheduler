<script>
/**
 * Main App file
 *
 * @summary Main App file
 * @author Zeppelin17 <elzeppelin17@gmail.com>
 *
 * Created at     : 2020-04-29 17:23:13 
 * Last modified  : 2020-05-12 07:00:22
 */
</script>


<template>
  <div id="app">
    <header class="flex justify-between items-center sm:items-end px-3 py-1 bg-blue-200 mb-6">
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


    <div class="container mx-auto text-lg sm:text-xl text-gray-800">
      <router-view/>
    </div>
  </div>
</template>


<script>
import LocaleSwitcher from '@/components/LocaleSwitcher.vue'
import MainMenu from '@/components/MainMenu.vue'

export default {
  name: 'App',
  components: {
    LocaleSwitcher,
    MainMenu
  },
  data() {
    return {
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
  text-align: center;
}

#app .dropdown {
  @apply -mt-6 static w-full bg-blue-200
}
#app .dropdown #nav {
  @apply flex flex-col
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
  font-size: 2.25rem
}
#app h2 {
  font-size: 1.875rem
}
#app h3 {
  font-size: 1.5rem
}
#app h4 {
  font-size: 1.25rem
}
#app h5 {
  font-size: 1.125rem
}
#app h6 {
  font-size: 1rem
}
</style>
