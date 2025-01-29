import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import { fail, redirect } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';

export const load = async () => {
	const categorias = await db.select().from(table.categoria);
	return { categorias };
};

export const actions = {
	criar: async (event) => {
		const formData = await event.request.formData();
		const nome = formData.get('nome');

		if (nome.trim() === '') {
			return fail(400, { message: 'Por favor, digite algo' });
		}

		try {
			await db.insert(table.categoria).values({ nome });
		} catch (e) {
			return fail(500, { message: 'Ocorreu um erro: ' + e.message });
		}
		return redirect(302, '/categorias');
	},
	excluir: async (event) => {
		const formData = await event.request.formData();
		const id = formData.get('id');

		try {
			await db.delete(table.categoria).where(eq(table.categoria.id, id));
		} catch (e) {
			return fail(500, { message: 'Ocorreu um erro: ' + e.message });
		}
		return redirect(302, '/categorias');
	},
	editar: async (event) => {
		const formData = await event.request.formData();
		const nome = formData.get('nome');
		const id = formData.get('id');
		await db.update(table.categoria).set({ nome }).where(eq(table.categoria.id, id));
		return redirect(302, '/categorias');
	}
};
