<script>
/**
 * Home View
 *
 * @summary Home View
 * @author Zeppelin17 <elzeppelin17@gmail.com>
 *
 * Created at     : 2020-04-29 17:23:47 
 * Last modified  : 2020-05-17 09:23:13
 */
</script>


<template>
  <div class="home">
    <HeroImageBlock
      :content="$t('home.heroBannerText')"
      imageName="home-hero.jpg"
    />
    
    <TextImageBlock 
      title="This is the TextImageBlock title" 
      content="Lorem Ipsum dolor sit amet Lorem Ipsum dolor sit amet Lorem Ipsum dolor sit amet Lorem Ipsum dolor sit amet Lorem Ipsum dolor sit amet Lorem Ipsum dolor sit amet"
      imageName="breakfast.svg"
      imageAlign="right"
    />

    <TextImageBlock 
      title="This is the TextImageBlock title" 
      content="Lorem Ipsum dolor sit amet Lorem Ipsum dolor sit amet Lorem Ipsum dolor sit amet Lorem Ipsum dolor sit amet Lorem Ipsum dolor sit amet Lorem Ipsum dolor sit amet"
      imageName="breakfast.svg"
      imageAlign="left"
    />
  </div>
</template>

<script>
// @ is an alias to /src
import TextImageBlock from '@/components/blocks/TextImageBlock.vue'
import HeroImageBlock from '@/components/blocks/HeroImageBlock.vue'

export default {
  name: 'home',
  components: {
    TextImageBlock,
    HeroImageBlock
  }
}
</script>
