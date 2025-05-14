export type EventType =
  | 'concert'
  | 'meeting'
  | 'workshop'
  | 'webinar'
  | 'conference'
  | 'birthday'
  | 'holiday'
  | 'festival'
  | 'sport'
  | 'networking'
  | 'fundraiser'
  | 'party'
  | 'seminar'
  | 'launch'
  | 'training'
  | '';

export type Event = {
     id: string; title: string; date: string; createdAt?: string; type: EventType, userId?: string
}






