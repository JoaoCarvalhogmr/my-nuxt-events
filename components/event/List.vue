<script setup lang="ts">
import { computed, onMounted,reactive } from 'vue'
import { useAuth} from '#imports'
import { useEventStore } from '~/stores/events/useEventstore'
import FilterLabelWrapper from './FilterLabelWrapper.vue'
const eventStore = useEventStore()

const eventTypes = ref<string[]>([])

onMounted(async () => {
  state.isLoading = true;

  try {
    if (!userId.value) {
      return;
    }

    const eventTypeData = await eventStore.fetchEventTypes();
    eventTypes.value = eventTypeData.map(item => item.name);

    await eventStore.fetchEvents(userId.value);
  } catch (error) {
    console.error('Error fetching data:', error);
    
  } finally {
    state.isLoading = false;
  }
});

type EventTypeName = string | 'All'; // or a stricter union if you know the types

type EventListState = {
  timeFilter: 'All' | 'Upcoming' | 'Past',
  typeFilter: EventTypeName
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
      <FilterLabelWrapper label="Time">
        <USelectMenu
              v-model="state.timeFilter"
              :items="['All', 'Upcoming', 'Past']"
              class="w-full md:w-48"
          />
      </FilterLabelWrapper>
      <FilterLabelWrapper label="Type">
        <USelectMenu
          v-model="state.typeFilter"
          :items="['All', ...eventTypes]"
          class="w-full md:w-48"
        />
      </FilterLabelWrapper>
    </div>
    <h2 class="text-gray-900 dark:text-white font-semibold text-lg flex items-center gap-2">
      {{ state.timeFilter }} Events
    <UBadge v-if="filteredEvents.length" color="primary" variant="subtle">
      {{ filteredEvents.length }}
    </UBadge>
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
        :icon="event.icon"
    />
    </ul>
  </UCard>
</template>