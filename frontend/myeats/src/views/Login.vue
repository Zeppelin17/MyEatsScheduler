<script>
/**
 * Home View
 *
 * @summary Home View
 * @author Zeppelin17 <elzeppelin17@gmail.com>
 *
 * Created at     : 2020-04-29 17:23:47 
 * Last modified  : 2020-05-30 09:09:03
 */
</script>


<template>
    <div class="img-form-wrapper">
        <div class="image">
            <img src="../assets/img/login.jpg" alt="Sign in">
        </div>
        
        <LoginForm />
    </div>
</template>

<script>
import LoginForm from '@/components/forms/LoginForm.vue'

export default {
  name: 'login',
  components: {
      LoginForm
  },
  data() {
      return {
          
      }
  }
}
</script>

<style scoped>
.img-form-wrapper {
    @apply relative text-gray-800;
    min-height: calc(100vh)
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

.img-form-wrapper >>> .login-form .form-wrapper form .form-group .submit input {
    @apply py-2 px-6 bg-blue-900 text-blue-200 text-lg border-2 border-blue-900 rounded-md
}

.img-form-wrapper >>> .login-form .form-wrapper form .form-group .submit input:hover {
    @apply outline-none bg-indigo-200 text-blue-900 shadow-md cursor-pointer
}

.img-form-wrapper >>> .login-form .form-wrapper .form-links {
    @apply flex flex-col items-center text-xs mt-3
}

.img-form-wrapper >>> .login-form .form-wrapper .form-links a:hover {
    @apply text-blue-700
}

.img-form-wrapper >>> .login-form .form-wrapper img{
    @apply mx-auto w-56 mb-5
}

.img-form-wrapper >>> .login-form .form-wrapper h1{
    @apply mb-3
}

.img-form-wrapper .image img{
    @apply object-cover object-right;
    min-height: calc(100vh);
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
