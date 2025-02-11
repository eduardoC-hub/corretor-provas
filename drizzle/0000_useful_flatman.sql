CREATE TABLE `categoria` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`nome` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `questao` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`enunciado` text NOT NULL,
	`alternativa1` text NOT NULL,
	`alternativa2` text NOT NULL,
	`alternativa3` text NOT NULL,
	`alternativa4` text NOT NULL,
	`alternativa5` text NOT NULL,
	`resposta` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `questao_categoria` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`id_questao` integer NOT NULL,
	`id_categoria` integer NOT NULL,
	FOREIGN KEY (`id_questao`) REFERENCES `questao`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`id_categoria`) REFERENCES `categoria`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `session` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`expires_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` text PRIMARY KEY NOT NULL,
	`age` integer,
	`username` text NOT NULL,
	`password_hash` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `categoria_nome_unique` ON `categoria` (`nome`);--> statement-breakpoint
CREATE UNIQUE INDEX `user_username_unique` ON `user` (`username`);