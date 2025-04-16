export const actions = {
	gerarprova: async (event) => {
		const formData = await event.request.formData();
		const questoesescolhidasString = formData.get('questoesescolhidas');
		const qtdprovasString = formData.get('qtdprovas');
		const qtdprovas = JSON.parse(qtdprovasString);
		const questoesescolhidas = JSON.parse(questoesescolhidasString);
		const provas = [];

		while (provas.length < qtdprovas) {
			const copiaQuestoes = structuredClone(questoesescolhidas);
			shuffle(copiaQuestoes);
			for (const questao of copiaQuestoes) {
				questao.alternativas = [questao.alternativa1, questao.alternativa2, questao.alternativa3, questao.alternativa4, questao.alternativa5];
				const indiceResposta = Number(questao.resposta) - 1;
				const respostaCorreta = questao.alternativas[indiceResposta];
				questao.respostacerta = respostaCorreta;
				shuffle(questao.alternativas);
				questao.resposta = questao.alternativas.findIndex((alt) => alt === respostaCorreta);
			}

			provas.push(copiaQuestoes);
		}

		return {
			provas,
			qtdprovas
		};
	}
};

function shuffle(array) {
	let currentIndex = array.length;
	while (currentIndex != 0) {
		let randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex--;
		[array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
	}
}