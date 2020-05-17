<script>
/**
 * Block component that consists in a composition of text and image
 *
 * @summary Block component that consists in a composition of text and image
 * @author Zeppelin17 <elzeppelin17@gmail.com>
 *
 * Created at     : 2020-05-17 06:49:29 
 * Last modified  : 2020-05-17 09:33:53
 */
</script>
<template>
  <div 
    class="text-img-block sm:flex sm:items-center"
    :class="imageAlign == 'right' ? 'flex-row-reverse' : ''"
  >
    <div v-if="imageName !== ''" class="image max-w-full mb-5 sm:max-w-sm sm:w-4/12 sm:mb-0">
      <img 
        :src="require('../../assets/img/' + imageName)" 
        :alt="title"
      >
    </div>
    
    <div class="content sm:w-8/12">
      <h2 class="mb-2">{{ title }}</h2>
      <p>{{ content }}</p>
    </div>
    
    
  </div>
</template>

<script>
export default {
  name: 'TextImageBlock',
  props: {
    title: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    imageName: {
      type: String,
      default: ""
    },
    imageAlign: {
      type: String,
      default: "left"
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.text-img-block {
  @apply mb-16
}
.text-img-block .image, .text-img-block .content {
  @apply mx-3
}
</style>
