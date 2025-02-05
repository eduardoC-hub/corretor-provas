import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import * as table from './schema.js';

const client = createClient({ url: "file:local.db" });
export const db = drizzle(client);

async function seed() {
    console.log('Seeding database...');

    await popularCategoria();

    console.log('Database seeded successfully.');
    process.exit(0);
}

seed().catch((err) => {
    console.error('Error seeding database:', err);
    process.exit(1);
});

async function popularCategoria() {
    await db.insert(table.categoria).values([
        { nome: 'Matemática' },
        { nome: 'Português' },
        { nome: 'Geografia' },
        { nome: 'História' },
        { nome: 'Ciências' }
    ]);
}