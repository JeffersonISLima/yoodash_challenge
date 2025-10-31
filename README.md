# Investment Goals API

API RESTful para metas de investimento com Fastify, PostgreSQL (Docker), Prisma ORM, Zod e Swagger.

## Como executar

- Desenvolvimento local:

```bash
npm install
# criar arquivo .env (opcional, usa defaults)
cp .env.example .env
# banco com docker
docker compose up -d db
# gerar Prisma Client
npm run prisma:generate
# aplicar migrações (desenvolvimento)
npm run prisma:migrate
npm run dev
# para ver as informações cadastradas no banco
npm run prisma:studio
```

- Rota de diagnóstico: `GET /`

  - Retorna build, ambiente, hostname e data/hora (veja `IndexController`).

- Endpoints:
  - POST `/investment-goals`
  - GET `/investment-goals?name=...&month=...&page=1&pageSize=20`
  - GET `/investment-goals/:id`
  - PUT `/investment-goals/:id`
  - DELETE `/investment-goals/:id`

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
