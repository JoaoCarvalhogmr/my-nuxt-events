import { eq } from 'drizzle-orm';
import { db } from '~/server/database';
import { events } from '~/server/database/schema';

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id');

  if (!id) {
    throw new Error('Invalid or missing event ID');
  }

  if(event.method === 'GET') {
    const singleEvent = await db.select().from(events).where(eq(events.id, id));
    
    return singleEvent;
  }

  else if(event.method === 'DELETE') {
    await db.delete(events).where(eq(events.id, id));
  }
});
