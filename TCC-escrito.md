# Introdução
Neste trabalho de conclusão de curso (TCC), foi desenvolvido um site com banco de questões, destinado a armazenar e gerenciar questões de múltiplas disciplinas para aplicação em simulados, provas e treinamentos. O sistema será uma aplicação full-stack, construída com a framework SvelteKit no frontend e Node.js no backend, utilizando o SQLITE, um banco de dados relacional para armazenar as questões, categorizá-las e permitir operações de CRUD (criar, ler, atualizar e excluir).

# objetivo do Projeto
O objetivo do projeto é criar um sistema onde os administradores podem cadastrar, editar e excluir questões de diferentes categorias, enquanto os usuários, os professores, poderem acessar essas questões para aplica-las em simulados ou em aplicações de provas para seus alunos. Além disso, o sistema permitirá o gerenciamento de categorias de questões e o relacionamento entre as questões, de forma que os usuários possam realizar consultas e pesquisas eficientes.

# frontend:
O frontend será desenvolvido utilizando SvelteKit, uma framework altamente eficiente para criar aplicações reativas e com ótimo desempenho. O SvelteKit permitirá a criação de páginas dinâmicas, formulários de cadastro de questões, exibição de listas de questões por categoria e a realização de buscas personalizadas. Além disso, o SvelteKit facilitará a criação de rotas para o backend, permitindo a comunicação fluida com o banco de dados.

# backend e node js -> package.json:
 O backend será implementado com Node.js, um ambiente que permite rodar JavaScript no servidor. Um arquivo essencial nesse processo é o package.json, que contém as dependências e configurações do projeto. Esse arquivo já vem pronto na maioria dos casos, facilitando a instalação de pacotes e a replicação do ambiente de desenvolvimento. O Node.js fornecerá a estrutura necessária para a construção das APIs que vão permitir a interação com o banco de dados. Para gerenciar as operações de banco de dados de forma mais eficiente, utilizaremos o Drizzle ORM, uma ferramenta que simplifica a manipulação de bancos de dados relacionais, tornando mais fácil a execução das operações de CRUD e a execução de transações. As APIs serão responsáveis por gerenciar o ciclo de vida das questões, permitindo que o frontend se comunique com o banco de dados para realizar essas operações de forma eficiente.

# bancos de dados -> crud, transações em bancos de dados
Utilizamos o SQLite como banco de dados relacional, garantindo organização e segurança dos dados. Implementamos operações de CRUD (Criar, Ler, Atualizar e Excluir) sendo utilizadas essas operações para:
*Criar: Cadastrar novas questões no banco de dados;
*Ler: Exibir uma lista de questões, com filtros por categoria e tipo de questão;
*Atualizar: Editar questões existentes;
*Excluir: Deletar questões que não são mais necessárias. para gerenciar os registros/questões de forma eficiente. 
Também utilizamos transações para garantir que processos importantes sejam concluídos corretamente, evitando erros nos dados.

# ( ver se vai precisar ON DELETE) 
Um aspecto importante da modelagem do banco foi a utilização do ON DELETE CASCADE. Esse recurso é essencial para manter a integridade referencial, pois garante que, ao excluir um registro principal, todos os registros dependentes também sejam removidos automaticamente. Dessa forma, evitamos a existência de dados órfãos e mantemos a coerência do banco de dados.

# drizzle studio
Para facilitar o gerenciamento do banco, utilizamos o Drizzle Studio. Essa ferramenta permite visualizar, modificar e executar consultas SQL de maneira simples. Além disso, o Drizzle se integra bem com TypeScript, garantindo segurança nas operações.

# TypeScript:
esqueci o que é, ver com o professor



