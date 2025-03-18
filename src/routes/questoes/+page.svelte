<script>
	import { enhance } from '$app/forms';
	let { data, form } = $props();
	let file; // Arquivo selecionado
	let questoes = $state(); // Questões extraídas do Excel

	function confirmarExclusao(event) {
		if (!confirm('Tem certeza que deseja excluir esta questão?')) {
			event.preventDefault();
		}
	}
	import * as XLSX from 'xlsx';

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
</script>

<h1>Questões</h1>
<a class="btn btn-primary" href="/questoes/questao/salvar">Nova Questão</a>
{#if form?.message}
	<div class="alert alert-danger mt-3" role="alert">
		{form.message}
	</div>
{/if}
{#if data.questoes && data.questoes.length > 0}
	<ol>
		{#each data.questoes as questao}
			<li>
				{#if questao.editando}
					<form method="post" action="?/editar" use:enhance>
						<input type="hidden" name="id" value={questao.id} />

						<label for="enunciado-{questao.id}">Enunciado:</label>
						<input id="enunciado-{questao.id}" name="enunciado" value={questao.enunciado} />

						<label for="alternativa1-{questao.id}">Alternativas:</label>
						<ul>
							{#each [1, 2, 3, 4, 5] as i}
								<li>
									<label for="alternativa{i}-{questao.id}">Alternativa {String.fromCharCode(64 + i)}:</label>
									<input id="alternativa{i}-{questao.id}" name={`alternativa${i}`} value={questao[`alternativa${i}`]} />
								</li>
							{/each}
						</ul>

						<label for="resposta-{questao.id}">Resposta correta:</label>
						<input id="resposta-{questao.id}" name="resposta" type="number" min="1" max="5" value={questao.resposta} />

						<button type="submit">Salvar</button>
						<button type="button" onclick={() => (questao.editando = false)}>Cancelar</button>
					</form>
				{:else}
					<!-- <p><strong>Categoria:</strong> {questao.categoria}</p> -->
					<p><strong>Enunciado:</strong> {questao.enunciado}</p>
					<ol>
						<li>A: {questao.alternativa1}</li>
						<li>B: {questao.alternativa2}</li>
						<li>C: {questao.alternativa3}</li>
						<li>D: {questao.alternativa4}</li>
						<li>E: {questao.alternativa5}</li>
					</ol>
					<p><strong>Resposta correta:</strong> {questao.resposta}</p>

					<button onclick={() => (questao.editando = true)}>Editar</button>
					<form method="post" action="?/excluir" style="display:inline;" onsubmit={confirmarExclusao}>
						<input type="hidden" name="id" value={questao.id} />
						<button type="submit">Excluir</button>
					</form>
				{/if}
			</li>
		{/each}
	</ol>
{:else}
	<p>Nenhuma questão cadastrada.</p>
{/if}

<h3>Importar Questões</h3>
<input type="file" accept=".xlsx, .csv" onchange={handleFileUpload} class="form-control my-2" />
<button onclick={enviarParaBackend} class="btn btn-success">Importar para o Banco</button>
