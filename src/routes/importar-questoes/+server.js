import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';

export async function POST({ request }) {
  try {
    const { questoes } = await request.json();

    for (const questao of questoes) { 
      // extrair categorias do atributo categorias que é uma string separada por vírgula
      const categorias = questao.categorias.split(',').map(item => item.trim()).filter(Boolean);
      await db.transaction(async (tx) => {
				[{ id_questao }] = await tx.insert(table.questao)
					.values({ enunciado:questao.enunciado, alternativa1:questao.alternativa1, alternativa2:questao.alternativa2, alternativa3:questao.alternativa3, alternativa4:questao.alternativa4, alternativa5:questao.alternativa5, resposta:questao.resposta }).returning({ id_questao: table.questao.id });

				await tx.insert(table.categoria).values(categorias.map(item => ({ nome: item }))).onConflictDoNothing();
				const id_categorias = await tx.select({ id_categoria: table.categoria.id }).from(table.categoria).where(inArray(table.categoria.nome, categorias));

				await tx.insert(table.questao_categoria).values(id_categorias.map(({ id_categoria }) => ({ id_questao, id_categoria })));
			});
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("Erro ao importar questões:", error);
    return new Response(JSON.stringify({ success: false, message: error.message }), { status: 500 });
  }
}