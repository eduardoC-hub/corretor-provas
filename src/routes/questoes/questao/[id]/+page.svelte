<script>
	export let data;
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';

	let { questao, categorias } = data;

	function confirmarExclusao(event) {
		if (!confirm('Tem certeza que deseja excluir esta questão?')) {
			event.preventDefault();
		}
	}
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
		<!-- Botão de Excluir -->
		<!-- Formulário de exclusão -->
		<form method="post" action="?/excluir" style="display:inline;" onsubmit={confirmarExclusao}>
			<input type="hidden" name="id" value={questao.id} />
			<button type="submit" class="btn btn-danger mt-3" style="width:100%">Excluir Questão</button>
			<a href="/questoes/questao/salvar" class="btn btn-info mt-3 " style="width:100%;" >deseja criar nova questão?</a>


	</div>
</div>
