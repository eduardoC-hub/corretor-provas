import { fail, redirect } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export const load = async () => {
	const questoes = await db.select().from(table.questao);
	return { questoes };
};

export const actions = {
	criar: async (event) => {
		const formData = await event.request.formData();
		const enunciado = formData.get('enunciado');
		const alternativa1 = formData.get('alternativa1');
		const alternativa2 = formData.get('alternativa2');
		const alternativa3 = formData.get('alternativa3');
		const alternativa4 = formData.get('alternativa4');
		const alternativa5 = formData.get('alternativa5');

		const resposta = Number(formData.get('resposta'));

		console.log('Dados recebidos:', {
			enunciado,
			alternativa1,
			alternativa2,
			alternativa3,
			alternativa4,
			alternativa5,
			resposta
		});

		try {
			// Inserindo no banco
			await db.insert(table.questao).values({
				enunciado,
				alternativa1,
				alternativa2,
				alternativa3,
				alternativa4,
				alternativa5,
				resposta
			});

			console.log('Questão salva com sucesso!');
		} catch (e) {
			console.error('Erro ao salvar no banco:', e.message);
			return fail(500, {
				form: { message: 'Erro ao salvar no banco: ' + e.message }
			});
		}

		// Se estiver usando enhance, o redirecionamento precisa ser feito manualmente no frontend
		return { success: true };
	},

	excluir: async (event) => {
		const formData = await event.request.formData();
		const id = formData.get('id');

		try {
			await db.delete(table.questao).where(eq(table.questao.id, id));
		} catch (e) {
			return fail(500, { message: 'Ocorreu um erro: ' + e.message });
		}
		return redirect(302, '/questoes/listaquestoes');
	},
	
	editar: async (event) => {
		const formData = await event.request.formData();
		const id = formData.get('id');
		const enunciado = formData.get('enunciado');
		const alternativa1 = formData.get('alternativa1');
		const alternativa2 = formData.get('alternativa2');
		const alternativa3 = formData.get('alternativa3');
		const alternativa4 = formData.get('alternativa4');
		const alternativa5 = formData.get('alternativa5');
		const resposta = Number(formData.get('resposta'));
		await db.update(table.questao).set({ enunciado, alternativa1, alternativa2, alternativa3, alternativa4, alternativa5, resposta }).where(eq(table.questao.id, id));
		return redirect(302, '/questoes/listaquestoes');
	}
};
