<script>
	import { enhance } from '$app/forms';
	let { data, form } = $props();

	function confirmarExclusao(event) {
    if (!confirm("Tem certeza que deseja excluir esta questão?")) {
      event.preventDefault();
    }
  	}
</script>
<h1>Questoes criadas</h1>
<ol>
  {#each data.questoes as questao}
    <li>
      {#if questao.editando}
        <form method="post" action="?/editar">
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
        Enunciado: {questao.enunciado}
        <ul>
          <li>A: {questao.alternativa1}</li>
          <li>B: {questao.alternativa2}</li>
          <li>C: {questao.alternativa3}</li>
          <li>D: {questao.alternativa4}</li>
          <li>E: {questao.alternativa5}</li>
        </ul>
        <p>Resposta correta: {questao.resposta}</p>

        <button onclick={() => { questao.editando = true; }}>Editar</button>
        <form method="post" action="?/excluir" style="display:inline;" onsubmit={confirmarExclusao}>
          <input type="hidden" name="id" value={questao.id} />
          <button type="submit">Excluir</button>
        </form>
      {/if}
    </li>
  {/each}
</ol>