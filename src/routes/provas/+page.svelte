<script>
	let { form } = $props();

	let questoesescolhidas = $state([]);
	let qtdprovas = $state(0);
</script>

{#if form}
	<h2><b>{form.qtdprovas}</b> Provas Geradas:</h2>
	{#each form.provas as prova, i}
		<div class="prova"  style="page-break-before: always;">
			<h3>Prova {i + 1}</h3>
			<h4>Gabarito</h4>
			<table>
				{#each prova as questao, i}
				<tr>
					<td>{i + 1}</td>
				<td>A</td>
				<td>B</td>
				<td>C</td>
				<td>D</td>
				<td>E</td>
				</tr>
				{/each}
			</table>
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

<style>
	th, td {
  border: 1px solid black;
  border-radius: 10px;
}
</style>