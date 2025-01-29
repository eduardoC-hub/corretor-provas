import { fail, redirect } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';

export const actions = {
    criar: async (event) => {
        const formData = await event.request.formData();
        const enunciado = formData.get('enunciado');
        const alternativas = [
            formData.get('alternativa1'),
            formData.get('alternativa2'),
            formData.get('alternativa3'),
            formData.get('alternativa4'),
            formData.get('alternativa5')
        ];
        const resposta = Number(formData.get('resposta'));

        console.log('Dados recebidos:', { enunciado, alternativas, resposta });

        // Validação: Verificar se todos os campos estão preenchidos corretamente
        if (!enunciado || alternativas.some(a => !a) || resposta < 1 || resposta > 5) {
            return fail(400, { 
                form: { message: 'Preencha todos os campos corretamente!' } 
            });
        }

        try {
            // Inserindo no banco
            await db.insert(table.questao).values({ 
                enunciado, 
                alternativas: JSON.stringify(alternativas), 
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
    }
};
