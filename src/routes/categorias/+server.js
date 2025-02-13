import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import { json } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';

export async function GET({ url }) {
	const categoria = url.searchParams.get('categoria');
	const [resultado] = await db.select().from(table.categoria).where(eq(table.categoria.nome, categoria)).limit(1);
	return json(resultado ?? {});
}
