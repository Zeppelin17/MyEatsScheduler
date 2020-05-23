<script>
/**
 * Footer component for public website
 *
 * @summary Footer component for public website
 * @author Zeppelin17 <elzeppelin17@gmail.com>
 *
 * Created at     : 2020-05-20 18:29:27
 * Last modified  : 2020-05-20 19:00:01
 */
</script>


<template>
    <footer>
        <div class="footer-column">
            <h5>{{ $t('footer.linksMenu') }}</h5>
            <FooterMenu />
        </div>
        <div class="footer-column sign">
            <button class="sing-in">{{ $t('footer.buttonSignIn') }}</button>
            <button class="sing-up">{{ $t('footer.buttonSignUp') }}</button>
        </div>
        <div class="footer-column">
            <img 
            class="logo"
            src="../assets/img/logo.png" :alt="$t('header.logoAltText')"
          >
        </div>
        <div class="footer-column">
            <h5>{{ $t('footer.contact') }}</h5>
            <a href="mailto:elzeppelin17@gmail.com" :title="$t('footer.contactMe')">{{ $t('footer.contactMe') }}</a>
        </div>
        <div class="footer-column">
            <h5>{{ $t('footer.langSwitcher') }}</h5>
            <LocaleSwitcher :isInFooter="true" />
        </div>
    </footer>
</template>

<script>
import FooterMenu from '@/components/FooterMenu.vue'
import LocaleSwitcher from '@/components/LocaleSwitcher.vue'

export default {
    name: "MainFooter",
    components: {
        FooterMenu,
        LocaleSwitcher
    },
    data() {
        return {
            
        }
    },
}
</script>

<style scoped>
footer {
    @apply flex flex-col items-center items-stretch text-center text-blue-900  px-4 py-12 bg-blue-400 border-t-8 border-blue-900
}

footer .footer-column {
    @apply mb-10
}

footer .footer-column a {
  @apply px-2 mb-2
}

footer .footer-column a:hover {
  @apply text-blue-700
}

footer .footer-column h5 {
    @apply mb-3
}

footer .footer-column.sign {
    @apply flex flex-col items-center text-center
}


footer .footer-column.sign button {
    @apply w-32 mb-4 py-3 px-5 bg-blue-900 text-white font-medium border-blue-900 border-2 rounded-lg
}

footer .footer-column.sign button:hover {
    @apply shadow-lg bg-blue-200 text-blue-900 font-semibold
}

footer .footer-column .logo {
    @apply w-48 mx-auto
}


@media (min-width: 768px) {
    footer {
        @apply px-12 py-16 flex-row justify-between items-start
    }
    footer .footer-column {
        @apply mb-0 
    }
}
</style>