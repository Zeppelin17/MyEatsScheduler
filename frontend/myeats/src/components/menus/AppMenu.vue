<script>
/**
 * App main menu component
 *
 * @summary App main menu component
 * @author Zeppelin17 <elzeppelin17@gmail.com>
 *
 * Created at     : 2020-06-15 16:06:48
 * Last modified  : 2020-06-24 09:23:12
 */
</script>

<template>
  <div id="app-menu-wrapper">
    
    <button @click="toggleMenu()" class="menu-icon rotate"><img src="../../assets/img/ikonate/hamburger.svg"></button>
    

    <transition name="fade">
      <div v-show="showMenu" @click="toggleMenu()" class="back-cover"></div>
    </transition>
    
    
    <transition name="slide-left">
      <div v-show="showMenu" id="app-menu">

        <div class="top-options">
          <LocaleSwitcher :isInAppMenu="true" />
        
          <div class="close-menu-wrapper">
            <button @click="toggleMenu()" class="close-menu"><img src="../../assets/img/ikonate/close.svg"></button>
          </div>
        </div>
        

        <div class="separator"></div> 
        
        <router-link 
          @click.native="toggleMenu()" 
          :to="$i18nRoute({ name: 'Dashboard' })" 
          class="app-menu-item"
        >
          <img src="../../assets/img/ikonate/apps.svg"> {{ $t('appMenu.dashboard') }}
        </router-link>
        <router-link 
          @click.native="toggleMenu()" 
          :to="$i18nRoute({ name: 'MyEats' })" 
          class="app-menu-item"
        >
          <img src="../../assets/img/ikonate/calendar-event.svg"> {{ $t('appMenu.myeats') }}
        </router-link>
        <router-link 
          @click.native="toggleMenu()" 
          :to="$i18nRoute({ name: 'Recipes' })" 
          class="app-menu-item"
        >
          <img src="../../assets/img/ikonate/pizza.svg"> {{ $t('appMenu.recipes') }}
        </router-link>
        <router-link 
          @click.native="toggleMenu()" 
          :to="$i18nRoute({ name: 'Profile' })" 
          class="app-menu-item"
        >
          <img src="../../assets/img/ikonate/user.svg"> {{ $t('appMenu.profile') }}
        </router-link>
        <!-- <router-link 
          @click.native="toggleMenu()" 
          :to="$i18nRoute({ name: 'Help' })" 
          class="app-menu-item"
        >
          <img src="../../assets/img/ikonate/help.svg"> {{ $t('appMenu.help') }}
        </router-link> -->

        <div class="separator"></div>

        <button 
          @click="logout()" 
          class="app-menu-item logout"
        >
          <img src="../../assets/img/ikonate/exit.svg">  {{ $t('appMenu.logout') }}
        </button>
      </div>
    </transition>
    
  </div>
  
</template>


<script>
import { AUTH_LOGOUT } from '@/store/actionTypes'
import LocaleSwitcher from '@/components/LocaleSwitcher.vue'

export default {
  name: 'appmenu',
  data() {
      return {
          showMenu: false
      }
  },
  components: {
    LocaleSwitcher
  },
  methods: {
      logout: function() {
          this.$store.dispatch(AUTH_LOGOUT)
          .then(() => {
              this.$router.push("/")
          })
      },
      toggleMenu: function() {
        this.showMenu = !this.showMenu
      }
  }
}
</script>

<style scoped>

.slide-left-enter-active, .fade-enter-active{
  transition: all .5s ease;
}
.slide-left-leave-active, .fade-leave-active{
  transition: all .5s ease;
}
.slide-left-enter, .slide-left-leave-to {
  transform: translateX(-500px);
  opacity: 1;
}
.fade-enter, .fade-leave-to {
  transition: opacity;
  opacity: 0;
}
.rotate {
  transition: all 1s ease;
  transform: rotateZ(0deg) scale(1);
}
.rotate:hover {
  transition: all .3s ease;
  transform: rotateZ(-180deg) scale(1.25);  
}



#app-menu-wrapper {
  @apply relative p-4 
}

#app-menu-wrapper button {
  @apply outline-none
}

#app-menu-wrapper .back-cover {
  width: 100vw;
  height: 100vh;
  @apply fixed inset-0 z-10 bg-gray-900 bg-opacity-50;
}

#app-menu {
  font-family: 'Righteous', cursive;
  height: 100vh;
  @apply p-4 w-4/5 max-w-sm bg-blue-400 fixed inset-0 z-10 shadow-lg overflow-hidden overflow-y-auto;
}

#app-menu .top-options{
  @apply flex items-center justify-between
}

#app-menu .app-menu-item {
  @apply flex items-start items-center mb-4 text-blue-900
}

#app-menu .app-menu-item.router-link-exact-active.router-link-active {
  @apply text-blue-100
}

#app-menu .app-menu-item.logout {
  @apply w-full
}

#app-menu .app-menu-item img{
  @apply mr-3;
  transition: all .5s ease;
  transform: rotate(0deg);
}

#app-menu .app-menu-item:hover img{
  @apply text-blue-100;
  transform: rotate(15deg);
}

#app-menu .close-menu-wrapper{
  @apply text-right
}

#app-menu .app-menu-item:hover {
  @apply text-blue-100;
  transition: all .3s ease;
}

#app-menu .close-menu {
  @apply w-10 px-1 py-1;
  transition: all .3s ease;
}

#app-menu .close-menu:hover {
  @apply w-10;
  transform: rotate(-90deg);
}

#app-menu .separator {
  @apply my-6 border-t border-blue-300
}

@media (min-width: 640px) {
  #app-menu {
    @apply w-5/12
  }
}

@media (min-width: 768px) {
  #app-menu {
    @apply w-1/3
  }
}



</style>