<script>
/**
 * Home View
 *
 * @summary Home View
 * @author Zeppelin17 <elzeppelin17@gmail.com>
 *
 * Created at     : 2020-04-29 17:23:47 
 * Last modified  : 2020-08-08 15:39:18
 */
</script>


<template>
    <div class="img-form-wrapper">
        <div class="image">
            <img src="../assets/img/login.jpg" alt="Sign in">
        </div>
        
        <LoginForm />

        <div v-if="authStatus === 'loading'" id="auth-loading">
            <img src="../assets/img/loading.svg" alt="Loading">
            <p>{{ $t('loginPage.loadingMsg') }}</p>
        </div>
    </div>
</template>

<script>
import LoginForm from '@/components/forms/LoginForm.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'login',
  components: {
      LoginForm
  },
  computed: {
      ...mapGetters({
          authStatus: 'authStatus'
      })
  }
}
</script>

<style scoped>
.img-form-wrapper {
    @apply relative text-gray-800;
    height: calc(100vh)
}

.img-form-wrapper >>> .login-form {
    @apply pt-0 absolute z-0 inset-0 pt-10 w-full text-center
}

.img-form-wrapper >>> .login-form .form-wrapper {
    @apply bg-gray-400 bg-opacity-75 w-11/12 p-4 mx-auto rounded-lg shadow-lg border border-gray-700
}

.img-form-wrapper >>> .login-form .form-wrapper form .form-group {
    @apply mb-2
}

.img-form-wrapper >>> .login-form .form-wrapper form .form-group label {
    @apply flex flex-col max-w-sm mx-auto bg-blue-300 rounded-t-md rounded-b-md border-2 border-blue-300
}
.img-form-wrapper >>> .login-form .form-wrapper form .form-group label span {
    @apply py-1 px-2 pb-0 text-left text-xs text-gray-600
}

.img-form-wrapper >>> .login-form .form-wrapper form .form-group label input {
    @apply py-1 px-2 bg-blue-300 rounded-b-md
}

.img-form-wrapper >>> .login-form .form-wrapper form input:focus {
    @apply outline-none shadow-md
}

.img-form-wrapper >>> .login-form .form-wrapper form .form-group .remember {
    @apply flex items-center justify-center
}

.img-form-wrapper >>> .login-form .form-wrapper form .form-group .remember input {
    @apply mr-2
}

.img-form-wrapper >>> .login-form .form-wrapper form .form-group .remember span {
    @apply text-sm
}

.img-form-wrapper >>> .login-form .form-wrapper form .form-group .submit button {
    @apply py-2 px-6 bg-blue-900 text-blue-200 text-lg border-2 border-blue-900 rounded-md
}

.img-form-wrapper >>> .login-form .form-wrapper form .form-group .submit button:hover {
    @apply outline-none bg-indigo-200 text-blue-900 shadow-md
}

.img-form-wrapper >>> .login-form .form-wrapper form .form-group .submit button:focus {
    @apply outline-none
}

.img-form-wrapper >>> .login-form .form-wrapper .form-links {
    @apply flex flex-col items-center text-xs mt-3
}

.img-form-wrapper >>> .login-form .form-wrapper .form-links a:hover {
    @apply text-blue-700
}

.img-form-wrapper >>> .login-form .form-wrapper img{
    @apply mx-auto w-40 mb-5
}

.img-form-wrapper >>> .login-form .form-wrapper h1{
    @apply mb-3
}

.img-form-wrapper >>> .login-form .form-wrapper #validation-msg {
    @apply py-3 px-1 mb-4  relative bg-red-500 bg-opacity-50 rounded-md text-gray-300 text-sm max-w-sm mx-auto
}

.img-form-wrapper >>> .login-form .form-wrapper #validation-msg .close {
    @apply absolute right-0 top-0 py-1 px-2 cursor-pointer text-gray-400
}

.img-form-wrapper >>> .login-form .form-wrapper #validation-msg .close:hover {
    @apply text-gray-100
}

.img-form-wrapper .image img{
    @apply object-cover object-right;
    height: calc(100vh);
}

.img-form-wrapper #auth-loading {
    @apply absolute flex flex-col items-center justify-center inset-0 bg-blue-700 bg-opacity-75 m-auto
}

.img-form-wrapper #auth-loading p {
    @apply font-bold text-xl px-2 py-1 bg-blue-900 text-gray-200 rounded-lg
}

@media (min-width: 640px) {
    .img-form-wrapper >>> .login-form .form-wrapper {
        @apply w-8/12 
    }
}

@media (min-width: 768px) {
    .img-form-wrapper {
        @apply flex items-center flex-row-reverse bg-blue-900;
        height: calc(100vh)
    }

    .img-form-wrapper >>> .login-form {
        @apply relative w-auto pt-0
    }

    .img-form-wrapper >>> .login-form .form-wrapper {
        @apply bg-opacity-100 bg-blue-200 w-11/12 border-0
    }

    .img-form-wrapper .image, .img-form-wrapper .login-form {
        @apply w-1/2
    }
}
</style>
