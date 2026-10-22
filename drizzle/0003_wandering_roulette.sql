CREATE TABLE `artist_aliases` (
	`alias_key` text PRIMARY KEY NOT NULL,
	`alias` text NOT NULL,
	`artist_id` text NOT NULL,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE INDEX `artist_alias_artist_idx` ON `artist_aliases` (`artist_id`);--> statement-breakpoint
CREATE TABLE `artists` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL
);
