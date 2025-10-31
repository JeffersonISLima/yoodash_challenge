import Fastify from 'fastify';
import swagger from '@fastify/swagger';
import swaggerUI from '@fastify/swagger-ui';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { IndexController } from './controllers/IndexController.js';
import { investmentGoalsRoutes } from './routes/investment-goals.js';

export async function buildApp() {
  const app = Fastify({ logger: true }).withTypeProvider<ZodTypeProvider>();

  await app.register(swagger, {
    openapi: {
      info: {
        title: 'Investment Goals API',
        description: 'API RESTful para gerenciar metas de investimento',
        version: '1.0.0',
      },
      servers: [{ url: '/' }],
    },
  });

  await app.register(swaggerUI, { routePrefix: '/docs' });

  await app.register(investmentGoalsRoutes, { prefix: '/investment-goals' });

  app.get('/', async (req, reply) => IndexController.welcome(req, reply));

  return app;
}
