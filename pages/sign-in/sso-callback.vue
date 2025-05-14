<script setup>
    import { AuthenticateWithRedirectCallback } from '@clerk/nuxt/components';
</script>
<template>
  <ClientOnly>
    <AuthenticateWithRedirectCallback />
  </ClientOnly>
</template>

