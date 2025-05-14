<script setup>
import { shallowRef, onMounted } from 'vue'
import { useAuth } from '#imports'
import { ScheduleXCalendar } from '@schedule-x/vue'
import {
  createCalendar,   
  createViewMonthAgenda,
  createViewMonthGrid,
} from '@schedule-x/calendar'
import '@schedule-x/theme-default/dist/index.css'

const calendarApp = shallowRef()
const eventStore = useEventStore()

const {userId} = useAuth();


onMounted(async () => {
  // Fetch the events asynchronously
  await eventStore.fetchEvents(userId.value)

  // Ensure the events are formatted correctly
  const formattedEvents = eventStore.events
    .filter(e => e.date)
    .map(event => {
      const startDate = new Date(event.date)
      
      // Check if the event is a full-day event
      const isFullDayEvent = !event.start || event.start.trim().length === 0 || event.start.split(" ").length === 1

      return {
        id: event.id,
        title: event.title,
        start: isFullDayEvent ? startDate.toISOString().split('T')[0] : startDate.toISOString(), 
        end: isFullDayEvent ? startDate.toISOString().split('T')[0] : startDate.toISOString(), 
      }
    })

  // Create the calendar instance and assign to `calendarApp`
  calendarApp.value = createCalendar({
    selectedDate: '2025-05-12',
    views: [
      createViewMonthGrid(),
      createViewMonthAgenda(),
    //   createViewDay(),
    ],
    events: formattedEvents, // Use the formatted events
  })
})
</script>

<template>
  <div v-if="calendarApp" class="px-4">
    <ScheduleXCalendar :calendar-app="calendarApp" />
  </div>
</template>
<style scoped>
.sx-vue-calendar-wrapper {
  height: 600px;
  background-color: #0E172B;
  color: #ffffff;
}

:deep(.sx-calendar) {
  --sx-color-bg: #0E172B;
  --sx-color-surface: #16233c;
  --sx-color-surface-hover: #1e2e4f;
  --sx-color-text: #ffffff;
  --sx-color-primary: #4f83ff;
  --sx-color-border: #2a3c5f;
  --sx-border-radius: 6px;
  --sx-font-family: 'Inter', sans-serif;
}

</style>

