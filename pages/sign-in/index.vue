<script setup lang="ts">
definePageMeta({
  layout: 'empty'
})
</script>

<template>
  <div class="flex justify-center items-center h-screen bg-gray-100 dark:bg-gray-900">
    <SignIn
      path="/sign-in"
      routing="path"
      redirectUrl="/"
    />
  </div>
</template>
