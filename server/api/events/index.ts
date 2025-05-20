import { db } from '~/server/database';
import { events, eventType } from '~/server/database/schema';
import { asc, desc, eq } from 'drizzle-orm';
import { z } from 'zod';

const EventInput = z.object({
  title: z.string(),
  date: z.string(),
  type: z.string(),
  userId: z.string(),
});


export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const userId = String(query.userId);
  if (!userId) {
    throw createError({ statusCode: 400, statusMessage: 'Missing userId' });
  }

  if(event.method === 'GET') {
    const sortOrder = query.sort === 'desc' ? desc : asc;
    // const allEvents = await db
    //   .select()
    //   .from(events)
    //   .where(eq(events.userId, userId))
    //   .orderBy(sortOrder(events.date));    

      const allEvents = await db.select({
        id: events.id,
        title: events.title,
        date: events.date,
        type: events.type,
        icon: eventType.icon
      }).from(events).innerJoin(eventType, eq(eventType.name, events.type))
      .where(eq(events.userId, userId))
      .orderBy(sortOrder(events.date))
      return allEvents;
  }

  if (event.method === 'POST') {
    const body = await readBody(event);
    const parsed = EventInput.safeParse(body);

    if (!parsed.success) {
      throw createError({ statusCode: 400, statusMessage: 'Invalid event data' });
    }

    const parsedData = {
      ...parsed.data,
      date: new Date(parsed.data.date)
    }

    const [newEvent] = await db
      .insert(events)
      .values(parsedData)
      .returning();
        return newEvent;
      }
});
