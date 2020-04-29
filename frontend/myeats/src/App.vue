<script>
/**
 * Main App file
 *
 * @summary Main App file
 * @author Zeppelin17 <elzeppelin17@gmail.com>
 *
 * Created at     : 2020-04-29 17:23:13 
 * Last modified  : 2020-04-29 17:23:28
 */
</script>


<template>
  <div id="app">
    <LocaleSwitcher />
    <MainMenu />
    <router-view/>
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
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
