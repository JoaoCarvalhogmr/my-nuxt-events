<script setup lang="ts">
const props = defineProps<{
  title: string
  description: string
}>()

const emit = defineEmits<{
  (e: 'close', confirmed: boolean): void
}>()
</script>

<template>
  <UModal @close="emit('close', false)">
    <UCard>
      <template #header>
        <h3 class="text-lg font-semibold text-red-600">
          {{ props.title }}
        </h3>
      </template>

      <p class="text-gray-700 dark:text-gray-200">
        {{ props.description }}
      </p>

      <template #footer>
        <div class="flex justify-end gap-2">
          <UButton  color="info" label="Cancel" @click="emit('close', false)" />
          <UButton color="warning" label="Delete" @click="emit('close', true)" />
        </div>
      </template>
    </UCard>
  </UModal>
</template>
