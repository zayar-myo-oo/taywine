import { sqliteTable, text, integer, index, uniqueIndex } from 'drizzle-orm/sqlite-core';
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

export const songRevisions = sqliteTable('song_revisions', {
 id: integer('id').primaryKey({autoIncrement:true}),
 songId: text('song_id').notNull(),
 revision: integer('revision').notNull(),
 snapshot: text('snapshot').notNull(),
 action: text('action').notNull(),
 actor: text('actor').notNull(),
 createdAt: text('created_at').notNull(),
}, table=>[uniqueIndex('song_revision_unique').on(table.songId,table.revision)]);
export const communitySubmissions = sqliteTable('community_submissions', {
 id: text('id').primaryKey(),
 kind: text('kind').notNull(),
 songId: text('song_id'),
 payload: text('payload').notNull(),
 status: text('status').notNull().default('pending'),
 reply: text('reply').notNull().default(''),
 approvedSongId: text('approved_song_id'),
 createdAt: text('created_at').notNull(),
 reviewedAt: text('reviewed_at'),
}, table=>[index('community_status_date_idx').on(table.status,table.createdAt)]);
export const sharedSetlists = sqliteTable('shared_setlists', {
 id: text('id').primaryKey(),
 payload: text('payload').notNull(),
 createdAt: text('created_at').notNull(),
});
// Canonical artists group credited names (Myanmar/English aliases). Song records keep their original artist text.
export const artists = sqliteTable('artists', {
 id: text('id').primaryKey(),
 name: text('name').notNull(),
 createdAt: text('created_at').notNull(),
 updatedAt: text('updated_at').notNull(),
});
export const artistAliases = sqliteTable('artist_aliases', {
 aliasKey: text('alias_key').primaryKey(),
 alias: text('alias').notNull(),
 artistId: text('artist_id').notNull(),
 createdAt: text('created_at').notNull(),
}, table=>[index('artist_alias_artist_idx').on(table.artistId)]);
