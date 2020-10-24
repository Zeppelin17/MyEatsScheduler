<script>
/**
 * App Dashboard View
 *
 * @summary App Dashboard View
 * @author Zeppelin17 <elzeppelin17@gmail.com>
 *
 * Created at     : 2020-06-07 15:58:57  
 * Last modified  : 2020-06-24 09:14:52
 */
</script>


<template>
    <div class="dashboard">

        <div class="cards-wrapper">
            <CardBlock
                class="card-block" 
                hoverIconName="calendar-event.svg"
                imageName="dashboard-weeks.jpg"
                :title="$t('appPages.dashboard.cardMyEatsTitle')"
                :text="$t('appPages.dashboard.cardMyEatsText')"
                :buttonText="$t('appPages.dashboard.cardMyEatsButtonText')"
                :buttonRouteLink="$t('appPages.dashboard.cardMyEatsButtonRoute')"
            />
            
            <CardBlock
                class="card-block" 
                hoverIconName="pizza.svg"
                imageName="dashboard-recipes.jpg"
                :title="$t('appPages.dashboard.cardRecipesTitle')"
                :text="$t('appPages.dashboard.cardRecipesText')"
                :buttonText="$t('appPages.dashboard.cardRecipesButtonText')"
                :buttonRouteLink="$t('appPages.dashboard.cardRecipesButtonRoute')"
            />

            <CardBlock
                class="card-block" 
                hoverIconName="user.svg"
                imageName="dashboard-profile.jpg"
                :title="$t('appPages.dashboard.cardProfileTitle')"
                :text="$t('appPages.dashboard.cardProfileText')"
                :buttonText="$t('appPages.dashboard.cardProfileButtonText')"
                :buttonRouteLink="$t('appPages.dashboard.cardProfileButtonRoute')"
            />

            <!-- <CardBlock
                class="card-block" 
                hoverIconName="help.svg"
                imageName="dashboard-help.jpg"
                :title="$t('appPages.dashboard.cardHelpTitle')"
                :text="$t('appPages.dashboard.cardHelpText')"
                :buttonText="$t('appPages.dashboard.cardHelpButtonText')"
                :buttonRouteLink="$t('appPages.dashboard.cardHelpButtonRoute')"
            /> -->

            
        </div>
        

    </div>
</template>

<script>
import CardBlock from '@/components/blocks/CardBlock.vue'

export default {
  name: 'dashboard',
  data() {
      return {
          
      }
  },
  components: {
      CardBlock
  }
}
</script>

<style scoped>
.dashboard {
    @apply p-5
}

.dashboard .cards-wrapper {
    @apply flex justify-center flex-wrap
}

.dashboard .cards-wrapper .card-block {
    @apply m-3
}


@media (min-width: 1024px){
    .dashboard .cards-wrapper {
        @apply flex justify-center
    }
}
</style>
