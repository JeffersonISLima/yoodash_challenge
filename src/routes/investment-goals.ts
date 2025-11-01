import {
  investmentGoalParams,
  createInvestmentGoalBody,
  updateInvestmentGoalBody,
  listInvestmentGoalsQuery,
} from '../schemas/investment-goal.js';
import { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { InvestmentGoalService } from '../services/InvestmentGoalService.js';
import { InvestmentGoalController } from '../controllers/InvestmentGoalController.js';
import { InvestmentGoalRepository } from '../repositories/InvestmentGoalRepository.js';

export async function investmentGoalsRoutes(app: FastifyInstance) {
  const r = app.withTypeProvider<ZodTypeProvider>();
  const repository = new InvestmentGoalRepository();
  const service = new InvestmentGoalService(repository);
  const controller = new InvestmentGoalController(service);

  const createBodySchema = {
    type: 'object',
    required: ['name', 'months', 'totalValue'],
    properties: {
      name: { type: 'string', minLength: 1, description: 'Nome da meta' },
      months: {
        type: 'array',
        items: {
          type: 'string',
          enum: [
            'janeiro',
            'fevereiro',
            'marco',
            'abril',
            'maio',
            'junho',
            'julho',
            'agosto',
            'setembro',
            'outubro',
            'novembro',
            'dezembro',
          ],
        },
        minItems: 1,
        description: 'Lista de meses',
      },
      totalValue: {
        type: 'number',
        minimum: 0,
        description: 'Valor total da meta',
      },
    },
  };

  const updateBodySchema = {
    type: 'object',
    minProperties: 1,
    properties: {
      name: { type: 'string', minLength: 1, description: 'Nome da meta' },
      months: {
        type: 'array',
        items: {
          type: 'string',
          enum: [
            'janeiro',
            'fevereiro',
            'marco',
            'abril',
            'maio',
            'junho',
            'julho',
            'agosto',
            'setembro',
            'outubro',
            'novembro',
            'dezembro',
          ],
        },
        minItems: 1,
        description: 'Lista de meses',
      },
      totalValue: {
        type: 'number',
        minimum: 0,
        description: 'Valor total da meta',
      },
    },
  };

  const goalResponseSchema = {
    type: 'object',
    properties: {
      id: { type: 'string', format: 'uuid' },
      name: { type: 'string' },
      months: {
        type: 'array',
        items: { type: 'string' },
      },
      totalValue: { type: 'number' },
      perMonthValue: { type: 'number' },
      createdAt: { type: 'string', format: 'date-time' },
      updatedAt: { type: 'string', format: 'date-time' },
    },
  };

  r.post(
    '/',
    {
      schema: {
        tags: ['investment-goals'],
        summary: 'Criar meta de investimento',
        body: createBodySchema,
        response: {
          201: goalResponseSchema,
          400: {
            type: 'object',
            properties: {
              message: { type: 'string' },
            },
          },
        },
      },
    },
    async (req, reply) => {
      const body = createInvestmentGoalBody.parse(req.body);
      req.body = body;
      return controller.create(req, reply);
    }
  );

  r.get(
    '/',
    {
      schema: {
        tags: ['investment-goals'],
        summary: 'Listar metas de investimento com filtros',
        querystring: {
          type: 'object',
          properties: {
            name: { type: 'string', description: 'Filtrar por nome' },
            month: {
              type: 'string',
              enum: [
                'janeiro',
                'fevereiro',
                'marco',
                'abril',
                'maio',
                'junho',
                'julho',
                'agosto',
                'setembro',
                'outubro',
                'novembro',
                'dezembro',
              ],
              description: 'Filtrar por mês',
            },
            page: {
              type: 'integer',
              minimum: 1,
              default: 1,
              description: 'Número da página',
            },
            pageSize: {
              type: 'integer',
              minimum: 1,
              maximum: 100,
              default: 20,
              description: 'Itens por página',
            },
          },
        },
        response: {
          200: {
            type: 'array',
            items: goalResponseSchema,
          },
          500: {
            type: 'object',
            properties: {
              message: { type: 'string' },
            },
          },
        },
      },
    },
    async (req, reply) => {
      const query = listInvestmentGoalsQuery.parse(req.query);
      req.query = query;
      return controller.findAll(req, reply);
    }
  );

  r.get(
    '/:id',
    {
      schema: {
        tags: ['investment-goals'],
        summary: 'Buscar meta por ID',
        params: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
          },
          required: ['id'],
        },
        response: {
          200: goalResponseSchema,
          404: {
            type: 'object',
            properties: {
              message: { type: 'string' },
            },
          },
        },
      },
    },
    async (req, reply) => {
      const params = investmentGoalParams.parse(req.params);
      req.params = params;
      return controller.findById(req, reply);
    }
  );

  r.put(
    '/:id',
    {
      schema: {
        tags: ['investment-goals'],
        summary: 'Atualizar meta por ID',
        params: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
          },
          required: ['id'],
        },
        body: updateBodySchema,
        response: {
          200: goalResponseSchema,
          400: {
            type: 'object',
            properties: {
              message: { type: 'string' },
            },
          },
          404: {
            type: 'object',
            properties: {
              message: { type: 'string' },
            },
          },
        },
      },
    },
    async (req, reply) => {
      const params = investmentGoalParams.parse(req.params);
      const body = updateInvestmentGoalBody.parse(req.body);
      req.params = params;
      req.body = body;
      return controller.update(req, reply);
    }
  );

  r.delete(
    '/:id',
    {
      schema: {
        tags: ['investment-goals'],
        summary: 'Excluir meta por ID',
        params: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
          },
          required: ['id'],
        },
        response: {
          204: { type: 'null' },
          404: {
            type: 'object',
            properties: {
              message: { type: 'string' },
            },
          },
        },
      },
    },
    async (req, reply) => {
      const params = investmentGoalParams.parse(req.params);
      req.params = params;
      return controller.delete(req, reply);
    }
  );
}
