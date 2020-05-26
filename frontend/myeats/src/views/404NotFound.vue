<template>
  <div class="error-404">
    <img 
      :src="require('../assets/img/404not-found.svg')" 
      alt="title"
    >
    <div class="content">
      <h1>{{ $t('error.404.title') }}</h1>
      <p>{{ $t('error.404.message') }}</p>
      <p>{{ $t('error.404.help') }}</p>
    </div>
  </div>
</template>

<style scoped>
  .error-404 {
    @apply flex flex-col items-center py-20 px-3
  }
  .error-404 .content {
    @apply text-center
  }
  .error-404 img {
    @apply w-full mb-6
  }

  .error-404 h1 {
    @apply mb-2
  }

  @media (min-width: 640px) {
    .error-404 img {
      @apply max-w-xl
    }
  }
</style>