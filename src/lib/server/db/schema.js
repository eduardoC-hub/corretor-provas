import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

// Tabela de usuários
export const user = sqliteTable('user', {
    id: text('id').primaryKey(),
    age: integer('age'),
    username: text('username').notNull().unique(),
    passwordHash: text('password_hash').notNull()
});

// Tabela de sessões
export const session = sqliteTable('session', {
    id: text('id').primaryKey(),
    userId: text('user_id')
        .notNull()
        .references(() => user.id, { onDelete: 'cascade' }),  // CASCADE ativado
    expiresAt: integer('expires_at', { mode: 'timestamp' }).notNull()
});

// Tabela de questões
export const questao = sqliteTable('questao', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    enunciado: text('enunciado').notNull(),
    alternativa1: text('alternativa1').notNull(),
    alternativa2: text('alternativa2').notNull(),
    alternativa3: text('alternativa3').notNull(),
    alternativa4: text('alternativa4').notNull(),
    alternativa5: text('alternativa5').notNull(),
    resposta: integer('resposta').notNull()
});

// Tabela de categorias
export const categoria = sqliteTable('categoria', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    nome: text('nome').notNull().unique()
});

// Tabela de relação entre questões e categorias
export const questao_categoria = sqliteTable('questao_categoria', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    id_questao: integer('id_questao').notNull()
        .references(() => questao.id, { onDelete: 'cascade' }).notNull(),  // CASCADE ativado
    id_categoria: integer('id_categoria').notNull()
        .references(() => categoria.id, { onDelete: 'cascade' }).notNull() // CASCADE ativado
});
