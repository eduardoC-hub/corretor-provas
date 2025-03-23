import { error, redirect } from '@sveltejs/kit';
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
    salvar: async (event) => {
        const formData = await event.request.formData();

        const id = formData.get('id');
        const enunciado = formData.get('enunciado')?.trim();
        const alternativa1 = formData.get('alternativa1')?.trim();
        const alternativa2 = formData.get('alternativa2')?.trim();
        const alternativa3 = formData.get('alternativa3')?.trim();
        const alternativa4 = formData.get('alternativa4')?.trim();
        const alternativa5 = formData.get('alternativa5')?.trim();
        const resposta = Number(formData.get('resposta'));

        if (!enunciado) {
            return { status: 400, body: { message: "O enunciado não pode estar vazio!" } };
        }

        try {
            await db.update(table.questao).set({
                enunciado,
                alternativa1,
                alternativa2,
                alternativa3,
                alternativa4,
                alternativa5,
                resposta
            }).where(eq(table.questao.id, id));

        } catch (e) {
            return { status: 500, body: { message: 'Ocorreu um erro: ' + e.message } };
        }
    
        return redirect(302, '/questoes/questao/' + id);
    },
};