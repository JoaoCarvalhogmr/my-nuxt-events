<script setup lang="ts">
import { SignUp } from '@clerk/nuxt/components';


definePageMeta({
  layout: 'empty'
})
</script>

<template>
  <div class="flex justify-center items-center h-screen bg-gray-100 dark:bg-gray-900">
    <SignUp
      path="/sign-up"
      routing="path"
      redirectUrl="/"
      afterSignUpUrl="/"
      signUpUrl="/sign-up"
    />
  </div>
</template>
