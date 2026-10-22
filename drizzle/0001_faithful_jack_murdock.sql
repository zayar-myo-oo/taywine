CREATE TABLE `analytics_events` (
	`id` text PRIMARY KEY NOT NULL,
	`day` text NOT NULL,
	`visitor_id` text NOT NULL,
	`kind` text NOT NULL,
	`song_id` text DEFAULT '' NOT NULL,
	`device` text NOT NULL,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE INDEX `analytics_day_visitor_idx` ON `analytics_events` (`day`,`visitor_id`);--> statement-breakpoint
CREATE INDEX `analytics_song_day_idx` ON `analytics_events` (`song_id`,`day`);--> statement-breakpoint
CREATE TABLE `cms_admin_sessions` (
	`id` text PRIMARY KEY NOT NULL,
	`expires_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `cms_login_attempts` (
	`key` text PRIMARY KEY NOT NULL,
	`attempts` integer DEFAULT 1 NOT NULL,
	`window_start` integer NOT NULL
);
