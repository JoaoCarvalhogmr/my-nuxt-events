<script setup lang="ts">
 import { reactive } from 'vue'
 import { useEventStore } from '~/stores/events/useEventstore';
 import { type Event } from '#imports';
 
  const props = defineProps<{
      eventId: string,
  }>()

  const emit = defineEmits<{ close: [boolean] }>()

  const store = useEventStore();

  const eventTypes = ref<string[]>([]);

  const state = reactive<Pick<Event, 'title'| 'date' | 'type'>>({
    title: '',
    date: '',
    type: ''
  })

  const populateFormAndFetchEvenTypes = async() => {
    const res = await store.fetchSingleEvent(props.eventId);
    state.title = res.title;
    state.type = res.type;
    state.date = new Date(res.date).toISOString().split('T')[0]
    const data = await store.fetchEventTypes();
    eventTypes.value = data.map((item) => item.name);
  }

onMounted(populateFormAndFetchEvenTypes)

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

  try {
    await store.updateEvent({
      title: state.title,
      date: state.date,
      type: state.type,
      id: props.eventId
    })

    toast.add({
      title: 'Event updated',
      description: `Your event was updated successfully.`,
      color: 'success'
    })

    state.title = ''
    state.date = ''
    state.type = ''
    emit('close', true)
  } catch (e) {
    showToast()
  }
}
</script>

<template>
  <UModal
    :close="{ onClick: () => emit('close', false) }"
    title="Edit Event"
    class="max-w-2xl"
  >
    <template #footer>
      <form @submit.prevent="submitEvent" class="flex items-center gap-2">
        <UInput v-model="state.title" placeholder="Event title"  />
        <USelect v-model="state.type" :items="eventTypes" placeholder="Event type" class="w-48" />
        <UInput v-model="state.date" type="date"    />
        <UButton color="warning" type="submit" icon="i-heroicons-arrow-path" size="lg">Edit</UButton>
      </form>
    </template>
  </UModal>
</template>

  