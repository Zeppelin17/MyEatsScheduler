<template>
    <div class="login-form">
        <div class="form-wrapper">
            <img src="../../assets/img/logo.png" alt="My Eats Scheduler">
            <h1>{{ $t('loginPage.signIn') }}</h1>
            <form>
                <div class="form-group">
                    <label for="user-input">
                        <span>{{ $t('loginPage.inputEmail') }}</span>
                        <input name="user-input" type="text" autocomplete="off" />
                    </label>
                </div>

                <div class="form-group">
                    <label for="psw-input">
                        <span>{{ $t('loginPage.inputPass') }}</span>
                        <input name="psw-input" type="password" />
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
                        <input name="submit-input" type="submit" :value="$t('loginPage.inputSubmit')" />
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
export default {
  name: 'LoginForm'
}
</script>