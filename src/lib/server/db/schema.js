import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const user = sqliteTable('user', {
	id: text('id').primaryKey(),
	age: integer('age'),
	username: text('username').notNull().unique(),
	passwordHash: text('password_hash').notNull()
});

export const session = sqliteTable('session', {
	id: text('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => user.id),
	expiresAt: integer('expires_at', { mode: 'timestamp' }).notNull()
});

export const questão = sqliteTable('questão', {
	id: integer().primaryKey({ autoIncrement: true }),
	enunciado: text().notNull(),
	alternativa1: text().notNull(),
	alternativa2: text().notNull(),
	alternativa3: text().notNull(),
	alternativa4: text().notNull(),
	alternativa5: text().notNull(),
	resposta: integer().notNull()
});

export const categoria = sqliteTable('categoria', {
	id: integer().primaryKey({ autoIncrement: true }),
	nome: text().notNull()
});

export const questão_categoria = sqliteTable('questão_categoria', {
	id: integer().primaryKey({ autoIncrement: true }),
	id_questão: integer().notNull().references(() => questão.id),
	id_categoria: integer().notNull().references(() => categoria.id)
});
