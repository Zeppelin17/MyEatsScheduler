<script>
/**
 * Component that allows user to switch between languages
 *
 * @summary Component that allows user to switch between languages
 * @author Zeppelin17 <elzeppelin17@gmail.com>
 *
 * Created at     : 2020-04-29 16:49:31 
 * Last modified  : 2020-05-09 06:49:25
 */
</script>


<template>
    <div class="relative">
        <div 
            v-if="showLangSelector"
            class="fixed inset-0 w-full h-full bg-gray-500 bg-opacity-25"
            @click="showLangSelector = !showLangSelector"
        ></div>
        <div 
            class="flex cursor-pointer"
            @click="showLangSelector = !showLangSelector"
        >
            <span class="text-indigo-600">{{ this.$i18n.locale }}</span>
            <img
                class="w-3 text-indigo-600"
                :src="requireImage('caret-down-outline.svg')" 
                :alt="$t('langMenu.selectDropdown')"
            >
        </div>
        <div 
            v-if="showLangSelector"
            class="absolute right-0 w-32"
        >
            <div class="flex flex-col items-start bg-indigo-300 shadow-xl rounded">
                <div 
                    class="flex p-2 w-full rounded text-gray-800 hover:bg-indigo-600 hover:text-gray-300"
                    v-for="locale in locales" 
                    :key="locale"
                    @click="showLangSelector = !showLangSelector"
                >
                    <a 
                        class=""
                        @click="switchLocale(locale, $event)"
                        href="#"
                    >
                        <img 
                            class="mr-1 w-6 inline"
                            :src="requireImage($t('langMenu.' + locale + '.flag'))" 
                            :alt="$t('langMenu.' + locale + '.name')"
                        >
                        <span>{{ $t('langMenu.' + locale + '.name') }}</span>
                    </a>
                </div>
            </div>
        </div>
    </div>
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
            locales: process.env.VUE_APP_I18N_SUPPORTED_LOCALE.split(","),
            showLangSelector: false
        }
    },
    methods: {
        switchLocale(locale, event) {
            if(event) event.preventDefault()

            if (this.$i18n.locale !== locale) {
                const to = this.$router.resolve({ params: {locale} })
                return Trans.changeLocale(locale).then(() => {
                    this.$router.push(to.location)
                })
            }
        },
        requireImage(name) {
            return require('../assets/img/' + name)
        }
    }
}
</script>

<style scoped>
.locale-flag:hover .tooltip {display: block;}
</style>