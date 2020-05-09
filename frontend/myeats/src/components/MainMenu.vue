<script>
/**
 * Main menu component
 *
 * @summary Main menu component
 * @author Zeppelin17 <elzeppelin17@gmail.com>
 *
 * Created at     : 2020-04-29 16:52:59 
 * Last modified  : 2020-04-29 16:55:33
 */
</script>

<template>
  <div id="nav">
    <router-link :to="$i18nRoute({ name: 'Home' })">
      {{ $t('mainMenu.home') }}
    </router-link> |
    <router-link :to="$i18nRoute({ name: 'About' })">
      {{ $t('mainMenu.about') }}
      </router-link>
  </div>
</template>