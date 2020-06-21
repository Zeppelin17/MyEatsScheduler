<script>
/**
 * Home View
 *
 * @summary Home View
 * @author Zeppelin17 <elzeppelin17@gmail.com>
 *
 * Created at     : 2020-06-07 15:58:57  
 * Last modified  : 2020-06-21 08:12:22
 */
</script>


<template>
    <div class="dashboard">
        <h1>dashboard</h1>

        <CardBlock 
            hoverIconName="calendar-event.svg"
            imageName="dashboard-weeks.jpg"
            title="MyEats"
            text="Lorem ipsum dolor sit amet"
            buttonText="Gestionar calendario"
            buttonRouteLink="MyEats"
        />


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
</style>
