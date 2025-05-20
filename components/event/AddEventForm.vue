<script setup lang="ts">
import { reactive, onMounted } from 'vue'
import { useAuth } from '#imports';
import { useEventStore } from '~/stores/events/useEventstore';
import type { Event } from '~/utils/types';

const { userId, isLoaded } = useAuth();
const eventStore = useEventStore()

onMounted(async() => {
  const data = await eventStore.fetchEventTypes();
  eventTypes.value = data.map((item) => item.name);
})

const eventTypes = ref<string[]>([]);
const state = reactive<Pick<Event, 'title' | 'date'|'type'>>({
  title: '',
  date: '',
  type: ''
})

const toast = useToast();

const showToast = () => {
  toast.add({
    title: 'Uh oh! Something went wrong.',
    description: 'There was a problem with your request.',
    color: 'error'
  })
}

const submitEvent = async () => {
  if (!state.title || !state.type || !state.date) {
    toast.add({
      title: 'Missing Fields',
      description: 'Please fill out all fields before submitting.',
      color: 'warning'
    })
    return
  }

  if (!isLoaded.value || !userId.value) {
    toast.add({
      title: 'Authentication Required',
      description: 'Please sign in to add events.',
      color: 'error'
    })
    return;
  }

  try {
    await eventStore.addEvent({
      title: state.title,
      date: state.date,
      type: state.type,
      userId: userId.value
    })

    await eventStore.fetchEvents(userId.value)

    toast.add({
      title: 'Event Added',
      description: `Your "${state.title}" event was added successfully.`,
      color: 'success'
    })

    state.title = ''
    state.date = ''
    state.type = ''
  } catch (e) {
    showToast()
  }
}
</script>

<template>
    <UCard class="p-4">
      <form @submit.prevent="submitEvent" class="flex items-center gap-2">
        <UInput v-model="state.title" placeholder="Event title"  />
        <USelect v-model="state.type" :items="eventTypes" placeholder="Event type" class="w-48" />
        <UInput v-model="state.date" type="date"    />
        <UButton type="submit" icon="i-heroicons-plus" size="lg">Add Event</UButton>
      </form>
    </UCard>
  </template>
  

  