<script>
	import { enhance } from '$app/forms';

	export let form; // Agora o form será atualizado corretamente
</script>

<h1>Nova questão</h1>

<form method="post" action="?/criar" use:enhance>
	<label>
		Enunciado da questão:
		<input name="enunciado" required />
	</label>
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
