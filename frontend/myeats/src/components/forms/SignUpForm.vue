<script>
/**
 * Sign up form component
 *
 * @summary Sign up form component
 * @author Zeppelin17 <elzeppelin17@gmail.com>
 *
 * Created at     : 2020-06-11 06:53:57 
 * Last modified  : 2020-06-14 07:07:37
 */
</script>

<template>
    <div class="login-form">
        <div class="form-wrapper">
            <img src="../../assets/img/logo.png" alt="My Eats Scheduler">
            <h1>{{ $t('signUpPage.signUp') }}</h1>
            
            <div v-if="validationMsg !== ''" id="validation-msg">
                <span class="close" @click="resetValidationMsg()">x</span>
                <span>{{ validationMsg }}</span>
            </div>

            <form @submit.prevent="signUp()">
                <div class="form-group">
                    <label for="email-input">
                        <span>{{ $t('signUpPage.inputEmail') }}</span>
                        <input required v-model="email" name="email-input" type="email" autocomplete="off" />
                    </label>
                </div>

                <div class="form-group">
                    <label for="name-input">
                        <span>{{ $t('signUpPage.inputName') }}</span>
                        <input required v-model="first_name" name="name-input" type="text" autocomplete="off" />
                    </label>
                </div>

                <div class="form-group">
                    <label for="surname-input">
                        <span>{{ $t('signUpPage.inputSurname') }}</span>
                        <input required v-model="last_name" name="surname-input" type="text" autocomplete="off" />
                    </label>
                </div>

                <div class="form-group">
                    <label for="psw-input">
                        <span>{{ $t('signUpPage.inputPass') }}</span>
                        <input required v-model="password" name="psw-input" type="password" />
                    </label>
                </div>

                <div class="form-group">
                    <label for="psw-rep-input">
                        <span>{{ $t('signUpPage.inputRepeatPass') }}</span>
                        <input required v-model="passwordRepeat" name="psw-rep-input" type="password" />
                    </label>
                </div>

                <div class="form-group">
                    <div class="submit">
                        <button type="submit">{{ $t('loginPage.inputSubmit') }}</button>
                    </div>
                </div>
            </form>
            
            <div class="form-links">
                <router-link :to="$i18nRoute({ name: 'Login' })">
                    {{ $t('signUpPage.signIn') }}
                </router-link>
                <router-link :to="$i18nRoute({ name: 'Home' })">
                    {{ $t('signUpPage.goBackHome') }}
                </router-link>
            </div>
            
        </div>
    </div>
</template>

<script>
import { AUTH_CREATE } from '@/store/actionTypes'

export default {
  name: 'SignUpForm',
  data() {
      return {
          email: "",
          first_name: "",
          last_name: "",
          password: "",
          passwordRepeat: "",
          validationMsg: ""
      }
  },
  methods: {
      signUp: function() {
          this.validationMsg = ""
          const { email, first_name, last_name, password, passwordRepeat } = this
          const isValidForm = this.validateForm(password, passwordRepeat)

          
          if (isValidForm) {
            this.$store.dispatch(AUTH_CREATE, { email, first_name, last_name, password })
            .then(() => {
                // redirect to dashboard
                this.$router.push({name: 'Dashboard'}) 
            })
            .catch((err) => {
                const errorKey = this.$store.getters.authErrorKey
                let errorMsg = ""

                switch (errorKey) {
                    case "passLength":
                        errorMsg = this.$t("signUpPage.errors.passLength")
                        break;

                    case "emailExist":
                        errorMsg = this.$t("signUpPage.errors.emailExist")
                        break;
                
                    default:
                        errorMsg = this.$t("signUpPage.errors.serverError")
                        break;
                }
                
                this.validationMsg = errorMsg
            })
          }
          
      },
      validateForm: function(password, passwordRepeat) {
          // form validations, returns true or false depending on results
          if (password !== passwordRepeat) {
              this.validationMsg = this.$t('signUpPage.errors.passRepeat')
              return false
          }

          return true
      },

      resetValidationMsg: function() {
          this.validationMsg = ""
      }
  }
}
</script>