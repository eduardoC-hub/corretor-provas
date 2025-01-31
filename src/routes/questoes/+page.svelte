<script>
	import { enhance } from '$app/forms';
	let { data } = $props();

	let form;
</script>

<style>
	.container {
		max-width: 600px;
		margin: auto;
	}
	.card {
		border-radius: 10px;
	}
	.btn-primary {
		background-color: #007bff;
		border-color: #007bff;
	}
	.btn-primary:hover {
		background-color: #0056b3;
		border-color: #004085;
	}
	.alert {
		text-align: center;
	}
</style>

<div class="container mt-4">
	<h1 class="mb-3 text-center">Categorias</h1>

	{#if data.categorias.length}
		<ul class="list-group mb-4">
			{#each data.categorias as categoria}
				<li class="list-group-item">{categoria.nome}</li>
			{/each}
		</ul>
	{:else}
		<p class="text-muted text-center">Nenhuma categoria cadastrada.</p>
	{/if}

	<h1 class="mb-3 text-center">Nova questão</h1>

	<form method="post" action="?/criar" use:enhance class="card p-4 shadow-sm">
		<div class="mb-3">
			<label for="exampleFormControlSelect1" class="form-label">Selecione a Categoria</label>
			<select class="form-select" id="exampleFormControlSelect1" name="categoria" required>
				{#each data.categorias as categoria}
					<option value={categoria.id}>{categoria.nome}</option>
				{/each}
			</select>
		</div>

		<div class="mb-3">
			<label for="exampleFormControlTextarea1" class="form-label">Enunciado da questão:</label>
			<textarea class="form-control" id="exampleFormControlTextarea1" rows="3" name="enunciado" required></textarea>
		</div>

		<div class="mb-3">
			<p>Alternativas:</p>
			<div class="row g-2">
				{#each Array(5) as _, i}
					<div class="col-12">
						<div class="input-group">
							<span class="input-group-text">{i + 1}</span>
							<input type="text" class="form-control" name="alternativa{i + 1}" required />
						</div>
					</div>
				{/each}
			</div>
		</div>

		<div class="mb-3">
			<p>Resposta Correta:</p>
			<input class="form-control w-25" name="resposta" type="number" min="1" max="5" step="1" required />
		</div>

		<button type="submit" class="btn btn-primary w-100">Criar questão</button>
	</form>

	{#if form?.message}
		<div class="alert alert-danger mt-3" role="alert">
			{form.message}
		</div>
	{/if}
</div>
