<script setup>
const props = defineProps({
    label: String,
});
</script>
<template>
    <div class="flex-1">
        <label class="block text-sm font-medium text-white mb-1">
          Filter by {{ props.label }}
        </label>
        <slot />
      </div>
</template>
