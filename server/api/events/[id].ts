import { eq } from 'drizzle-orm';
import { db } from '~/server/database';
import { events } from '~/server/database/schema';
import { z } from 'zod';

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id');

  const EventInput = z.object({
    title: z.string(),
    date: z.string(),
    type: z.string(),
  });

  if (!id) {
    throw new Error('Invalid or missing event ID');
  }

  if(event.method === 'GET') {
    const singleEvent = await db.select().from(events).where(eq(events.id, id));
    
    return singleEvent;
  }

  if (event.method === 'PATCH') {
    const body = await readBody(event);
    const parsed = EventInput.safeParse(body);

    if (!parsed.success) {
      throw createError({ statusCode: 400, statusMessage: 'Invalid event data' });
    }

    const parsedData = {
      ...parsed.data,
      date: new Date(parsed.data.date)
    };

    const [updatedEvent] = await db
      .update(events)
      .set(parsedData)
      .where(eq(events.id, id))
      .returning();

    return updatedEvent;
  }

  else if(event.method === 'DELETE') {
    await db.delete(events).where(eq(events.id, id));
  }
});
