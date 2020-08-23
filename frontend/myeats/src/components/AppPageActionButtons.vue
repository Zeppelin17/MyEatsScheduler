<script>
/**
 * Action bar buttons in the top of the app page
 *
 * @summary Action bar buttons in the top of the app page
 * @author Zeppelin17 <elzeppelin17@gmail.com>
 *
 * Created at     : 2020-06-28 08:28:57 
 * Last modified  : 2020-08-23 08:07:21
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
         *      entity: "Recipe/Week/etc"
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
    @apply p-4 flex flex-wrap items-center justify-center
}

.page-action-buttons .action-btn {
    @apply w-full my-1 mx-1 p-2 rounded-md text-sm outline-none text-blue-200 bg-blue-900 border-blue-900 border-2 outline-none whitespace-no-wrap

}

.page-action-buttons .action-btn:hover {
    @apply bg-blue-200 text-blue-900 shadow-md
}

.page-action-buttons .action-btn.edit {
    @apply bg-blue-700 border-blue-700
}

.page-action-buttons .action-btn.edit:hover {
    @apply bg-blue-200 text-blue-700
}

.page-action-buttons .action-btn.delete {
    @apply bg-red-500 border-red-500
}

.page-action-buttons .action-btn.delete:hover {
    @apply bg-red-200 text-red-600
}

@media (min-width: 640px) {
    .page-action-buttons {
        @apply absolute top-0 right-0
    }

    .page-action-buttons .action-btn {
        @apply w-auto
    }
}
</style>