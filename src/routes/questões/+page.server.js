import { fail, redirect } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';

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
            return fail(500, { message: 'An error has occurred: ' + e.message });
        }
        return redirect(302, '/categorias');
    }
};