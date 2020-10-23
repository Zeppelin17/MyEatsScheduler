<script>
/**
 * Profile edit form component
 *
 * @summary Profile edit form component
 * @author Zeppelin17 <elzeppelin17@gmail.com>
 *
 * Created at     : 2020-10-20 06:15:27
 * Last modified  : 2020-10-23 06:48:48
 */
</script>
<template>
  <div class="profile-form">
    <div class="form-wrapper">
      <div v-if="validationMsg !== ''" id="validation-msg">
        <span class="close" @click="resetValidationMsg()">x</span>
        <span>{{ validationMsg }}</span>
      </div>

      <form @submit.prevent="update()">
        <div class="form-group">
          <label for="name-input">
            <span>{{ $t("appPages.profile.inputName") }}</span>
            <input
              v-model="firstName"
              name="name-input"
              type="text"
              autocomplete="off"
            />
          </label>
        </div>

        <div class="form-group">
          <label for="surname-input">
            <span>{{ $t("appPages.profile.inputSurname") }}</span>
            <input
              v-model="lastName"
              name="surname-input"
              type="text"
              autocomplete="off"
            />
          </label>
        </div>

        <div class="form-group">
          <label for="psw-input">
            <span>{{ $t("appPages.profile.inputPassword") }}</span>
            <input v-model="password" name="psw-input" type="password" />
          </label>
        </div>

        <div class="form-group">
          <label for="psw2-input">
            <span>{{ $t("appPages.profile.inputRepeatPassword") }}</span>
            <input v-model="password2" name="psw2-input" type="password" />
          </label>
        </div>

        <div class="form-group">
          <div class="submit">
            <button type="submit">
              {{ $t("appPages.profile.formSubmitButton") }}
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { PATCH_USER_DATA } from '@/store/actionTypes'

export default {
  name: "ProfileForm",

  props: {
    userId: {
      type: Number,
      required: true
    },
    currentFirstName: {
      type: String,
      required: true
    },
    currentLastName: {
      type: String,
      required: true
    },
  },

  data() {
    return {
      firstName: "",
      lastName: "",
      password: "",
      password2: "",
      validationMsg: "",
    };
  },
  methods: {
    update() {
      this.validationMsg = ""

      if (this.firstName.trim().length === 0) {
        this.validationMsg = this.$t("appPages.profile.errorFirstNameMandatory")
        return false
      }
      if (this.lastName.trim().length === 0) {
        this.validationMsg = this.$t("appPages.profile.errorLastNameMandatory")
        return false
      }
      if (this.password.length > 0 && this.password2.length > 0 && this.password !== this.password2) {
        this.validationMsg = this.$t("appPages.profile.errorPasswordsNotMatch")
        return false
      }

      const newUserData = {
        id: this.userId,
        first_name: this.firstName,
        last_name: this.lastName
      }
      /* Bug un password update */
      /* if (this.password.length > 0) {
        newUserData["password"] = this.password
      } */

      this.$store.dispatch(PATCH_USER_DATA, newUserData)
      .then(() => {
        this.$emit("profile-updated")
      })
      .catch((error) => {
        console.log("error", error)
        this.validationMsg = error
      })
    },

    resetValidationMsg() {
      this.validationMsg = "";
    },
    
  },

  created() {
    this.firstName = this.currentFirstName
    this.lastName = this.currentLastName
  }
};
</script>