<script>
/**
 * Main App file
 *
 * @summary Main App file
 * @author Zeppelin17 <elzeppelin17@gmail.com>
 *
 * Created at     : 2020-04-29 17:23:13 
 * Last modified  : 2020-06-10 06:42:33
 */
</script>


<template>
  <div id="app">
    <component :is="layout">
      <router-view />
    </component>
  </div>
</template>


<script>
import axios from 'axios'
import {AUTH_LOGOUT} from './store/actionTypes'

const default_layout = 'application'

export default {
  name: 'App',
  computed: {
    layout() {
      return (this.$route.meta.layout || default_layout) + '-layout'
    }
  },
  created() {   
    //logout if get unauthorized error
    axios.interceptors.response.use(undefined, function (err) {
      return new Promise(function (resolve, reject) {
        if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
        // if you ever get an unauthorized, logout the user
          this.$store.dispatch(AUTH_LOGOUT)
          this.$router.push({name: 'Login'})
        }
        throw err
      })
    })
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
