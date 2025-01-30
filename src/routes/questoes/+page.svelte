<script>
	import { enhance } from '$app/forms';
	let { data } = $props();

	let form; // Agora o form será atualizado corretamente
</script>
<h1>Categorias</h1>

{#if data.categorias.length}
<ol>
	{#each data.categorias as categoria}
		<li>
				{categoria.nome}
		</li>
	{/each}
</ol>
{:else}
<p>Nenhuma categoria cadastrada.</p>
{/if}

<h1>Nova questão</h1>

<div class="form-group">
	<label for="exampleFormControlSelect1">Selecione a Categoria</label>
	<select class="form-control" id="exampleFormControlSelect1">
	  {#each data.categorias as categoria}
		<option value={categoria.id}>{categoria.nome}</option>
	  {/each}
	</select>
  </div>

<form method="post" action="?/criar" use:enhance>
	<div class="form-group">
		<label for="exampleFormControlTextarea1">Enunciado da questão:</label>
		<textarea class="form-control" id="exampleFormControlTextarea1" rows="3" name="enunciado" required></textarea>
	  </div>
	<br>

	<label>
		Alternativas:
		<br>
		1 <input name="alternativa1" required />
		<br>
		2 <input name="alternativa2" required />
		<br>
		3 <input name="alternativa3" required />
		<br>
		4 <input name="alternativa4" required />
		<br>
		5 <input name="alternativa5" required />
	</label>
	<br>

	<label>
		Resposta:
		<input name="resposta" type="number" min="1" max="5" step="1" required />
	</label>
	<br>

	<button type="submit">Criar questão</button>
</form>

<!-- Exibir mensagem de erro, caso exista -->
{#if form?.message}
	<p style="color: red">{form.message}</p>
{/if}
