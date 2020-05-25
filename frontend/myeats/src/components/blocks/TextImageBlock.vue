<script>
/**
 * Block component that consists in a composition of text and image
 *
 * @summary Block component that consists in a composition of text and image
 * @author Zeppelin17 <elzeppelin17@gmail.com>
 *
 * Created at     : 2020-05-17 06:49:29 
 * Last modified  : 2020-05-25 06:49:28
 */
</script>
<template>
  <div 
    class="text-img-block"
    :class="imageAlign == 'right' ? 'flex-row-reverse' : ''"
  >
    <div v-if="imageName !== ''" class="image">
      <img 
        :src="require('../../assets/img/' + imageName)" 
        :alt="title"
      >
    </div>
    
    <div 
      class="content"
      :class="imageName !== '' ? 'sm:w-8/12' : ''"  
    >
      <h2 class="mb-2">{{ title }}</h2>
      <p v-html="content"></p>
    </div>
    
    
  </div>
</template>

<script>
export default {
  name: 'TextImageBlock',
  props: {
    title: {            // Required heading for the block of content
      type: String,       
      required: true
    },
    content: {          // Required text for the block of content
      type: String,
      required: true
    },
    imageName: {        // Optional image to show with the content
      type: String,
      default: ""
    },
    imageAlign: {       // Optional positional value for the image: left or right
      type: String,
      default: "left"
    }
  }
}
</script>

<style scoped>
.text-img-block {
  @apply mb-16
}

.text-img-block .image, .text-img-block .content {
  @apply mx-3
}

.text-img-block .image {
  @apply mb-5
}

.text-img-block .image img {
  @apply w-48 mx-auto
}

@media (min-width: 640px) {
  .text-img-block {
    @apply flex items-center
  }
  .text-img-block .image {
    @apply w-4/12 mb-0
  }
}
</style>
