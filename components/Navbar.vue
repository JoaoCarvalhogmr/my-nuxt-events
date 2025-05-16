<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'
import { UserButton } from '#components';

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
    <div class="flex items-center border border-gray-200 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur-md rounded-xl p-3 transition-colors duration-300">
    <h2 class="text-gray-900 dark:text-white font-semibold text-lg">
      MyNuxtEvents
    </h2>
      <UNavigationMenu
        :items="items"
          class="w-full justify-around text-gray-900 dark:text-white"
      />
      <section class="flex gap-3">
        <ColorModeButton />
        <UserButton  />
      </section>
    </div>
  </div>
</template>

