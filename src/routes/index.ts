import { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { IndexController } from '../controllers/IndexController.js';

export async function indexRoutes(app: FastifyInstance) {
  const r = app.withTypeProvider<ZodTypeProvider>();

  r.get(
    '/',
    {
      schema: {
        tags: ['welcome'],
        summary: 'Diagnóstico/Status da API',
        response: {
          200: {
            type: 'object',
            properties: {
              welcome: { type: 'string' },
              env: { type: 'string' },
              hostname: { type: 'string' },
              pid: { type: 'integer' },
              node_version: { type: 'string' },
              date_time: { type: 'string' },
              timezone: { type: 'string' },
              description: { type: 'string', nullable: true },
            },
            required: [
              'welcome',
              'env',
              'hostname',
              'pid',
              'node_version',
              'date_time',
              'timezone',
              'description',
            ],
          },
        },
      },
    },
    async (req, reply) => IndexController.welcome(req, reply)
  );
}
