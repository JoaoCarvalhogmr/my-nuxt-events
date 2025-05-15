<script setup lang="ts">
defineProps<{
    title: string,
}>()

const emit = defineEmits<{ close: [boolean] }>()
</script>

<template>
  <UModal
    :close="{ onClick: () => emit('close', false) }"
    :title="title"
  >
    <template #footer>
      <div class="flex w-full justify-end  gap-2">
        <UButton color="neutral" label="Cancel" @click="emit('close', false)" />
        <UButton color="error" label="Delete" @click="emit('close', true)" />
      </div>
    </template>
  </UModal>
</template>
