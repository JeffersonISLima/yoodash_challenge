import {
  CreateInvestmentGoal,
  UpdateInvestmentGoal,
  InvestmentGoalResponse,
  ListInvestmentGoalsFilters,
} from '../schemas/investment-goal.js';
import { FastifyReply, FastifyRequest } from 'fastify';
import { InvestmentGoalService } from '../services/InvestmentGoalService.js';

export class InvestmentGoalController {
  constructor(private service: InvestmentGoalService) {}

  async create(
    req: FastifyRequest,
    reply: FastifyReply
  ): Promise<InvestmentGoalResponse> {
    try {
      const input = req.body as CreateInvestmentGoal;
      const result = await this.service.create(input);
      return reply.code(201).send(result);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Erro ao criar meta';
      return reply.code(400).send({ message });
    }
  }

  async findAll(
    req: FastifyRequest,
    reply: FastifyReply
  ): Promise<InvestmentGoalResponse[]> {
    try {
      const filters = req.query as ListInvestmentGoalsFilters;
      return await this.service.findAll(filters);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Erro ao listar metas';
      return reply.code(500).send({ message });
    }
  }

  async findById(
    req: FastifyRequest,
    reply: FastifyReply
  ): Promise<InvestmentGoalResponse> {
    try {
      const { id } = req.params as { id: string };
      return await this.service.findById(id);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Erro ao buscar meta';
      const statusCode =
        error instanceof Error && error.message === 'Meta não encontrada'
          ? 404
          : 500;
      return reply.code(statusCode).send({ message });
    }
  }

  async update(
    req: FastifyRequest,
    reply: FastifyReply
  ): Promise<InvestmentGoalResponse> {
    try {
      const { id } = req.params as { id: string };
      const changes = req.body as UpdateInvestmentGoal;
      return await this.service.update(id, changes);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Erro ao atualizar meta';
      const statusCode =
        error instanceof Error && error.message === 'Meta não encontrada'
          ? 404
          : 400;
      return reply.code(statusCode).send({ message });
    }
  }

  async delete(req: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const { id } = req.params as { id: string };
      await this.service.delete(id);
      return reply.code(204).send();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Erro ao excluir meta';
      const statusCode =
        error instanceof Error && error.message === 'Meta não encontrada'
          ? 404
          : 500;
      return reply.code(statusCode).send({ message });
    }
  }
}
