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
    async fetchSingleEvent(id: string):Promise<Event> {
      try {
        const events = await $fetch<Event[]>(`/api/events/${id}`);
        return events[0];
      } catch (error) {
        console.error('Failed to fetch single event:', error);
        throw error;
      }
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
    },
    async updateEvent(event: {title: string; date: string; type: string, id: string}) {
      try {
       await $fetch(`/api/events/${event.id}`, {
        method: 'PATCH',
        body: event
       })      
      } catch (error) {
        console.error('Failed to update event:', error)
      }
    }
  }
})
