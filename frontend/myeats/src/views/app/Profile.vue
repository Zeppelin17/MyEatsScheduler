<script>
/**
 * Profile View
 *
 * @summary Profile View
 * @author Zeppelin17 <elzeppelin17@gmail.com>
 *
 * Created at     : 2020-06-24 09:06:55
 * Last modified  : 2020-10-23 06:53:55
 */
</script>


<template>
  <div class="profile">
    
    <h1>{{ $t('appPages.profile.title') }}</h1>
    <div class="wrapper">
      <div class="profile-form-wrapper">
        <div v-if="!showProfileForm" class="profile-info">
          <p><span>{{ $t('appPages.profile.infoEmail') }}</span> {{ profile.email }}</p>
          <p><span>{{ $t('appPages.profile.infoFirstName') }}</span> {{ profile.firstName }}</p>
          <p><span>{{ $t('appPages.profile.infoLastName') }}</span> {{ profile.lastName }}</p>
          <button @click.prevent="showProfileForm = true">{{ $t('appPages.profile.infoEditButton') }}</button>
        </div>
        
        <ProfileForm 
          v-if="showProfileForm"
          @profile-updated="profileUpdated"
          :userId="parseInt(userId)"
          :currentFirstName="profile.firstName"
          :currentLastName="profile.lastName"
        />
      </div>

      <div class="image">
        <img src="../../assets/img/profile.svg" alt="Profile">
      </div>
    </div>
      

      

    <div v-if="profileStatus === 'loading'" id="loading">
      <img src="../../assets/img/loading.svg" alt="Loading">
      <p>{{ $t('appPages.profile.loadingMsg') }}</p>
    </div>

    <UserNotification ref="notify"/>

  </div>
</template>

<script>
import { GET_USER_DATA } from '@/store/actionTypes'
import { mapGetters } from 'vuex'
import ProfileForm from '@/components/forms/ProfileForm'
import UserNotification from '@/components/UserNotification.vue'

export default {
  name: 'profile',
  data() {
      return {
          showProfileForm: false
      }
  },

  computed: {
    ...mapGetters({
      profileStatus: 'profileStatus',
      profile: 'profile',
      userId: 'userId'
    })
  },

  components: {
    ProfileForm,
    UserNotification
  },

  methods: {
    profileUpdated() {
      this.showProfileForm = false
      this.$refs.notify.success(event, this.$t("appPages.profile.profileUpdated"), 3000, true)
    }
  },

  created() {
    this.$store.dispatch(GET_USER_DATA, this.userId)
  }
}
</script>

<style scoped>
.profile {
  @apply p-5
}

.profile h1 {
  @apply text-center mb-4
}

.profile .wrapper .image {
  @apply hidden
}


.profile .wrapper .profile-form-wrapper .profile-info {
  @apply px-6 py-4 border-2 border-blue-900 rounded
}

.profile .wrapper .profile-form-wrapper .profile-info p {
  @apply flex flex-col text-xl mb-6
}

.profile .wrapper .profile-form-wrapper .profile-info p span {
  @apply text-base text-blue-500 font-bold
}

.profile .wrapper .profile-form-wrapper .profile-info button {
    @apply py-2 px-6 w-full bg-blue-900 text-blue-200 text-lg border-2 border-blue-900 rounded-md
}

.profile .wrapper .profile-form-wrapper .profile-info button:hover {
    @apply outline-none bg-indigo-200 text-blue-900 shadow-md
}

.profile .wrapper .profile-form-wrapper .profile-info button:focus {
    @apply outline-none
}


.profile #loading {
    @apply absolute flex flex-col items-center justify-center inset-0 bg-blue-700 bg-opacity-75 m-auto
}

.profile #loading p {
    @apply font-bold text-xl px-2 py-1 bg-blue-900 text-gray-200 rounded-lg
}



.profile >>> .profile-form {
    @apply w-full text-center
}

.profile >>> .profile-form .form-wrapper {
    @apply px-6 py-4 border-2 border-blue-900 rounded shadow-lg
}

.profile >>> .profile-form .form-wrapper form .form-group {
    @apply mb-2
}

.profile >>> .profile-form .form-wrapper form .form-group label {
    @apply flex flex-col max-w-sm mx-auto bg-blue-300 rounded-t-md rounded-b-md border-2 border-blue-300
}
.profile >>> .profile-form .form-wrapper form .form-group label span {
    @apply py-1 px-2 pb-0 text-left text-xs text-gray-600
}

.profile >>> .profile-form .form-wrapper form .form-group label input {
    @apply py-1 px-2 bg-blue-300 rounded-b-md
}

.profile >>> .profile-form .form-wrapper form input:focus {
    @apply outline-none shadow-md
}

.profile >>> .profile-form .form-wrapper form .form-group .submit button {
    @apply py-2 px-6 bg-blue-900 text-blue-200 text-lg border-2 border-blue-900 rounded-md
}

.profile >>> .profile-form .form-wrapper form .form-group .submit button:hover {
    @apply outline-none bg-indigo-200 text-blue-900 shadow-md
}

.profile >>> .profile-form .form-wrapper form .form-group .submit button:focus {
    @apply outline-none
}

.profile >>> .profile-form .form-wrapper #validation-msg {
    @apply py-3 px-1 mb-4  relative bg-red-500 bg-opacity-50 rounded-md text-gray-300 text-sm max-w-sm mx-auto
}

.profile >>> .profile-form .form-wrapper #validation-msg .close {
    @apply absolute right-0 top-0 py-1 px-2 cursor-pointer text-gray-400
}

.profile >>> .profile-form .form-wrapper #validation-msg .close:hover {
    @apply text-gray-100
}






@media (min-width: 640px) {
  .profile .wrapper {
    @apply flex items-center justify-between gap-6
  }

  .profile .wrapper .image {
    @apply block max-w-sm
  }

  .profile .profile-form-wrapper {
    @apply w-3/4
  }
}

@media (min-width: 768px) {
  .profile .profile-form-wrapper {
    @apply w-1/2
  }
}
</style>
