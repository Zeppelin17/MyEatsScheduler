<script>
/**
 * Main menu component
 *
 * @summary Main menu component
 * @author Zeppelin17 <elzeppelin17@gmail.com>
 *
 * Created at     : 2020-04-29 16:52:59 
 * Last modified  : 2020-05-12 06:36:48
 */
</script>

<template>
  <div id="nav" class="text-xl py-3 px-3">
      <router-link :to="$i18nRoute({ name: 'Home' })" class="primary-color-light menu-item ">
        {{ $t('mainMenu.home') }}
      </router-link>
      <router-link :to="$i18nRoute({ name: 'About' })" class="primary-color-light menu-item">
        {{ $t('mainMenu.about') }}
      </router-link>
      <router-link :to="$i18nRoute({ name: 'Login' })" class="primary-color-light menu-item">
        {{ $t('mainMenu.login') }}
      </router-link>
  </div>
</template>

<style scoped>
#nav {
  font-family: 'Righteous', cursive;
}

#nav .menu-item {
  @apply px-3 py-2;
}
#nav .menu-item:hover {
  @apply bg-blue-500 rounded-lg text-blue-100 shadow-lg;
}

#nav a.router-link-exact-active {
  color: #2A4365;
}
</style>