<script>
    import { page } from '$app/stores';
  </script>
  
  <nav class="navbar no-print">
    <div class="logo">Notágil</div>
    <div class="links">
      <a href="/" class:active={$page.url.pathname === '/'}>Início</a>
      <a href="/categorias" class:active={$page.url.pathname.startsWith('/categorias')}>Categorias</a>
      <a href="/provas?/gerarprova" class:active={$page.url.pathname.startsWith('/provas?/gerarprova')}>Provas</a>
      <a href="/questoes" class:active={$page.url.pathname.startsWith('/questoes')}>Questões</a>
      <a href="/demo/lucia" class:active={$page.url.pathname.startsWith('/demo/lucia')}>Login</a>
    </div>
  </nav>
  
  <style>
   @media print {
  .no-print {
    display: none !important;
  }

   } 
    .navbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #1a202c;
      padding: 1rem 2rem;
      color: white;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      width: 100%;
    }
  
    .logo {
      font-size: 1.5rem;
      font-weight: bold;
      background: linear-gradient(90deg, #8998ed, rgb(86, 116, 216));
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
    }
  
    .links {
      display: flex;
      gap: 1.5rem;
    }
  
    a {
      color: #e2e8f0;
      text-decoration: none;
      font-weight: 500;
      transition: color 0.2s;
    }
  
    a:hover {
      color: #38bdf8;
    }
  
    .active {
      color: #38bdf8;
      border-bottom: 2px solid #38bdf8;
      padding-bottom: 2px;
    }
  </style>