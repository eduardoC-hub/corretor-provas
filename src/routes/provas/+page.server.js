
export const actions = {
	gerarprova: async (event) => {
		const formData = await event.request.formData();
        const questoesescolhidas = formData.get('questoesescolhidas');
		console.log(formData)
        console.log(questoesescolhidas)

        // como passar um array dentro de um formulário
	}
};
