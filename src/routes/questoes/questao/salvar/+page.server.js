import { fail } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';

export const actions = {
	criar: async (event) => {
		const formData = await event.request.formData();
		const enunciado = formData.get('enunciado');
		const alternativa1 = formData.get('alternativa1');
		const alternativa2 = formData.get('alternativa2');
		const alternativa3 = formData.get('alternativa3');
		const alternativa4 = formData.get('alternativa4');
		const alternativa5 = formData.get('alternativa5');
		const categorias = formData.getAll('categorias'); // todo-list preciso converter para array de objetos com pelo menos nome, mas alguns podem ter id?
		const resposta = Number(formData.get('resposta'));

		try {
			await db.transaction(async (tx) => {
				const [questao] = await tx.insert(table.questao).values({
					enunciado,
					alternativa1,
					alternativa2,
					alternativa3,
					alternativa4,
					alternativa5,
					resposta
				}).returning({ id_questao: table.questao.id });

				await tx.insert(table.categoria).values(categorias).onConflictDoNothing();

				// for (const categoria of categorias) {
				// 	await tx.insert(table.questao_categoria).values({
				// 		id_questao: questao.id_questao,
				// 		id_categoria: categoria.id
				// 	});
				// }
			});
		} catch (e) {
			return fail(500, {
				message: 'Ocorreu um erro: ' + e.message, enunciado, alternativa1, alternativa2, alternativa3, alternativa4, alternativa5, categorias, resposta
			});
		}

		// Se estiver usando enhance, o redirecionamento precisa ser feito manualmente no frontend
		return { success: true };
	}
};
