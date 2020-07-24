<script>
/**
 * Recipes View
 *
 * @summary Recipes View
 * @author Zeppelin17 <elzeppelin17@gmail.com>
 *
 * Created at     : 2020-06-24 09:06:55
 * Last modified  : 2020-07-23 06:52:53
 */
</script>


<template>
    <div class="recipes">

      <AppPageActionButtons
        :actions="pageActionButtons"
        v-on:execute-action="childEventEmit($event)"
      />


      <h1>{{ $t('appPages.recipes.mainTitle') }}</h1>

      <div class="cards-wrapper">
        <CardRecipeBlock
          id="1" 
          name="My first recipe"
          :categories="['categ_1', 'categ_2', 'categ_3', 'categ_4']"
          ingredients="7"
        />

        <CardRecipeBlock
          id="1" 
          name="Another recipe"
          :categories="['categ_1']"
          ingredients="3"
        />

        <CardRecipeBlock
          id="1" 
          name="This recipe has a longer title and it has to fit well"
          :categories="['categ_1', 'categ_2', 'categ_3']"
          ingredients="8"
        />

        <CardRecipeBlock
          id="1" 
          name="The recipe I love the most"
          :categories="['categ_1', 'categ_2', 'categ_3', 'categ_4', 'categ_5']"
          ingredients="12"
        />

        <CardRecipeBlock
          id="1" 
          name="Yet another recipe"
          :categories="['categ_1', 'categ_2']"
          ingredients="4"
        />
      </div>


      <UserNotification ref="notify"/>

      <ModalBox 
        v-show="isCreateRecipeModalVisible"
        v-on:close='closeCreateRecipeModal'
      >
        <template v-slot:header>
          <p>header test</p>
        </template>

        <template v-slot:body>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum vel euismod nunc, in ullamcorper ante. Maecenas id sem risus. Pellentesque tincidunt, purus a egestas semper, tortor felis malesuada sem, et feugiat neque orci nec enim. Etiam lobortis ut nibh at fringilla. Etiam id risus sed est consectetur lobortis molestie non elit. Integer vitae mi sed quam imperdiet ultricies. Mauris tellus diam, dignissim id turpis ut, mattis dictum libero. Sed molestie tristique odio, nec ornare purus egestas eu. Maecenas laoreet lorem enim, vitae gravida tortor iaculis at. Maecenas facilisis dignissim fringilla. Donec imperdiet sagittis vehicula. Praesent porttitor elementum sem vitae aliquam. Nulla elementum et elit a varius. Aliquam sit amet dui nisi. Duis malesuada blandit ultricies. Nulla vehicula lorem eget sapien eleifend molestie.</p>
        </template>

        <template v-slot:footer>
          <p>footer test</p>
        </template>
      </ModalBox>
    </div>
</template>

<script>
import CardRecipeBlock from '@/components/blocks/CardRecipeBlock.vue'
import AppPageActionButtons from '@/components/AppPageActionButtons.vue'
import UserNotification from '@/components/UserNotification.vue'
import ModalBox from '@/components/blocks/ModalBox.vue'

export default {
  name: 'recipes',
  data() {
      return {
          isCreateRecipeModalVisible: false,
          pageActionButtons: [
            {
              type: "create",
              entity: "Recipe",
              text: "Create",
              onClick: "createNewRecipe" 
            },
            /* {
              type: "edit",
              entity: "Recipe",
              text: "Edit"
            },
            {
              type: "delete",
              entity: "Recipe",
              text: "Delete"
            } */
          ]
      }
  },
  components: {
      CardRecipeBlock,
      AppPageActionButtons,
      UserNotification,
      ModalBox,
  },
  methods: {
    /**
     * This function receives a method name and it executes dynamicly
     */
    childEventEmit(action) {
      this[action]()
    },

    createNewRecipe() {
      this.showCreateRecipeModal()
      //this.$refs.notify.info(event, "info notification", 5000, true)
      //this.$refs.notify.warning(event, "warning notification", 10000, true)
      //this.$refs.notify.error(event, "error notification", 10000, true)
      //this.$refs.notify.success(event, "success notification", 10000, true)
    },

    closeCreateRecipeModal() {
      this.isCreateRecipeModalVisible = false
    },

    showCreateRecipeModal() {
      this.isCreateRecipeModalVisible = true
    }
  }
}
</script>

<style scoped>
.recipes {
  @apply text-center
}

.recipes h1 {
  @apply mb-4
}

.recipes .cards-wrapper {
  @apply flex flex-wrap justify-center
}

.recipes .cards-wrapper .card-recipe-block{
  @apply m-3
}
</style>
