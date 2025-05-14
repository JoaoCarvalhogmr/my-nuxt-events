import { defineStore } from 'pinia'
import { type Event } from '#imports';

export const useEventStore = defineStore('events', {
  state: () => ({
    events: [] as Event[],
  }),
  actions: {
    async fetchEvents(userId: string) {
      this.events = await $fetch<Event[]>(`/api/events?userId=${userId}`)
    },
    async addEvent(event: { title: string; date: string; type: string, userId: string }) {
      try {
        const newEvent = await $fetch<Event>('/api/events', {
          method: 'POST',
          body: event
        })
        this.events.push(newEvent)
      } catch (error) {
          console.error('Failed to add event:', error)
      }
    },
    async deleteEvent(id: string) {
      try {
       await $fetch(`/api/events/${id}`, {
        method: 'DELETE',
        body: id
       })
      } catch (error) {
        console.error('Failed to delete event:', error)
      }
    }    
  }
})
