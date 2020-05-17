<script>
/**
 * Block component that consist in a hero image with some text
 *
 * @summary Block component that consist in a hero image with some text
 * @author Zeppelin17 <elzeppelin17@gmail.com>
 *
 * Created at     : 2020-05-17 06:49:05 
 * Last modified  : 2020-05-17 07:05:15
 */
</script>
<template>
  <div class="text-img-block">
    <div class="image -mx-3 sm:-mx-12">
      <img 
        class="mx-auto"
        :src="require('../../assets/img/' + imageName)" 
        :alt="content"
      >
    </div>
    
    <div class="content primary-color-light">
      <h1 class="mb-4">{{ $t("home.mainHeader") }}</h1>
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
.text-img-block {
  @apply mb-16 relative
}
.text-img-block .image img{
  @apply object-cover object-bottom w-full;
  height: calc(100vh - 5rem);
}

.text-img-block .content{
  @apply absolute z-0 inset-0 pt-20 w-full text-center
}

</style>
