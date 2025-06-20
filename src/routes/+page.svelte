<script>
	const estudantes = [
		{
			nome: 'Arthur',
			foto: '',
			descricao: 'Especialista em backend, segurança e organização do banco de dados.'
		},
		{
			nome: 'Eduardo',
			foto: '',
			descricao: 'Focado em UX/UI, garantindo uma experiência intuitiva para os usuários.'
		},
		{
			nome: 'Reinaldo',
			foto: '',
			descricao: 'Responsável pela integração entre sistemas e lógica das avaliações.'
		}
	];
</script>



<div class="pagina-tcc">
	<!-- Cabeçalho do Projeto -->
	<section class="cabecalho text-white text-center py-5">
		<div class="d-flex justify-content-center align-items-center gap-3">
		  <img src="logo.png" alt="Imagem do projeto" style="height: 80px;" />
		  <h1 class="display-3 fw-bold mb-0">Notágil</h1>
		</div>
		<p class="lead mt-3">Um sistema inteligente para gerenciamento de provas</p>
		<span class="badge bg-light text-dark fs-6 px-3 py-2 mt-3">TCC IFMS - 2025</span>
	  </section>
	  
	<!-- Sobre o Projeto -->
	<section class="container my-5">
		<div class="row align-items-center g-5">
			<div class="col-md-6">
				<img src="logonot.png" alt="Imagem do projeto" class="img-fluid rounded " />
			</div>
			<div class="col-md-6">
				<h2 class="text-gradient mb-3">O que é o Notágil?</h2>
				<p class="fs-5 text-muted">
					Notágil é um sistema digital que visa modernizar o processo de aplicação e correção de provas, permitindo que professores criem avaliações, gabaritos e gerem PDFs com QR codes para autenticação. Rápido, organizado e intuitivo.
				</p>
			</div>
		</div>
	</section>

	<!-- Equipe -->
	<section class="bg-light py-5">
		<div class="container text-center">
			<h2 class="mb-4 text-gradient">Quem está por trás?</h2>
			<div class="row justify-content-center g-4">
				{#each estudantes as e}
					<div class="col-md-4">
						<div class="card h-100 border-0 shadow-sm equipe-card">
							<img src={e.foto} alt={"Foto de " + e.nome} class="card-img-top equipe-foto" />
							<div class="card-body">
								<h5 class="card-title">{e.nome}</h5>
								<p class="card-text text-muted">{e.descricao}</p>
							</div>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- Rodapé -->
	<footer class="text-center text-white py-4" style="background: #0000fb;">
		<p class="mb-0">© 2025 Notágil — Arthur, Eduardo e Reinaldo</p>
	</footer>
</div>

<style>
	/* Gradiente de cor no texto */
	.text-gradient {
		background: linear-gradient(90deg, #0051ff, rgb(0, 54, 247));
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}

	.cabecalho {
		background: linear-gradient(to right, #007bff, #0000fb);
	}

	.equipe-card:hover {
		transform: scale(1.03);
		transition: transform 0.3s ease;
	}

	.equipe-foto {
		object-fit: cover;
		height: 300px;
		border-top-left-radius: 0.5rem;
		border-top-right-radius: 0.5rem;
	}

	@media (max-width: 767px) {
		.equipe-foto {
			height: 200px;
		}
	}
</style>
