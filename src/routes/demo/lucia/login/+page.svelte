<script>
	import { enhance } from '$app/forms';
	let { form } = $props();
</script>

<h1 class="titulo" style="margin-top: 30px;">Login / Registro</h1>

<form method="post" action="?/login" use:enhance class="formulario">
	<label class="campo">
		<span class="rotulo">Usuário</span>
		<input name="username" class="entrada" required />
	</label>

	<label class="campo">
		<span class="rotulo">Senha</span>
		<input type="password" name="password" class="entrada" required />
	</label>

	<div class="botoes">
		<button class="botao login">Entrar</button>
		<button class="botao registrar" formaction="?/register">Registrar</button>
	</div>

	{#if form?.message}
		<p class="mensagem-erro">{form.message}</p>
	{/if}
</form>

<style>
	.titulo {
		text-align: center;
		font-size: 2rem;
		margin-bottom: 1.5rem;
		color: #333;
	}

	.formulario {
		max-width: 400px;
		margin: 0 auto;
		padding: 2rem;
		border: 1px solid #ccc;
		border-radius: 10px;
		box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
		background-color: #fff;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.campo {
		display: flex;
		flex-direction: column;
	}

	.rotulo {
		font-weight: bold;
		margin-bottom: 0.4rem;
		color: #444;
	}

	.entrada {
		padding: 0.6rem;
		font-size: 1rem;
		border: 1px solid #ccc;
		border-radius: 5px;
		transition: border-color 0.2s ease-in-out;
	}

	.entrada:focus {
		border-color: #007BFF;
		outline: none;
	}

	.botoes {
		display: flex;
		justify-content: space-between;
		gap: 1rem;
		margin-top: 1rem;
	}

	.botao {
		flex: 1;
		padding: 0.7rem;
		font-size: 1rem;
		border: none;
		border-radius: 5px;
		cursor: pointer;
		color: white;
		transition: background-color 0.3s ease;
	}

	.login {
		background-color: #007BFF;
	}

	.login:hover {
		background-color: #0056b3;
	}

	.registrar {
		background-color: #28a745;
	}

	.registrar:hover {
		background-color: #1e7e34;
	}

	.mensagem-erro {
		color: red;
		text-align: center;
		margin-top: 1rem;
		font-weight: bold;
	}
</style>
