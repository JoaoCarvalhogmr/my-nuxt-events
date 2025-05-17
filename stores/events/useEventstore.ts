import { defineStore } from 'pinia'
import { type Event } from '#imports';
import { eventActions } from './eventActions';

export const useEventStore = defineStore('events', {
  state: () => ({
    events: [] as Event[],
  }),
  actions: eventActions
})
