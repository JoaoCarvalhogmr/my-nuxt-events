<script setup lang="ts">
import type { ToasterProps } from '@nuxt/ui';

const toastConfig: ToasterProps = {
    position: "top-right"
  }


  
</script>

<template>
  
  <NuxtLayout>
    <UApp :toaster="toastConfig">
      <NuxtPage />
    </UApp>
  </NuxtLayout>
</template>
