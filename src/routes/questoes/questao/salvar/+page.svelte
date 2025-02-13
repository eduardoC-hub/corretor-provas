<script>
	let { data, form } = $props();
	let busca = $state('');
	let categorias = $state([]);

	async function buscarcategoria() {
		console.log('oi');
		if (!busca.trim() || categorias.some((c) => c.nome === busca)) return;

		const response = await fetch(`/categorias?categoria=${busca}`);
		const categoria = await response.json();
		if (categoria?.id) {
			categorias.push(categoria);
		} else {
			categorias.push({ nome: busca, id: null });
		}
		busca = '';
	}
</script>

<div class="container mt-4">
	<h1 class="mb-3 text-center">Nova questão</h1>

	<form method="post" action="?/criar" class="card p-4 shadow-sm">
		<div class="mb-3">
			<label for="enunciado" class="form-label">Enunciado da questão:</label>
			<textarea class="form-control" id="enunciado" rows="3" name="enunciado" required value={form?.enunciado ?? ''}></textarea>
		</div>
		<div class="mb-3">
			<p>Alternativas:</p>
			<div class="row g-2">
				{#each Array(5) as _, i}
					<div class="col-12">
						<div class="input-group">
							<span class="input-group-text">{i + 1}</span>
							<input type="text" class="form-control" name="alternativa{i + 1}" value={form?.['alternativa' + (i + 1)] ?? ''} required />
						</div>
					</div>
				{/each}
			</div>
		</div>
		<div class="mb-3">
			<p>Resposta Correta:</p>
			<input class="form-control w-25" name="resposta" type="number" min="1" max="5" step="1" required value={form?.resposta ?? ''} />
		</div>
		<div class="mb-3">
			<label for="categoria" class="form-label">Categoria</label>
			<div class="input-group">
				<input id="categoria" placeholder="Informe uma categoria" class="form-control" bind:value={busca} onkeydown={(e) => e.key == 'Enter' && buscarcategoria() && e.preventDefault()} />
				<button type="button" onclick={buscarcategoria} class="input-group-text btn btn-primary">Adicionar</button>
			</div>
		</div>
		{#if categorias.length > 0}
			<div class="mb-3">
				Categorias Selecionadas (clique em uma para apagá-la)<br />
				{#each categorias as categoria}
					<input type="checkbox" class="btn-check" id={categoria.nome} name="categorias" value={categoria.nome} checked />
					<button type="button" class="btn text-bg-secondary" for={categoria.nome} onclick={() => (categorias = categorias.filter((c) => c.nome != categoria.nome))}>{categoria.nome}</button>
				{/each}
			</div>
		{/if}
		<button type="submit" class="btn btn-primary w-100">Criar questão</button>
	</form>
	<button onclick={() => console.log(form)}>asdf</button>
	{#if form?.message}
		<div class="alert alert-danger mt-3" role="alert">
			{form.message}
		</div>
	{/if}
</div>
