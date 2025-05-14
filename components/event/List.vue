<script setup lang="ts">
import { computed, onMounted,reactive } from 'vue'
import { useAuth} from '#imports'
import { useEventStore } from '#imports'

const eventStore = useEventStore()

const eventTypes = [
  'All',
  'concert',
  'meeting',
  'workshop',
  'webinar',
  'conference',
  'birthday',
  'holiday',
  'festival',
  'sport',
  'networking',
  'fundraiser',
  'party',
  'seminar',
  'launch',
  'training'
] as const

type EventListState = {
  timeFilter: 'All' | 'Upcoming' | 'Past',
  typeFilter: typeof eventTypes[number],
  isLoading: boolean,
}
const state = reactive<EventListState>({
  timeFilter: 'All',
  typeFilter: 'All',
  isLoading: false  
})

const { userId } = useAuth();

onMounted(async() => {
    state.isLoading= true;
    if (!userId.value) {
        state.isLoading = false;
        return;
    }
    await eventStore.fetchEvents(userId.value);
    state.isLoading = false;
})

const filteredEvents = computed(() => {
  const now = new Date()

  return eventStore.events.filter(({ date, type }) => {
    const eventDate = new Date(date)

    const isTimeMatch = 
      state.timeFilter === 'All' ||
      (state.timeFilter === 'Upcoming' && eventDate >= now) ||
      (state.timeFilter === 'Past' && eventDate < now)

    const isTypeMatch = 
      state.typeFilter === 'All' || type === state.typeFilter
    return isTimeMatch && isTypeMatch
  })
})

</script>
<template>
  <UCard class="p-4">
    <div class="bg-[#1e293b] p-4 rounded-xl mb-6 shadow flex flex-col md:flex-row gap-4">
      <div class="flex-1">
        <label class="block text-sm font-medium text-white mb-1">
          Filter by Time
        </label>
        <USelectMenu
            v-model="state.timeFilter"
            :items="['All', 'Upcoming', 'Past']"
            class="w-full md:w-48"
        />
      </div>
      <div class="flex-1">
        <label class="block text-sm font-medium text-white mb-1">
          Filter by Type
        </label>
        <USelectMenu
          v-model="state.typeFilter"
          :items="Array.from(eventTypes)"
          class="w-full md:w-48"
        />
      </div>
    </div>

    <h2 class="text-gray-900 dark:text-white font-semibold text-lg">
      {{ state.timeFilter }} Events
    </h2>
    <USeparator />
    <EventSkeleton v-if="state.isLoading" />
    <div v-else-if="!filteredEvents.length" class="flex flex-col items-center justify-center mt-6 text-gray-400 text-center">
      <div class="text-xl font-semibold mb-2">
          No events found.
      </div>
      <p class="text-sm">
          Adjust the filters or <strong>add your own event</strong> to get started.
      </p>
    </div>
    <ul v-else class="flex flex-col gap-2 mt-2">
    <EventCard 
        v-for="event in filteredEvents" 
        :key="event.id" 
        :id="event.id" 
        :title="event.title"   
        :date="new Date(event.date).toLocaleDateString()"
        :type="event.type"
    />
    </ul>
  </UCard>
</template>