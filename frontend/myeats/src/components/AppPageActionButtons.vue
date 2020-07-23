<script>
/**
 * Action bar buttons in the top of the app page
 *
 * @summary Action bar buttons in the top of the app page
 * @author Zeppelin17 <elzeppelin17@gmail.com>
 *
 * Created at     : 2020-06-28 08:28:57 
 * Last modified  : 2020-06-28 09:23:34
 */
 </script>

<template>
    <div class="page-action-buttons">
        <button 
            v-for="(action, index) in actions" :key="index"
            :class="'action-btn t-all-ease ' + action.type"
            @click="executeButtonAction(action.onClick)"
        >
            {{ action.text }}
        </button>
    </div>
</template>

<script>

export default {
    name: "AppPageActionButtons",
    props: {
        /**
         * Actions array item example:
         * {
         *      type: "create" or "edit" or "delete"
         *      entity: "Recipe"
         *      text: "create new"
         *      onClick: "method_name"  // parent method to call on click
         * }
         */
        actions: {
            type: Array,
            required: true
        }
    },
    methods: {
        /**
         * this method returns to parent the method name to execute
         */
        executeButtonAction: function(parentMethod) {
            this.$emit('execute-action', parentMethod)
        }
    }
}
</script>

<style scoped>
.t-all-ease {
  transition: all .5s ease;
}

.page-action-buttons {
    @apply p-4 flex items-center justify-center
}

.page-action-buttons .action-btn {
    @apply w-1/3 my-1 mx-2 p-2 rounded-md text-sm text-blue-200 bg-blue-900 border-blue-900 border-2 outline-none

}

.page-action-buttons .action-btn:hover {
    @apply bg-blue-200 text-blue-900 font-bold outline-none
}


@media (min-width: 640px) {
    .page-action-buttons {
        @apply absolute top-0 right-0
    }

    .page-action-buttons .action-btn {
        @apply w-20
    }
}
</style>