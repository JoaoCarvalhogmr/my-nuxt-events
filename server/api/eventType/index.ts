import { db } from '~/server/database';
import { eventType } from '~/server/database/schema';

export default defineEventHandler(async (event) => {

  if(event.method === 'GET') {
    const allEventTypes = await db
      .select()
      .from(eventType)
      .orderBy(eventType.name);
      return allEventTypes
  }
});
