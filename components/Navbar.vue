<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'
import { SignOutButton } from '@clerk/nuxt/components';



const items = ref<NavigationMenuItem[]>([
  {
    label: 'Events Manager',
    icon: 'i-lucide-clock',
    to: '/events',

  },
  {
    label: 'My Event Calendar',
    icon: 'i-lucide-calendar',
    to: '/calendar',
  },
])
</script>
<template>
  <div class="w-full px-4 py-2">
    <div class="flex items-center border border-white/10 bg-white/5 backdrop-blur-md rounded-xl p-3">
    <h2>MyNuxtEvents</h2>
      <UNavigationMenu
        :items="items"
        class="w-full justify-around text-white"
      />
      <ColorModeButton />
      <AuthButton />
    </div>
  </div>
</template>
