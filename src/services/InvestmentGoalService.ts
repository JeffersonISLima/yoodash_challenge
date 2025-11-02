import {
  CreateInvestmentGoal,
  UpdateInvestmentGoal,
  InvestmentGoalResponse,
  ListInvestmentGoalsFilters,
} from '../schemas/investment-goal.js';
import { InvestmentGoal } from '../entities/InvestmentGoal.js';
import { InvestmentGoalRepository } from '../repositories/InvestmentGoalRepository.js';

export class InvestmentGoalService {
  constructor(private repository: InvestmentGoalRepository) {}

  async create(input: CreateInvestmentGoal): Promise<InvestmentGoalResponse> {
    if (!input.months.length) {
      throw new Error('É necessário informar pelo menos um mês');
    }

    if (this.monthsHasDuplicates(input.months)) {
      throw new Error('Meses não podem se repetir');
    }

    if (!input.totalValue) {
      throw new Error('Valor total deve ser maior que zero');
    }

    const goal = await this.repository.create(input);
    return this.toResponse(goal);
  }

  async findAll(
    filters: ListInvestmentGoalsFilters
  ): Promise<InvestmentGoalResponse[]> {
    const goals = await this.repository.findAll(filters);
    return goals.map((goal) => this.toResponse(goal));
  }

  async findById(id: string): Promise<InvestmentGoalResponse> {
    const goal = await this.repository.findById(id);
    if (!goal) {
      throw new Error('Meta não encontrada');
    }
    return this.toResponse(goal);
  }

  async update(
    id: string,
    changes: UpdateInvestmentGoal
  ): Promise<InvestmentGoalResponse> {
    if (changes.months && !changes.months.length) {
      throw new Error('Meses, se enviado, deve conter pelo menos um mês');
    }

    if (changes.months && this.monthsHasDuplicates(changes.months)) {
      throw new Error('Meses não podem se repetir');
    }

    if (!changes.totalValue) {
      throw new Error('Valor total deve ser maior que zero');
    }

    const goal = await this.repository.update(id, changes);
    if (!goal) {
      throw new Error('Meta não encontrada');
    }
    return this.toResponse(goal);
  }

  async delete(id: string): Promise<void> {
    const deleted = await this.repository.delete(id);
    if (!deleted) {
      throw new Error('Meta não encontrada');
    }
  }

  private calculatePerMonthValue(goal: InvestmentGoal): number {
    return goal.months.length > 0
      ? Number((goal.totalValue / goal.months.length).toFixed(2))
      : 0;
  }

  private monthsHasDuplicates(months: readonly string[]): boolean {
    return new Set(months).size !== months.length;
  }

  private toResponse(goal: InvestmentGoal): InvestmentGoalResponse {
    return {
      id: goal.id,
      name: goal.name,
      months: goal.months,
      totalValue: goal.totalValue,
      perMonthValue: this.calculatePerMonthValue(goal),
      createdAt: goal.createdAt.toISOString(),
      updatedAt: goal.updatedAt.toISOString(),
    };
  }
}
