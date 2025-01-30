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
      event.preventDefault(); // Impede o envio do formulário se o usuário cancelar
    }
  }
</script>

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
            <button type="submit">Salvar</button>
            <button type="button" onclick={() => (categoria.editando = false)}>Cancelar</button>
          </form>
        {:else}
          {categoria.nome}
          <button onclick={() => (categoria.editando = true)}>Editar</button>
          <form method="post" action="?/excluir" style="display:inline;" onsubmit={confirmarExclusao}>
            <input type="hidden" name="id" value={categoria.id} />
            <button type="submit">Excluir</button>
          </form>
        {/if}
      </li>
    {/each}
  </ul>
{:else}
  <p>Nenhuma categoria cadastrada.</p>
{/if}