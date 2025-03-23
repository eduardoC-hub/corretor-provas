<script>
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';

	export let data;
	let { questao, categorias } = data;

	// Função para lidar com o sucesso do envio
	function afterSubmit({ result }) {
		if (result?.type === "redirect") {
			goto(result.location); // Redireciona corretamente
		}
	}
</script>

<div class="container mt-4">
	<h1 class="mb-3 text-center">Detalhes da Questão</h1>

	<div class="card p-4 shadow-sm">
		<form method="post" action="?/salvar" use:enhance={afterSubmit}>
			<input type="hidden" name="id" value="{questao.id}" />

			<h5>Enunciado:</h5>
			<input type="text" name="enunciado" bind:value={questao.enunciado} class="form-control" required />

			<h5>Alternativas:</h5>
			<input type="text" name="alternativa1" bind:value={questao.alternativa1} class="form-control" required />
			<input type="text" name="alternativa2" bind:value={questao.alternativa2} class="form-control" required />
			<input type="text" name="alternativa3" bind:value={questao.alternativa3} class="form-control" required />
			<input type="text" name="alternativa4" bind:value={questao.alternativa4} class="form-control" required />
			<input type="text" name="alternativa5" bind:value={questao.alternativa5} class="form-control" required />

			<h5>Resposta Correta:</h5>
			Alternativa <input type="number" name="resposta" min="1" max="5" bind:value={questao.resposta} class="form-control" required />

			<h5>Categorias:</h5>
			<ul>
				{#each categorias as { nome }}
					<li>{nome}</li>
				{/each}
			</ul>

			<button type="submit" class="btn btn-success mt-3" style="width:100%">Salvar</button>
		</form>
	</div>
</div>