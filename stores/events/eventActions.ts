import { type Event } from '#imports'

export const eventActions = {
  async fetchEvents(this: any, userId: string) {
    this.events = await $fetch<Event[]>(`/api/events?userId=${userId}`)
  },

  async fetchSingleEvent(this: any, id: string): Promise<Event> {
    try {
      const events = await $fetch<Event[]>(`/api/events/${id}`);
      return events[0];
    } catch (error) {
      console.error('Failed to fetch single event:', error);
      throw error;
    }
  },

  async addEvent(
    this: any,
    event: Pick<Event, 'title' | 'date' | 'type' | 'userId'>
  ) {
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

  async deleteEvent(this: any, id: string) {
    try {
      await $fetch(`/api/events/${id}`, {
        method: 'DELETE',
        body: id
      })
    } catch (error) {
      console.error('Failed to delete event:', error)
    }
  },

  async updateEvent(
    this: any,
    event: Pick<Event, 'id' | 'title' | 'date' | 'type'>
  ) {
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
