<script>
/**
 * Home View
 *
 * @summary Home View
 * @author Zeppelin17 <elzeppelin17@gmail.com>
 *
 * Created at     : 2020-04-29 17:23:47 
 * Last modified  : 2020-05-24 08:42:47
 */
</script>


<template>
  <div class="home">
    <HeroImageBlock
      :content="$t('home.heroBannerText')"
      imageName="home-hero.jpg"
    />
    
    <TextImageBlock 
      :title="$t('home.whatIs.title')" 
      :content="$t('home.whatIs.text')"
      imageName="refreshing_beverage.svg"
      imageAlign="right" 
    />

    <CallToActionBanner
      title="Start planning your meals"
      button1Text="Create an account"
      button1Link="/en/register"

    />

    <TextImageBlock 
      :title="$t('home.whyPlanning.title')" 
      :content="$t('home.whyPlanning.text')"
      imageName="healthy_options.svg"
      imageAlign="left" 
    />

    <TextImageBlock 
      :title="$t('home.whatCanIDo.title')" 
      :content="$t('home.whatCanIDo.text')"
      imageName="online_test.svg"
      imageAlign="right" 
    />
  </div>
</template>

<script>
// @ is an alias to /src
import TextImageBlock from '@/components/blocks/TextImageBlock.vue'
import HeroImageBlock from '@/components/blocks/HeroImageBlock.vue'
import CallToActionBanner from '@/components/blocks/CallToActionBanner.vue'

export default {
  name: 'home',
  components: {
    TextImageBlock,
    HeroImageBlock,
    CallToActionBanner
  }
}
</script>
