<script>
	import { enhance } from '$app/forms';

	let { form } = $props();
</script>

<h1>Nova categoria</h1>
<form method="post" action="?/criar" use:enhance>
	<label>
		Nome da categoria:
		<input name="nome" />
	</label>
	<button>Criar</button>
</form>
<p style="color: red">{form?.message ?? ''}</p>
