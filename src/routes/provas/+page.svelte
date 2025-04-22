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
	{#each form.provas as prova, i}
		<!-- Página de Gabarito - Sempre é inserida antes de cada prova -->
		<div class="pagina-gabarito">
			<div class="topo-gabarito">
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
						</tbody>
					</table>
				</div>

				<div class="gabarito-livre caixa-gabarito">
					{#each form.provas[0] as questao, i}
						<div class="linha-gabarito">
							<span class="numero">{i + 1}.</span>
							<span class="letra">A</span><span class="bolinha"></span>
							<span class="letra">B</span><span class="bolinha"></span>
							<span class="letra">C</span><span class="bolinha"></span>
							<span class="letra">D</span><span class="bolinha"></span>
							<span class="letra">E</span><span class="bolinha"></span>
						</div>
					{/each}
				</div>
			</div>

			<div class="qr-area">
				<div class="qr-box-final">
					<span class="qr-text">QR CODE</span>
				</div>
			</div>
		</div>

		<!-- Seção de Questões -->
		<div class="prova {i !== form.provas.length - 1 ? 'com-quebra' : ''}">
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
					</tbody>
				</table>
			</div>

			<div class="questoes">
				{#each prova as questao, i}
					<div class="coluna">
						<p><strong>Questão {i + 1}</strong></p>
						<p>{questao.enunciado}</p>
						<ol type="A">
							{#each questao.alternativas as alternativa}
								<li>{alternativa}</li>
							{/each}
						</ol>
					</div>
				{/each}
			</div>
		</div>
	{/each}
{/if}

{#if form.qtdprovas === 0}
	<p>Nenhuma prova gerada ainda.</p>
{/if}

<style>
	@page {
		margin: 1cm;
	}

	@media print {
		.no-print {
			display: none !important;
		}

		.com-quebra {
			page-break-after: always;
		}
	}

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

	.gabarito-livre {
		display: flex;
		flex-direction: column;
		gap: 12px;
		margin-top: 20px;
		font-size: 14px;
	}

	.caixa-gabarito {
		border: 2px solid #333;
		border-radius: 10px;
		padding: 15px;
	}

	.linha-gabarito {
		display: flex;
		align-items: center;
		gap: 10px;
		flex-wrap: wrap;
	}

	.numero {
		width: 30px;
		text-align: right;
		font-weight: bold;
	}

	.letra {
		font-weight: bold;
		margin-right: 4px;
		max-width: 100%; /* Impede que as letras ultrapassem o limite central */
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.bolinha {
		display: inline-block;
		width: 14px;
		height: 14px;
		border: 1.5px solid black;
		border-radius: 50%;
		vertical-align: middle;
	}

	.pagina-gabarito {
		page-break-after: always;
		padding: 20px;
		border: 2px dashed #888;
		border-radius: 10px;
		margin-bottom: 40px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		height: 1000px;
	}

	.qr-area {
		flex: 1;
		display: flex;
		justify-content: center;
		align-items: flex-end;
		padding-bottom: 40px;
	}

	.qr-box-final {
		width: 280px;
		height: 280px;
		border: 3px solid #000;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 16px;
		font-weight: bold;
		opacity: 0.6;
	}

	.qr-text {
		text-align: center;
	}

	.prova {
		margin-bottom: 40px;
		padding: 20px;
		border: 2px dashed #666;
		border-radius: 10px;
		page-break-after: always;
		break-inside: avoid;
	}

	.questoes {
		column-count: 2;
		column-gap: 20px;
	}

	.coluna {
		display: block;
		margin-bottom: 20px;
	}

	.questoes {
		column-rule: 0.5px solid #888;
	}

	ol {
		padding-left: 20px;
	}

	:global(body) {
		font-family: Arial, sans-serif;
		font-size: 12pt;
		line-height: 1.4;
	}
</style>
