import { error, redirect, fail } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export async function load({ params }) {
    const id = Number(params.id);

    // Buscar a questão e suas categorias
    const questao = await db
        .select()
        .from(table.questao)
        .where(eq(table.questao.id, id))
        .limit(1);

    if (!questao.length) {
        throw error(404, 'Questão não encontrada.');
    }

    const categorias = await db
        .select({ nome: table.categoria.nome })
        .from(table.questao_categoria)
        .innerJoin(table.categoria, eq(table.questao_categoria.id_categoria, table.categoria.id))
        .where(eq(table.questao_categoria.id_questao, id));

    return {
        questao: questao[0],
        categorias
    };
}

export const actions = {
    excluir: async (event) => {
        const formData = await event.request.formData();
        const id = formData.get('id');

        try {
            await db.delete(table.questao).where(eq(table.questao.id, id));
        } catch (e) {
            return fail(500, { message: 'Ocorreu um erro: ' + e.message });
        }
        return redirect(302, '/questoes/');
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
        return redirect(302, '/questoes');
    },
};