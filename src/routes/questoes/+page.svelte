<script>
	import { enhance } from '$app/forms';
	import * as XLSX from 'xlsx';

	let { data, form } = $props();
	let file;
	let questoes = $state();
	let questoes_escolhidas = $state([]);
	let filtro = $state('');

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
			console.log('Questões carregadas:', questoes);
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
		if (questoes_escolhidas.includes(id)) {
			questoes_escolhidas = questoes_escolhidas.filter((q) => q !== id);
		} else {
			questoes_escolhidas = [...questoes_escolhidas, id];
		}
	}
</script>

<h1>Questões</h1>
<a class="btn btn-primary" href="/questoes/questao/salvar">Nova Questão</a>

<input type="text" placeholder="Pesquisar pelo enunciado..." bind:value={filtro} class="form-control my-3" />

{#if form?.message}
	<div class="alert alert-danger mt-3" role="alert">
		{form.message}
	</div>
{/if}

{#if data.questoes && data.questoes.length > 0}
	<ol>
		{#each data.questoes.filter((q) => q.enunciado.toLowerCase().includes(filtro.toLowerCase())) as questao}
			<li>
				<p><strong>Enunciado:</strong> {questao.enunciado}</p>
				<ol>
					<li>A: {questao.alternativa1}</li>
					<li>B: {questao.alternativa2}</li>
					<li>C: {questao.alternativa3}</li>
					<li>D: {questao.alternativa4}</li>
					<li>E: {questao.alternativa5}</li>
				</ol>
				<p><strong>Resposta correta:</strong> {questao.resposta}</p>

				<input type="checkbox" checked={questoes_escolhidas.includes(questao.id)} onchange={() => toggleQuestaoSelecionada(questao.id)} />
				<br />

				<form method="post" action="?/editar" style="display:inline;">
					<input type="hidden" name="id" value={questao.id} />
					<button type="submit">Editar</button>
				</form>
				<form method="post" action="?/excluir" style="display:inline;" onsubmit={confirmarExclusao}>
					<input type="hidden" name="id" value={questao.id} />
					<button type="submit">Excluir</button>
				</form>
			</li>
		{/each}
	</ol>
{:else}
	<p>Nenhuma questão cadastrada.</p>
{/if}

<h3>Importar Questões</h3>
<input type="file" accept=".xlsx, .csv" onchange={handleFileUpload} class="form-control my-2" />
<button onclick={enviarParaBackend} class="btn btn-success">Importar para o Banco</button>
