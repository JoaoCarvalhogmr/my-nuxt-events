<script setup lang="ts">
definePageMeta({
  layout: 'empty', // Use default layout (if you want to use it)
})
</script>

<template>
  <div class="relative w-full h-screen bg-cover bg-center" 
  :style="{ backgroundImage: 'url(/img/backgroundImage.png)' }"
  >
    
    <div class="absolute inset-0 bg-black opacity-50"></div>

    
    <div class="absolute inset-0 flex flex-col justify-center items-center text-center text-white z-10">
    
      <section class="bg-transparent p-6 mb-6">
        <h1 class="text-5xl md:text-6xl font-bold leading-tight mb-4">Welcome to MyNuxtEvents</h1>
        <p class="text-lg md:text-xl mb-6 max-w-3xl">
          Discover, create, and attend amazing events with our platform. Your next event is just a click away!
        </p>

        <div class="flex gap-4 justify-center">
          <NuxtLink to="/events">
            <UButton size="lg" color="secondary" class="text-white">Get Started</UButton>
          </NuxtLink>

        </div>
      </section>


    </div>
  </div>
</template>

<style scoped>
/* Optional custom styling */
</style>
