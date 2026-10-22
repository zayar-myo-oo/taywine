CREATE TABLE `cms_songs` (
	`id` text PRIMARY KEY NOT NULL,
	`draft` text NOT NULL,
	`published` text,
	`visibility` text DEFAULT 'original' NOT NULL,
	`deleted_at` text,
	`revision` integer DEFAULT 1 NOT NULL,
	`updated_at` text NOT NULL,
	`updated_by` text NOT NULL
);
