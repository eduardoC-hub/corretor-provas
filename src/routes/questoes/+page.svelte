<script>
	import { enhance } from '$app/forms';
	import * as XLSX from 'xlsx';

	let { data, form } = $props();
	let file;
	let questoes = $state();
	let questoesescolhidas = $state([]);
	let filtro = $state('');
	let qtdprovas = $state();
	let professor = $state();
	let materia = $state();
	let diaprova = $state();
	let unicur = $state();
	let curso = $state();
	let periodo = $state();


	function confirmarExclusao(event) {
		if (!confirm('Tem certeza que deseja excluir esta questão?')) {
			event.preventDefault();
		}
	}

	function handleFileUpload(event) {
		const selectedFile = event.target.files[0];
		if (!selectedFile) return;

		const reader = new FileReader();
		reader.onload = (e) => {
			const data = new Uint8Array(e.target.result);
			const workbook = XLSX.read(data, { type: 'array' });
			const sheetName = workbook.SheetNames[0];
			const sheet = workbook.Sheets[sheetName];

			questoes = XLSX.utils.sheet_to_json(sheet);
		};

		reader.readAsArrayBuffer(selectedFile);
	}

	async function enviarParaBackend() {
		if (questoes.length === 0) {
			alert('Nenhuma questão para importar!');
			return;
		}

		const response = await fetch('/importar-questoes', {
			method: 'POST',
			body: JSON.stringify({ questoes }),
			headers: { 'Content-Type': 'application/json' }
		});

		const result = await response.json();
		if (result.success) {
			alert('Questões importadas com sucesso!');
		} else {
			alert('Erro ao importar questões: ' + result.message);
		}
	}

	function toggleQuestaoSelecionada(id) {
		if (questoesescolhidas.includes(id)) {
			questoesescolhidas = questoesescolhidas.filter((q) => q !== id);
		} else {
			questoesescolhidas = [...questoesescolhidas, id];
		}
	}

	function gerarprovas(){
		for (let i = 0; i < qtdprovas; i++){
			shuffle(questoesescolhidas)
		}
	}

	function shuffle(array) {
  let currentIndex = array.length;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {

    // Pick a remaining element...
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
}
</script>
<center>



</center>
<h1>Questões</h1>
<a class="btn btn-primary" href="/questoes/questao/salvar">Nova Questão</a>

<input type="text" placeholder="Pesquisar pelo enunciado..." bind:value={filtro} class="form-control my-3" />

{#if form?.message}
	<div class="alert alert-danger mt-3" role="alert">
		{form.message}
	</div>
{/if}

{#if data.questoes && data.questoes.length > 0}
	<ol class="questoes-lista">
		{#each data.questoes.filter((q) => q.enunciado.toLowerCase().includes(filtro.toLowerCase())) as questao}
			<li class="questao-item">
				<p><strong>Enunciado:</strong> {questao.enunciado}</p>
				<ol>
					<li>A: {questao.alternativa1}</li>
					<li>B: {questao.alternativa2}</li>
					<li>C: {questao.alternativa3}</li>
					<li>D: {questao.alternativa4}</li>
					<li>E: {questao.alternativa5}</li>
				</ol>
				<p><strong>Resposta correta:</strong> {questao.resposta}</p>

				<label>
					<input type="checkbox" value={questao} bind:group={questoesescolhidas} />
					Selecionar
				</label>

				<div class="botoes-acoes">
					<form method="post" action="?/editar">
						<input type="hidden" name="id" value={questao.id} />
						<button type="submit" class="btn-editar">Editar</button>
					</form>
					<form method="post" action="?/excluir" onsubmit={confirmarExclusao}>
						<input type="hidden" name="id" value={questao.id} />
						<button type="submit" class="btn-excluir">Excluir</button>
					</form>
				</div>
			</li>
		{/each}
	</ol>
{:else}
	<p class="sem-questoes">Nenhuma questão cadastrada.</p>
{/if}

<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modal">Criação de provas</button>

<div class="modal fade" id="modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Criação de provas</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
		<form method="post" action="/provas?/gerarprova" class="form-gerar-prova">
			<input type="hidden" name="questoesescolhidas" value={JSON.stringify(questoesescolhidas)}>
			<input type="text" name="professor" placeholder="Professor(a)" value={JSON.stringify(professor)}/>
			<input type="text" name="unicur" placeholder="Unidade Curricular" value={JSON.stringify(unicur)}/>
			<input type="text" name="curso" placeholder="Curso" value={JSON.stringify(curso)}/>
			Período:
			<select name="periodo" bind:value={periodo}>
				<option value="Matutino">Matutino</option>
				<option value="Vespertino">Vespertino</option>
				<option value="Noturno">Noturno</option>
			</select>
			<input type="date" name="diaprova" placeholder="Data" value={JSON.stringify(diaprova)}/>
			<input type="number" name="qtdprovas" placeholder="Quantidade de provas" min="0" value={JSON.stringify(qtdprovas)}/>
			<button class="btn btn-primary">Gerar Prova</button>
		</form>
      </div>
    </div>
  </div>
</div>

<h3>Importar Questões</h3>
<input type="file" accept=".xlsx, .csv" onchange={handleFileUpload} class="form-control my-2" />
<button onclick={enviarParaBackend} class="btn btn-success">Importar para o Banco</button>

<style>
	:global(body) {
		font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
		background-color: #f4f6f8;
		color: #333;
		padding: 20px;
	}

	h1 {
		color: #2d3748;
		margin-bottom: 20px;
	}

	h3 {
		margin-top: 40px;
		color: #2c5282;
	}

	a.btn {
		margin-bottom: 20px;
		display: inline-block;
		background-color: #2b6cb0;
		color: #fff;
		padding: 10px 20px;
		border-radius: 5px;
		text-decoration: none;
	}

	a.btn:hover {
		background-color: #2c5282;
	}

	.form-control {
		padding: 10px;
		border-radius: 5px;
		border: 1px solid #ccc;
	}

	.questoes-lista {
		list-style: none;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 20px;
	}

	.questao-item {
		background-color: #fff;
		padding: 20px;
		border-radius: 8px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
		border-left: 5px solid #3182ce;
	}

	
		.questao-item p {
	margin: 5px 0;
	text-align: justify;


	}

	.questao-item ol {
		margin-left: 20px;
		margin-top: 10px;
	}

	.botoes-acoes {
		display: flex;
		gap: 10px;
		margin-top: 15px;
	}

	.btn-editar,
	.btn-excluir {
		padding: 6px 14px;
		border: none;
		border-radius: 4px;
		color: #fff;
		cursor: pointer;
		font-size: 0.9em;
	}

	.btn-editar {
		background-color: #38a169;
	}

	.btn-excluir {
		background-color: #e53e3e;
	}

	.btn-editar:hover {
		background-color: #2f855a;
	}

	.btn-excluir:hover {
		background-color: #c53030;
	}

	form button {
		margin-top: 10px;
	}

	.sem-questoes {
		color: #718096;
		font-style: italic;
	}

	input[type="text"],
	input[type="number"] {
		width: 100%;
		max-width: 400px;
		margin-bottom: 20px;
	}

	.form-gerar-prova {
		background-color: #fff;
		padding: 20px;
		border-radius: 8px;
		margin-top: 30px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
		display: flex;
		flex-direction: column;
		gap: 15px;
		max-width: 400px;
	}

	.btn.btn-success,
	button[type="submit"],
	button[onclick] {
		background-color: #38a169;
		border: none;
		color: white;
		padding: 10px 20px;
		border-radius: 5px;
		cursor: pointer;
		width: fit-content;
	}

	.btn.btn-success:hover,
	button[type="submit"]:hover,
	button[onclick]:hover {
		background-color: #2f855a;
	}

	input[type="file"] {
		margin-bottom: 10px;
	}

	label {
		display: inline-flex;
		align-items: center;
		gap: 5px;
		margin-top: 10px;
	}

	.alert {
		padding: 15px;
		border-radius: 6px;
		background-color: #fed7d7;
		color: #9b2c2c;
		max-width: 400px;
	}
</style>
