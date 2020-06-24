<script>
/**
 * Block component to show a card with content
 *
 * @summary Block component to show a card with content
 * @author Zeppelin17 <elzeppelin17@gmail.com>
 *
 * Created at     : 2020-06-20 06:45:41 
 * Last modified  : 2020-06-23 06:52:32
 */
</script>
<template>
  <div class="card">
    <div class="image">
        <div class="hover-icon t-all-ease">
          <img class="hover-img" :src="require('../../assets/img/ikonate/' + hoverIconName)">
        </div>
        <img class="main" :src="require('../../assets/img/' + imageName)" alt="">
    </div>
    <div class="content-wrapper">
      <p class="title">{{ title }}</p>
      <p class="text">{{ text }}</p>
      
      <div class="action">
        <router-link :to="$i18nRoute({ name: buttonRouteLink })" class="button t-all-ease">
          {{ buttonText }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardBlock',
  props: {
    imageName: {          // Required image to show
      type: String,
      required: true,
    },
    hoverIconName: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    buttonText: {
      type: String,
      required: true,
    },
    buttonRouteLink: {
      type: String,
      required: true,
    }
  }
}
</script>


<style scoped>
.t-all-ease {
  transition: all .5s ease;
}

.card {
  @apply w-full bg-blue-300 rounded-lg overflow-hidden shadow-xl
}

.card .image {
  @apply relative
}

.card .image .hover-icon {
  @apply opacity-0 absolute inset-0 z-0 bg-blue-400 bg-opacity-75 flex items-center justify-center
}

.card:hover .image .hover-icon {
  @apply opacity-100
}

.card .image img.main {
  @apply h-40 w-full object-cover
}

.card .content-wrapper {
  @apply p-4
}

.card .content-wrapper .title{
  @apply mb-2 text-xl leading-tight font-bold text-blue-900
}

.card .action {
  @apply mt-6 mb-1
}

.card .action .button {
  @apply block w-full p-1 text-center rounded-md bg-blue-900 text-blue-200 border-2 border-blue-900 outline-none
}

.card .action .button:hover {
  @apply bg-blue-200 text-blue-900 font-bold
}




@media (min-width: 640px) {
  .card {
    @apply w-1/3 max-w-xs
  }
}
</style>
