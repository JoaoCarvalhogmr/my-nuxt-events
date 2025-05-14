<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useAuth } from '#imports'
import { useEventStore } from '#imports'

const eventStore = useEventStore()

const timeFilter = ref<'All' | 'Upcoming' | 'Past'>('All')
const typeFilter = ref<string>('All')
const isLoading = ref<boolean>(false)

const { userId } = useAuth();

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
]

onMounted(async() => {
    isLoading.value = true;
    if (!userId.value) {
        isLoading.value = false;
        return;
    }
    await eventStore.fetchEvents(userId.value);
    isLoading.value = false;
})

const filteredEvents = computed(() => {
  const now = new Date()

  return eventStore.events.filter((event: { date: string; type: string }) => {
    const eventDate = new Date(event.date)

    const timeMatches =
      timeFilter.value === 'All' ||
      (timeFilter.value === 'Upcoming' && eventDate >= now) ||
      (timeFilter.value === 'Past' && eventDate < now)

    const typeMatches =
      typeFilter.value === 'All' || event.type === typeFilter.value

    return timeMatches && typeMatches
  })
})
</script>
<template>
  <UCard class="p-4">
    <!-- Filter Section -->
    <div class="bg-[#1e293b] p-4 rounded-xl mb-6 shadow flex flex-col md:flex-row gap-4">
      <div class="flex-1">
        <label class="block text-sm font-medium text-white mb-1">
          Filter by Time
        </label>
        <USelectMenu
            v-model="timeFilter"
            :items="['All', 'Upcoming', 'Past']"
            class="w-full md:w-48"
        />
      </div>
      <div class="flex-1">
        <label class="block text-sm font-medium text-white mb-1">
          Filter by Type
        </label>
        <USelectMenu
          v-model="typeFilter"
          :items="eventTypes"
          class="w-full md:w-48"
        />
      </div>
    </div>

    <!-- Event List Header -->
    <h2 class="text-lg font-semibold mb-2 flex items-center gap-2 text-white">
      {{ timeFilter }} Events
    </h2>
    <USeparator />
    <!-- Event List -->
    <EventSkeleton v-if="isLoading" />
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
    <!-- Empty State -->

  </UCard>
</template>