# Investment Goals API

API RESTful para gerenciamento de metas de investimento. Permite criar, listar, buscar, atualizar e excluir metas, calculando automaticamente o valor mensal necessário com base no valor total da meta e no número de meses selecionados.

## Como executar

- Desenvolvimento local:

```bash
# instalar dependências do projeto
npm install
# criar arquivo .env (ajustar variáveis conforme necessário)
cp .env.example .env
# banco com docker
docker compose up -d db
# gerar Prisma Client
npm run prisma:generate
# aplicar migrações
npm run prisma:migrate
# subir o server
npm run dev
# para ver as informações cadastradas no banco de dados
npm run prisma:studio
```

- Rota de diagnóstico: `GET /`

  - Retorna informações de status/ambiente da API (veja `IndexController`).
  - Campos retornados:
    - `welcome`: mensagem de boas-vindas
    - `env`: ambiente atual (ex.: `development`, `production`)
    - `hostname`: nome do host onde a API está rodando
    - `pid`: identificador do processo Node.js
    - `node_version`: versão do Node.js em execução
    - `date_time`: data/hora atual no servidor (yyyy-MM-dd HH:mm:ss)
    - `timezone`: timezone do servidor
    - `description`: descrição opcional da aplicação (via env `PROJECT_DESCRIPTION`)

- Rotas de metas de investimentos:
  - Criar meta: `POST /investment-goals`
  - Listar metas: `GET /investment-goals?name=...&month=...&page=1&pageSize=20`
  - Buscar meta por ID: `GET /investment-goals/:id`
  - Atualizar meta por ID: `PUT /investment-goals/:id`
  - Excluir meta por ID: `DELETE /investment-goals/:id`

Docs Swagger: `http://localhost:3000/docs`

## Arquitetura

O projeto segue uma arquitetura em camadas, separando responsabilidades:

- **Routes** → Organizam as rotas HTTP no Fastify.
- **Controllers** → Recebem requisições e chamam os serviços.
- **Services** → Contêm a lógica de negócio e validações.
- **Repositories** → Isolam o acesso ao banco de dados (Prisma Client).
- **Entities** → Representam as estruturas de domínio manipuladas pela aplicação.
- **Schemas (Zod)** → Validam entradas/saídas e expõem tipos para as camadas.

## Prisma

Este projeto utiliza Prisma ORM para acesso ao banco de dados.

- **Gerar Prisma Client**: `npm run prisma:generate`
- **Criar migration**: `npm run prisma:migrate`
- **Aplicar migrations em prod/CI**: `npm run prisma:deploy`
- **Abrir Prisma Studio**: `npm run prisma:studio`

## Tecnologias

- **Node.js + TypeScript**
- **Fastify** - servidor web rápido e leve
- **Prisma ORM** - modelagem e acesso ao banco PostgreSQL
- **Docker Compose** - orquestração de containers
- **Zod** - validação de dados
- **Swagger (Fastify-Swagger)** - documentação interativa
