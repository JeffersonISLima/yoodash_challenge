import { defineConfig } from 'prisma/config';

const url =
  process.env.DATABASE_URL ??
  'postgres://postgres:postgres@localhost:5433/yoodash';

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
  },
  engine: 'classic',
  datasource: {
    url,
  },
});
