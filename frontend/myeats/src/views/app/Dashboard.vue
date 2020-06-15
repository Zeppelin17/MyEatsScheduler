<script>
/**
 * Home View
 *
 * @summary Home View
 * @author Zeppelin17 <elzeppelin17@gmail.com>
 *
 * Created at     : 2020-06-07 15:58:57  
 * Last modified  : 2020-06-15 06:29:05
 */
</script>


<template>
    <div class="dashboard">
        <h1>dashboard</h1>
        <button @click="logout()">Logout</button>
    </div>
</template>

<script>
import { AUTH_LOGOUT } from '@/store/actionTypes'

export default {
  name: 'dashboard',
  data() {
      return {
          
      }
  },
  methods: {
      logout: function() {
          this.$store.dispatch(AUTH_LOGOUT)
          .then(() => {
              this.$router.push("/")
          })
      }
  }
}
</script>

<style scoped>

</style>
