import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';

export async function POST({ request }) {
  try {
    const { questoes } = await request.json();

    for (const questao of questoes) {
      await db.insert(table.questao).values({
        enunciado: questao.enunciado,
        alternativa1: questao.alternativa1,
        alternativa2: questao.alternativa2,
        alternativa3: questao.alternativa3,
        alternativa4: questao.alternativa4,
        alternativa5: questao.alternativa5,
        resposta: Number(questao.resposta) // Garante que a resposta é um número
      });
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("Erro ao importar questões:", error);
    return new Response(JSON.stringify({ success: false, message: error.message }), { status: 500 });
  }
}