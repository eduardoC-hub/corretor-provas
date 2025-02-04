<script>
	let { data, form } = $props();

	let busca = $state('');
	let filtrados = $state(data.categorias.slice());

	function pesquisar() {
		if (busca.trim() === '') {
			filtrados = data.categorias.slice();
			return;
		} else {
			filtrados = [];
			for (const categoria of data.categorias) {
				if (categoria.nome.toLowerCase().includes(busca.toLowerCase())) {
					filtrados.push(categoria);
				}
			}
		}
	}
	function confirmarExclusao(event) {
    if (!confirm("Tem certeza que deseja excluir esta categoria?")) {
      event.preventDefault(); 
    }
  }
</script>

<style>
	.container {
		max-width: 600px;
		margin: auto;
		background: white;
		padding: 20px;
		border-radius: 10px;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
	}
	input, button {
		padding: 10px;
		margin: 5px 0;
		border-radius: 5px;
		border: 1px solid #ccc;
		width: 100%;
	}
	button {
		background-color: #007bff;
		color: white;
		border: none;
		cursor: pointer;
	}
	button:hover {
		background-color: #0056b3;
	}
	ul {
		list-style-type: none;
		padding: 0;
	}
	li {
		background: #e9ecef;
		padding: 10px;
		border-radius: 5px;
		margin-bottom: 5px;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	p {
		text-align: center;
		color: #6c757d;
	}
	.small-button {
		padding: 5px 10px; 
		font-size: 14px; 
		width: auto; 
		cursor: pointer;
	}
	
	.botoes-acoes {
		display: flex;
		gap: 5px; 
	}
</style>

<div class="container">
	<h1>Categorias</h1>
	<div>
		<input placeholder="Pesquisar" bind:value={busca} oninput={pesquisar} />
	</div>
	<br />
	<div>
		<form method="post" action="?/criar">
			<input name="nome" placeholder="Nova categoria" />
			<button>Criar</button>
		</form>
	</div>
	<p style="color: red">{form?.message ?? ''}</p>
	<br />
	{#if filtrados.length}
	  <ul>
	    {#each filtrados as categoria}
	      <li>
	        {#if categoria.editando}
	          <form method="post" action="?/editar">
	            <input type="hidden" name="id" value={categoria.id} />
	            <input name="nome" value={categoria.nome} />
	            <button type="submit" class="small-button">Salvar</button>
	            <button type="button" class="small-button" onclick={() => (categoria.editando = false)}>Cancelar</button>
	          </form>
	        {:else}
	          {categoria.nome}
	          <div class="botoes-acoes">
	            <button class="small-button" onclick={() => (categoria.editando = true)}>Editar</button>
	            <form method="post" action="?/excluir" style="display:inline;" onsubmit={confirmarExclusao}>
	              <input type="hidden" name="id" value={categoria.id} />
	              <button type="submit" class="small-button">Excluir</button>
	            </form>
	          </div>
	        {/if}
	      </li>
	    {/each}
	  </ul>
	{:else}
	  <p>Nenhuma categoria cadastrada.</p>
	{/if}
</div>