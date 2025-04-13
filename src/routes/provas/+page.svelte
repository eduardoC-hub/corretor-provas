<script>
	let { form } = $props();

	let questoesescolhidas = $state([]);
	let qtdprovas = $state(0);
</script>

{#if form}
	<h2><b>{form.qtdprovas}</b> Provas Geradas:</h2>
	{#each form.provas as prova, i}
		<div class="prova">
			<h3>Prova {i + 1}</h3>
			{#each prova as questao, i}
				<p>Questao {i + 1}</p>
				<p><strong>Enunciado:</strong> {questao.enunciado}</p>
				<ol type="A">
					{#each questao.alternativas as alternativa, j}
						<li>{alternativa}</li>
					{/each}
				</ol>
			{/each}
			<br />
		</div>
	{/each}
{/if}

{#if form.qtdprovas === 0}
	<p>Nenhuma prova gerada ainda.</p>
{/if}