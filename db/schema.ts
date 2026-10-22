import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
export const cmsSongs = sqliteTable('cms_songs', {
 id: text('id').primaryKey(),
 draft: text('draft').notNull(),
 published: text('published'),
 visibility: text('visibility').notNull().default('original'),
 deletedAt: text('deleted_at'),
 revision: integer('revision').notNull().default(1),
 updatedAt: text('updated_at').notNull(),
 updatedBy: text('updated_by').notNull(),
});
