<script>
/**
 * Component that allows user to switch between languages
 *
 * @summary Component that allows user to switch between languages
 * @author Zeppelin17 <elzeppelin17@gmail.com>
 *
 * Created at     : 2020-04-29 16:49:31 
 * Last modified  : 2020-04-29 16:50:02
 */
</script>


<template>
    <ul>
        <li v-for="locale in locales" :key="locale" @click="switchLocale(locale)">
            {{ $t('menu.' + locale) }}
        </li>
    </ul>
</template>

<script>
import { Trans } from '@/plugins/Translation'
export default {
    name: "LocaleSwitcher",
    computed: {
        supportedLocales() {
            return Trans.supportedLocales
        }
    },
    data() {
        return {
            locales: process.env.VUE_APP_I18N_SUPPORTED_LOCALE.split(",")
        }
    },
    methods: {
        switchLocale(locale) {
            if (this.$i18n.locale !== locale) {
                const to = this.$router.resolve({ params: {locale} })
                return Trans.changeLocale(locale).then(() => {
                    this.$router.push(to.location)
                })
            }
        }
    }
}
</script>

<style scoped>
li {
    text-decoration: underline;
    color: #459CE7;
    cursor: pointer;
}
</style>