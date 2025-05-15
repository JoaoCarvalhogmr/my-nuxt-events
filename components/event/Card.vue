<script setup lang="ts">
  import type { Event } from '#imports';
  import {eventIconMap} from "~/utils/eventIcons"
  import { useAuth } from '#imports';
  import { EventDeleteModal } from '#components';
  import EditModal from './EditModal.vue';

  const props = defineProps<Event>();
  const icon = computed(() => eventIconMap[props.type] || eventIconMap.default)
  const store = useEventStore();
  const overlay = useOverlay()
  const { userId, isLoaded } = useAuth();


  const deleteEvent = async() => {
    if (!isLoaded.value || !userId.value) return;
    await store.deleteEvent(props.id);
    await store.fetchEvents(userId.value);
  }


  async function openModal(modalType: 'edit' | 'delete') {
    if(modalType === 'delete') {
    const modal = overlay.create(EventDeleteModal, {
      props: {
        title: `Are you sure you want to delete "${props.title}"?`,
      },
    });

    const instance = modal.open();
    
    const confirmed = await instance.result;

     if (confirmed && isLoaded.value && userId.value) {
      await deleteEvent();
    }

    } 
    else {
    const modal = overlay.create(EditModal, {
      props: {
        eventId: props.id,
      },
    });

    const instance = modal.open();
    
    const confirmed = await instance.result;

     if (confirmed && isLoaded.value && userId.value) {
      await store.fetchEvents(userId.value);
    }
    }

  }


</script>
  
<template>
  <UCard
    class="w-full max-w-md rounded-xl border border-gray-700 bg-[#162037] text-white shadow-md"
  >
    <template #header>
      <div class="flex items-center gap-4">
        <UIcon
          :name="icon"
          class="text-blue-400"
          size="28"
        />

        <div class="flex-1">
          <h3 class="text-lg font-semibold text-white">
            {{ props.title }}
          </h3>
          <p class="text-sm text-gray-400">
            {{ props.date }}
          </p>
        </div>
      <UButton
        icon="i-heroicons-pencil"
        size="xs"
        color="warning"
        variant="subtle"
        aria-label="Edit Event"
        @click="openModal('edit')"
      />
      <UButton
        icon="i-heroicons-trash"
        size="xs"
        color="error"
        variant="subtle"
        aria-label="Delete Event"
        @click="openModal('delete')"
      />
      </div>
    </template>
  </UCard>

</template>

