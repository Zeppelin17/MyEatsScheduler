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
    <header class="flex flex-wrap items-center justify-end px-3 bg-blue-200 mb-6">
      <MainMenu />
      <LocaleSwitcher />
    </header>
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
