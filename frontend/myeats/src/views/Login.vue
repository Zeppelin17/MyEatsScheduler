<script>
/**
 * Home View
 *
 * @summary Home View
 * @author Zeppelin17 <elzeppelin17@gmail.com>
 *
 * Created at     : 2020-04-29 17:23:47 
 * Last modified  : 2020-05-30 07:03:40
 */
</script>


<template>
    <div class="img-form-wrapper">
        <div class="image">
            <img src="../assets/img/login.jpg" alt="Sign in">
        </div>
        
        <div class="form">
            <img src="../assets/img/logo.png" alt="My Eats Scheduler">
            <h1>Sign in</h1>
            <form action="">
                <input type="text">
            </form>
            
            <router-link :to="$i18nRoute({ name: 'Home' })">
                {{ $t('mainMenu.home') }}
            </router-link>
        </div>
    </div>
</template>

<script>
import {TOGGLE_GENERAL_VIEW} from '@/store/actionTypes'

export default {
  name: 'login',
  mounted() {  // SE EJECUTA 2 VECES!!!!!!!!
      this.$store.dispatch(TOGGLE_GENERAL_VIEW, true)
      console.log("CREATED 2",this.$store.state.userInAppView)
  },
  beforeDestroy() {
      this.$store.dispatch(TOGGLE_GENERAL_VIEW, false)
  }
}
</script>

<style scoped>
.img-form-wrapper {
    @apply flex items-stretch -mx-3
}

.img-form-wrapper .image {

}

.img-form-wrapper .image img{
    @apply object-cover
}

@media (min-width: 640px) {
    .img-form-wrapper {
        @apply -mx-12
    }

    .img-form-wrapper .image, .img-form-wrapper .form {
        @apply w-1/2
    }
}
</style>
