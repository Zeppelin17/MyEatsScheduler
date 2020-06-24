<script>
/**
 * Footer component for app panel
 *
 * @summary Footer component for app panel
 * @author Zeppelin17 <elzeppelin17@gmail.com>
 *
 * Created at     : 2020-06-24 08:24:40 
 * Last modified  : 2020-06-24 09:02:28
 */
</script>


<template>
    <footer>
        <p v-html="copyRight"></p>
    </footer>
</template>

<script>

export default {
    name: "AppFooter",
    computed: {
        copyRight: function() {
            return this.$t('appPages.footerCopyRight')
        }
    }
}
</script>

<style scoped>
footer {
    @apply flex items-center justify-center px-3 py-6 mt-6 bg-blue-400 border-t-2 border-blue-900 text-blue-800
}

footer >>> a {
    @apply text-blue-200;
    transition: all .5s ease;
}

footer >>> a:hover {
    @apply text-blue-900 underline
}


</style>