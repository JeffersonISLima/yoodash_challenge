import Fastify from 'fastify';
import swagger from '@fastify/swagger';
import swaggerUI from '@fastify/swagger-ui';
import { indexRoutes } from './routes/index.js';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { investmentGoalsRoutes } from './routes/investment-goals.js';

export async function buildApp() {
  const app = Fastify({ logger: true }).withTypeProvider<ZodTypeProvider>();

  await app.register(swagger, {
    openapi: {
      info: {
        title: process.env.PROJECT_TITLE ?? 'API Metas de Investimento',
        description: process.env.PROJECT_DESCRIPTION ?? '',
        version: process.env.PROJECT_VERSION ?? '',
      },
      servers: [{ url: '/' }],
    },
  });

  await app.register(indexRoutes);
  await app.register(swaggerUI, { routePrefix: '/docs' });
  await app.register(investmentGoalsRoutes, { prefix: '/investment-goals' });

  return app;
}
