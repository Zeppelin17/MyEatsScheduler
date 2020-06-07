<template>
    <div class="login-form">
        <div class="form-wrapper">
            <img src="../../assets/img/logo.png" alt="My Eats Scheduler">
            <h1>{{ $t('loginPage.signIn') }}</h1>
            
            <div v-if="validationMsg !== ''" id="validation-msg">
                <span class="close" @click="resetValidationMsg()">x</span>
                <span>{{ validationMsg }}</span>
            </div>

            <form @submit.prevent="login()">
                <div class="form-group">
                    <label for="user-input">
                        <span>{{ $t('loginPage.inputEmail') }}</span>
                        <input required v-model="username" name="user-input" type="text" autocomplete="off" />
                    </label>
                </div>

                <div class="form-group">
                    <label for="psw-input">
                        <span>{{ $t('loginPage.inputPass') }}</span>
                        <input required v-model="password" name="psw-input" type="password" />
                    </label>
                </div>

                <div class="form-group">
                    <div class="remember">
                        <input name="keep-login-input" type="checkbox" />
                        <span>{{ $t('loginPage.inputKeepLogin') }}</span>
                    </div>
                </div>

                <div class="form-group">
                    <div class="submit">
                        <button type="submit">{{ $t('loginPage.inputSubmit') }}</button>
                    </div>
                </div>
            </form>
            
            <div class="form-links">
                <router-link :to="$i18nRoute({ name: 'Home' })">
                    {{ $t('loginPage.passwordRecover') }}
                </router-link>
                <router-link :to="$i18nRoute({ name: 'Home' })">
                    {{ $t('loginPage.createAccount') }}
                </router-link>
                <router-link :to="$i18nRoute({ name: 'Home' })">
                    {{ $t('loginPage.goBackHome') }}
                </router-link>
            </div>
            
        </div>
    </div>
</template>

<script>
import { AUTH_REQUEST } from '@/store/actionTypes'

export default {
  name: 'LoginForm',
  data() {
      return {
          username: "",
          password: "",
          validationMsg: ""
      }
  },
  methods: {
      login: function() {
          this.validationMsg = ""
          const { username, password } = this
          this.$store.dispatch(AUTH_REQUEST, { username, password })
            .then(() => {
                // redirección a url de aplicación
                this.$router.push({name: 'Dashboard'})
            })
            .catch(() => {
                this.validationMsg = this.$t("loginPage.errors.wrongData")
            })
      },

      resetValidationMsg: function() {
          this.validationMsg = ""
      }
  }
}
</script>