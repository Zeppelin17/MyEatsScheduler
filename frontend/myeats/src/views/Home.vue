<script>
/**
 * Home View
 *
 * @summary Home View
 * @author Zeppelin17 <elzeppelin17@gmail.com>
 *
 * Created at     : 2020-04-29 17:23:47 
 * Last modified  : 2020-04-29 17:24:09
 */
</script>


<template>
  <div class="home">
    
    <h2>{{ $t('home.welcome', {appName: 'MyEats Scheduler'}) }}</h2>
    <p>{{ $tc("home.newMessage", 0) }}</p>

    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    HelloWorld
  }
}
</script>
