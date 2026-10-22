CREATE TABLE `community_submissions` (
	`id` text PRIMARY KEY NOT NULL,
	`kind` text NOT NULL,
	`song_id` text,
	`payload` text NOT NULL,
	`status` text DEFAULT 'pending' NOT NULL,
	`reply` text DEFAULT '' NOT NULL,
	`approved_song_id` text,
	`created_at` text NOT NULL,
	`reviewed_at` text
);
--> statement-breakpoint
CREATE INDEX `community_status_date_idx` ON `community_submissions` (`status`,`created_at`);--> statement-breakpoint
CREATE TABLE `shared_setlists` (
	`id` text PRIMARY KEY NOT NULL,
	`payload` text NOT NULL,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `song_revisions` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`song_id` text NOT NULL,
	`revision` integer NOT NULL,
	`snapshot` text NOT NULL,
	`action` text NOT NULL,
	`actor` text NOT NULL,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `song_revision_unique` ON `song_revisions` (`song_id`,`revision`);