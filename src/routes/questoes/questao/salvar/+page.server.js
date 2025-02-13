import { fail } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import { inArray } from 'drizzle-orm';
import { redirect } from '@sveltejs/kit';

export const actions = {
	criar: async (event) => {
		const formData = await event.request.formData();
		const enunciado = formData.get('enunciado');
		const alternativa1 = formData.get('alternativa1');
		const alternativa2 = formData.get('alternativa2');
		const alternativa3 = formData.get('alternativa3');
		const alternativa4 = formData.get('alternativa4');
		const alternativa5 = formData.get('alternativa5');
		const categorias = formData.getAll('categorias');
		const resposta = Number(formData.get('resposta'));

		let id_questao;

		try {
			await db.transaction(async (tx) => {
				[{ id_questao }] = await tx.insert(table.questao).values({
					enunciado,
					alternativa1,
					alternativa2,
					alternativa3,
					alternativa4,
					alternativa5,
					resposta
				}).returning({ id_questao: table.questao.id });

				await tx.insert(table.categoria).values(categorias.map(item => ({ nome: item }))).onConflictDoNothing();
				const id_categorias = await tx.select({ id_categoria: table.categoria.id }).from(table.categoria).where(inArray(table.categoria.nome, categorias));

				await tx.insert(table.questao_categoria).values(id_categorias.map(({ id_categoria }) => ({ id_questao, id_categoria })));
			});
		} catch (e) {
			return fail(500, {
				message: 'Ocorreu um erro: ' + e.message, enunciado, alternativa1, alternativa2, alternativa3, alternativa4, alternativa5, categorias, resposta
			});
		}

		return redirect(302, `/questoes/questao/${id_questao}`);
	}
};
