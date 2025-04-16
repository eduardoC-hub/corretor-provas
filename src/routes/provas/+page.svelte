<script>
	let { form } = $props();

	let questoesescolhidas = $state([]);
	let qtdprovas = $state(0);

	function gerarPDF() {
		window.print();
	}
</script>



<button onclick={gerarPDF} class="botao-pdf no-print">🖨️ Gerar PDF</button>


{#if form}
	<h2> Provas Geradas: <b>{form.qtdprovas}</b></h2>
	{#each form.provas as prova, i}
		<div class="prova" style="page-break-before: always;">
			<div class="cabecalho-box">
				<table class="cabecalho-tabela">
					<tbody>
						<tr>
							<td><strong>Aluno:</strong></td>
                            <td><strong>Matéria:</strong></td>
							<td><strong>Data:</strong></td>
						</tr>
						<tr>
							<td><strong>Professor(a):</strong></td>
							<td><strong>Série:</strong></td>
							<td><strong>Nota:</strong></td>
						</tr>
						<tr>

						</tr>
					</tbody>
				</table>
			</div>

			<h4>Gabarito</h4>
			<table class="gabarito">
				<thead>
					<tr>
						<th>Nº</th>
						<th>A</th>
						<th>B</th>
						<th>C</th>
						<th>D</th>
						<th>E</th>
					</tr>
				</thead>
				<tbody>
					{#each prova as questao, i}
						<tr>
							<td>{i + 1}</td>
							<td><span class="bolinha"></span></td>
							<td><span class="bolinha"></span></td>
							<td><span class="bolinha"></span></td>
							<td><span class="bolinha"></span></td>
							<td><span class="bolinha"></span></td>
						</tr>
					{/each}
				</tbody>
			</table>

			{#each prova as questao, i}
				<p><strong>Questão {i + 1} </strong></p>
				<p>{questao.enunciado}</p>
				<ol type="A">
					{#each questao.alternativas as alternativa}
						<li>{alternativa}</li>
					{/each}
				</ol>
			{/each}
			<br />
		</div>
	{/each}
{/if}

{#if form.qtdprovas === 0}
	<p>Nenhuma prova gerada ainda.</p>
{/if}

<style>
	.botao-pdf {
		background-color: #7d9bee;
		color: white;
		padding: 10px 20px;
		font-size: 16px;
		border: none;
		border-radius: 5px;
		cursor: pointer;
		margin-bottom: 20px;
	}

	.botao-pdf:hover {
		background-color: #96d4ec;
	}

	.prova {
		margin-bottom: 40px;
		padding: 20px;
		border: 1px solid #ccc;
		border-radius: 10px;
		page-break-after: always;
	}

	.cabecalho-box {
		border: 2px solid #333;
		border-radius: 8px;
		padding: 15px;
		margin-bottom: 20px;
	}

	.cabecalho-tabela {
		width: 100%;
		border-collapse: collapse;
		font-size: 14px;
	}

	.cabecalho-tabela td {
		padding: 6px;
		border: 1px solid #999;
	}

	.gabarito {
		width: auto;
		border-collapse: collapse;
		font-size: 12px;
		margin-bottom: 20px;
	}

	.gabarito th, .gabarito td {
		padding: 4px;
		text-align: center;
		border: 1px solid #000;
	}

	.bolinha {
		display: inline-block;
		width: 12px;
		height: 12px;
		border: 1px solid black;
		border-radius: 50%;
	}

	ol {
		padding-left: 20px;
	}
	@media print {
	.no-print {
		display: none !important;
	}
}
</style>
