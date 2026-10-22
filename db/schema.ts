import { sqliteTable, text, integer, index } from 'drizzle-orm/sqlite-core';
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

// Short-lived login throttling keys contain an HMAC, never raw addresses.
export const cmsLoginAttempts = sqliteTable('cms_login_attempts', {
 key: text('key').primaryKey(),
 attempts: integer('attempts').notNull().default(1),
 windowStart: integer('window_start').notNull(),
});
export const cmsAdminSessions = sqliteTable('cms_admin_sessions', {
 id: text('id').primaryKey(),
 expiresAt: integer('expires_at').notNull(),
});

export const analyticsEvents = sqliteTable('analytics_events', {
 id: text('id').primaryKey(),
 day: text('day').notNull(),
 visitorId: text('visitor_id').notNull(),
 kind: text('kind').notNull(),
 songId: text('song_id').notNull().default(''),
 device: text('device').notNull(),
 createdAt: text('created_at').notNull(),
}, table=>[
 index('analytics_day_visitor_idx').on(table.day,table.visitorId),
 index('analytics_song_day_idx').on(table.songId,table.day),
]);
