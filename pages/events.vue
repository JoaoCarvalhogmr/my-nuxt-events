<script setup lang="ts">
  useHead({
    title: 'Events Manager'
  })


</script>
  
<template>
    <div class="space-y-6 p-6 max-w-5xl mx-auto">
      <EventAddEventForm />
      <EventList />
    </div>
</template>
  
