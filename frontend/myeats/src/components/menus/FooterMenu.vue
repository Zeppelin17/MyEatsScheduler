<script>
/**
 * Footer menu component
 *
 * @summary Footer menu component
 * @author Zeppelin17 <elzeppelin17@gmail.com>
 *
 * Created at     : 2020-05-20 18:53:52  
 * Last modified  : 2020-05-20 19:02:43
 */
</script>

<template>
  <div id="nav">
      <router-link :to="$i18nRoute({ name: 'Home' })" >
        {{ $t('mainMenu.home') }}
      </router-link>
      <!-- <router-link :to="$i18nRoute({ name: 'About' })" >
        {{ $t('mainMenu.about') }}
      </router-link> -->
      <router-link :to="$i18nRoute({ name: 'Login' })" >
        {{ $t('mainMenu.login') }}
      </router-link>
  </div>
</template>

<style scoped>
#nav {
  @apply flex flex-col
}
#nav a {
  @apply px-2 mb-2
}

#nav a:hover {
  @apply text-blue-700
}

</style>