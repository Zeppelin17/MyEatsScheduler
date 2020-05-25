<script>
/**
 * Block component to show a call to action banner
 *
 * @summary Block component to show a call to action banner
 * @author Zeppelin17 <elzeppelin17@gmail.com>
 *
 * Created at     : 2020-05-23 17:42:10
 * Last modified  : 2020-05-25 06:44:03
 */
</script>
<template>
  <div class="cta-banner">
    <div class="cta-title">
      <h2>{{ title }}</h2>
    </div>
    <div class="cta-buttons">
      
      <a 
        v-for="button in allButtons"
        :key="button.text"

        :href="button.link"
        :title="button.text"
        class="cta-btn"
      >
        {{ button.text }}
      </a>

      
    </div>
  </div>
</template>

<script>
export default {
  name: 'CallToActionBanner',
  props: {
    title: {            // Main text of the CTA
      type: String,
      required: true
    },
    button1Text: {      // Required button value
      type: String,
      required: true
    },
    button1Link: {      // Required button link
      type: String,
      required: true
    },
    button2Text: {      // Optional button value
      type: String,
      default: null
    },
    button2Link: {      // Optional button link
      type: String,
      default: null
    }

  },
  computed: {
    // return an array with the buttons to show in the template
    allButtons: function() {
      let buttons = Array()
      buttons.push({"text": this.button1Text, "link": this.button1Link})

      if (this.button2Text !== null && this.button2Link !== null) {
        buttons.push({"text": this.button2Text, "link": this.button2Link})
      }

      return buttons
    }
  }
}
</script>


<style scoped>
.cta-banner {
  @apply flex items-center justify-between -mx-3 px-5 py-20 mb-16 bg-blue-900 text-blue-200 shadow-xl
}

.cta-banner .cta-title {
  @apply mr-5
}

.cta-banner .cta-buttons {
  @apply flex flex-col block
}

.cta-banner .cta-buttons {
  @apply flex flex-col text-center
}

.cta-banner .cta-buttons .cta-btn {
  @apply whitespace-no-wrap block px-4 py-3 my-2 bg-blue-200 text-blue-900 font-semibold text-sm rounded-lg border-2 border-blue-200
}

.cta-banner .cta-buttons .cta-btn:hover {
  @apply border-blue-200 bg-blue-700 shadow-xl text-blue-200
}

@media (min-width: 640px) {
  .cta-banner {
    @apply -mx-12 px-12 py-24
  }

  .cta-banner .cta-buttons .cta-btn {
    @apply px-6 py-4 text-lg
  }
}
</style>
