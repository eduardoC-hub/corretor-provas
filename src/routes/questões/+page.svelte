<script>
	import { enhance } from '$app/forms';

	let { form } = $props();
</script>

<h1>Nova questão</h1>
<form method="post" action="?/criar" use:enhance>
	<label>
		Enunciado da questão:
		<input name="enunciado" />
	</label>
	<br>
	<label>
		Alternativas:
		<br>
		1 <input name="alternativa1" />
		<br>
		2 <input name="alternativa2" />
		<br>
		3 <input name="alternativa3" />
		<br>
		4 <input name="alternativa4" />
		<br>
		5 <input name="alternativa5" />
	</label>
	<br>
	<label>
		Resposta:
		<input name="resposta" type="number" min="1" max="5" step="1" />
	</label>
	<button>Criar questão.</button>
</form>
<p style="color: red">{form?.message ?? ''}</p>
