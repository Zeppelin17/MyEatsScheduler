<script>
/**
 * Block component that consist in a hero image with some text
 *
 * @summary Block component that consist in a hero image with some text
 * @author Zeppelin17 <elzeppelin17@gmail.com>
 *
 * Created at     : 2020-05-17 06:49:05 
 * Last modified  : 2020-05-18 06:42:48
 */
</script>
<template>
  <div class="hero-wrapper">
    <div class="image">
      <img 
        :src="require('../../assets/img/' + imageName)" 
        :alt="content"
      >
    </div>
    
    <div class="content primary-color-light">
      <h1>{{ $t("home.mainHeader") }}</h1>
      <h2>{{ content }}</h2>
    </div>
    
    
  </div>
</template>

<script>
export default {
  name: 'HeroImageBlock',
  props: {
    content: {
      type: String,
      required: true
    },
    imageName: {
      type: String,
      required: true,
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hero-wrapper {
  @apply mb-16 relative
}

.hero-wrapper .image {
  @apply -mx-3
}

.hero-wrapper .image img{
  @apply mx-auto object-cover object-bottom w-full;
  height: calc(100vh - 5rem);
}

.hero-wrapper .content{
  @apply absolute z-0 inset-0 pt-20 w-full text-center
}

.hero-wrapper .content h1{
  @apply mb-4
}

@media (min-width: 640px) {
  .hero-wrapper .image {
    @apply -mx-12
  }
}

</style>
