import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import { inArray } from 'drizzle-orm';

export async function POST({ request }) {
  try {
    const { questoes } = await request.json();

    for (const questao of questoes) {
      const categorias = questao.categorias.split(',').map(item => item.trim()).filter(Boolean);
      
      await db.transaction(async (tx) => {
        // Insere a questão e garante que o retorno existe antes de desestruturar
        const insertedQuestao = await tx.insert(table.questao)
          .values({
            enunciado: questao.enunciado,
            alternativa1: questao.alternativa1,
            alternativa2: questao.alternativa2,
            alternativa3: questao.alternativa3,
            alternativa4: questao.alternativa4,
            alternativa5: questao.alternativa5,
            resposta: questao.resposta
          })
          .returning({ id_questao: table.questao.id });

        if (!insertedQuestao || insertedQuestao.length === 0) {
          throw new Error("Erro ao inserir questão: Nenhum ID retornado.");
        }

        const id_questao = insertedQuestao[0].id_questao; // Agora temos certeza que existe um ID válido

        // Insere categorias (evita conflito de duplicadas)
        await tx.insert(table.categoria)
          .values(categorias.map(nome => ({ nome })))
          .onConflictDoNothing();

        // Busca os IDs das categorias inseridas
        const id_categorias = await tx.select({ id_categoria: table.categoria.id })
          .from(table.categoria)
          .where(inArray(table.categoria.nome, categorias));

        // Associa as categorias à questão
        await tx.insert(table.questao_categoria)
          .values(id_categorias.map(({ id_categoria }) => ({ id_questao, id_categoria })));
      });
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("Erro ao importar questões:", error);
    return new Response(JSON.stringify({ success: false, message: error.message }), { status: 500 });
  }
}