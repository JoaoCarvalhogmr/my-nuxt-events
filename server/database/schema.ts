import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const events = pgTable('events', {
    id: uuid('id').primaryKey().defaultRandom(), 
    userId: text('userId').notNull(),
    title: text('title').notNull(),
    type: text('type').notNull(),
    date: timestamp('date', { withTimezone: true }).notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  });

  export const eventType = pgTable('event_type', {
    name: text('name').notNull().unique(),
    icon: text('icon').notNull(),
});