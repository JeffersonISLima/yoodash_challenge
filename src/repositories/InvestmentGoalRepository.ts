import {
  CreateInvestmentGoal,
  UpdateInvestmentGoal,
  ListInvestmentGoalsFilters,
} from '../schemas/investment-goal.js';
import { Prisma } from '@prisma/client';
import { prisma } from '../../database/prisma.js';
import { InvestmentGoal, Month } from '../entities/InvestmentGoal.js';

function mapPrismaToModel(data: {
  id: string;
  name: string;
  months: string[];
  totalValue: Prisma.Decimal;
  createdAt: Date;
  updatedAt: Date;
}): InvestmentGoal {
  return new InvestmentGoal(
    data.id,
    data.name,
    data.months as Month[],
    data.totalValue.toNumber(),
    data.createdAt,
    data.updatedAt
  );
}

export class InvestmentGoalRepository {
  async create(input: CreateInvestmentGoal): Promise<InvestmentGoal> {
    const data = await prisma.investmentGoal.create({
      data: {
        name: input.name,
        months: input.months,
        totalValue: input.totalValue,
      },
    });
    return mapPrismaToModel(data);
  }

  async findAll(
    filters: ListInvestmentGoalsFilters
  ): Promise<InvestmentGoal[]> {
    const { name, month, page = 1, pageSize = 20 } = filters;

    const where: {
      name?: { contains: string; mode: 'insensitive' };
      months?: { has: string };
    } = {};

    if (name) {
      where.name = { contains: name, mode: 'insensitive' };
    }

    if (month) {
      where.months = { has: month };
    }

    const data = await prisma.investmentGoal.findMany({
      where: Object.keys(where).length > 0 ? where : undefined,
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    return data.map(mapPrismaToModel);
  }

  async findById(id: string): Promise<InvestmentGoal | null> {
    const data = await prisma.investmentGoal.findUnique({
      where: { id },
    });

    return data ? mapPrismaToModel(data) : null;
  }

  async update(
    id: string,
    changes: UpdateInvestmentGoal
  ): Promise<InvestmentGoal | null> {
    const updateData: {
      name?: string;
      months?: string[];
      totalValue?: number;
    } = {};

    if (changes.name) {
      updateData.name = changes.name;
    }
    if (changes.months) {
      updateData.months = changes.months;
    }
    if (changes.totalValue) {
      updateData.totalValue = changes.totalValue;
    }

    if (!Object.keys(updateData).length) {
      return null;
    }

    try {
      const data = await prisma.investmentGoal.update({
        where: { id },
        data: updateData,
      });
      return mapPrismaToModel(data);
    } catch (error) {
      // Prisma throws P2025 if record not found
      if (
        error &&
        typeof error === 'object' &&
        'code' in error &&
        error.code === 'P2025'
      ) {
        return null;
      }
      throw error;
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      await prisma.investmentGoal.delete({
        where: { id },
      });
      return true;
    } catch (error) {
      // Prisma throws P2025 if record not found
      if (
        error &&
        typeof error === 'object' &&
        'code' in error &&
        error.code === 'P2025'
      ) {
        return false;
      }
      throw error;
    }
  }
}
