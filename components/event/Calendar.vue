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
import { useEventStore } from '~/stores/events/useEventstore'

const calendarApp = shallowRef()
const eventStore = useEventStore()

const {userId} = useAuth();

onMounted(async () => {
  // Fetch the events asynchronously
  await eventStore.fetchEvents(userId.value)

  const formattedEvents = eventStore.events
    .filter(e => e.date)
    .map(event => {
      const startDate = new Date(event.date)
      
      const isFullDayEvent = !event.start || event.start.trim().length === 0 || event.start.split(" ").length === 1
      return {
        id: event.id,
        title: event.title,
        start: isFullDayEvent ? startDate.toISOString().split('T')[0] : startDate.toISOString(), 
        end: isFullDayEvent ? startDate.toISOString().split('T')[0] : startDate.toISOString(), 
      }
    })

  
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


</style>

