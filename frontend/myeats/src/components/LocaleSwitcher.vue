<script>
/**
 * Component that allows user to switch between languages
 *
 * @summary Component that allows user to switch between languages
 * @author Zeppelin17 <elzeppelin17@gmail.com>
 *
 * Created at     : 2020-04-29 16:49:31 
 * Last modified  : 2020-05-12 06:58:02
 */
</script>


<template>

    <div>
        <!-- Template if the language switcher is not in the footer -->
        <div v-if="!isInFooter">
            <div class="relative py-3">
                <div 
                    v-if="showLangSelector"
                    class="fixed inset-0 w-full h-full bg-gray-500 bg-opacity-25 z-10"
                    @click="showLangSelector = !showLangSelector"
                ></div>
                <div 
                    class="flex cursor-pointer"
                    @click="showLangSelector = !showLangSelector"
                >
                    <span class="text-blue-900">{{ this.$i18n.locale }}</span>
                    <img
                        class="w-3 text-blue-900"
                        :src="requireImage('caret-down-outline.svg')" 
                        :alt="$t('langMenu.selectDropdown')"
                    >
                </div>
                <div 
                    v-if="showLangSelector"
                    class="locale-list"
                >
                    <div class="locale-wrap">
                        <div 
                            class="locale"
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
        </div>

        <!-- Template for the footer language switcher -->
        <div v-if="isInFooter">
            <div class="locale-wrap footer">
                <div 
                    class="locale"
                    v-for="locale in locales" 
                    :key="locale"
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
    props: {
        isInFooter: {
            type: Boolean,
            default: false
        }
    },
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
.locale-list {
    @apply z-20 absolute right-0 w-32
}
.locale-list .locale-wrap {
    @apply flex flex-col items-start bg-blue-300 shadow-xl rounded
}
.locale-list .locale-wrap .locale {
    @apply flex rounded text-gray-800 w-full
}
.locale-list .locale-wrap .locale a {
    @apply p-2 w-full rounded
}
.locale-list .locale-wrap .locale:hover {
    @apply bg-blue-900 text-gray-200
}
.locale-list .locale-wrap .locale:hover a img{
    @apply border-gray-200 border-2 rounded-full
}



.locale-wrap.footer {
    @apply flex flex-col items-start
}
.locale-wrap.footer .locale {
    @apply flex mx-auto w-32 rounded-lg text-gray-800 border-2 border-blue-400
}
.locale-wrap.footer .locale a {
    @apply p-2 w-full rounded
}
.locale-wrap.footer .locale:hover {
    @apply border-2 border-blue-900 text-blue-900
}
.locale-wrap.footer .locale:hover a img{
    @apply border-blue-900 border-2 rounded-full
}

@media (min-width: 768px) {
    
    .locale-wrap.footer .locale a {
        @apply text-left
    }

    .locale-wrap.footer .locale {
        @apply w-full
    }
}
</style>