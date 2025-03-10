<script>
	export let data;
	let { questao, categorias } = data;
</script>

<div class="container mt-4">
	<h1 class="mb-3 text-center">Detalhes da Questão</h1>

	<div class="card p-4 shadow-sm">
		<h5>Enunciado:</h5>
		<p>{questao.enunciado}</p>

		<h5>Alternativas:</h5>
		<ul>
			<li>{questao.alternativa1}</li>
			<li>{questao.alternativa2}</li>
			<li>{questao.alternativa3}</li>
			<li>{questao.alternativa4}</li>
			<li>{questao.alternativa5}</li>
		</ul>

		<h5>Resposta Correta:</h5>
		<p>Alternativa {questao.resposta}</p>

		<h5>Categorias:</h5>
		<ul>
			{#each categorias as { nome }}
				<li>{nome}</li>
			{/each}
		</ul>

		<!-- Botão de Editar -->
		<a href="/questoes/questao/{questao.id}/editar" class="btn btn-warning mt-3">Editar Questão</a>
	</div>
</div>