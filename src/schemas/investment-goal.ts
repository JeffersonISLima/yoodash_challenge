import { z } from 'zod';

export const monthEnum = z.enum(
  [
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
  {
    description: 'Mês do ano',
  }
);

export const createInvestmentGoalBody = z.object({
  name: z.string().min(1, 'nome é obrigatório'),
  months: z.array(monthEnum).min(1, 'informe pelo menos um mês'),
  totalValue: z
    .number()
    .finite()
    .positive('valor total deve ser maior que zero'),
});

export const updateInvestmentGoalBody = z
  .object({
    name: z.string().min(1, 'nome é obrigatório').optional(),
    months: z.array(monthEnum).min(1, 'informe pelo menos um mês').optional(),
    totalValue: z
      .number()
      .finite()
      .positive('valor total deve ser maior que zero')
      .optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: 'Pelo menos um campo deve ser fornecido para atualização',
  });

export const investmentGoalParams = z.object({ id: z.string().uuid() });

export const listInvestmentGoalsQuery = z.object({
  name: z.string().optional(),
  month: monthEnum.optional(),
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(20),
});

export const investmentGoalEntity = z.object({
  id: z.string().uuid(),
  name: z.string(),
  months: z.array(monthEnum),
  totalValue: z.number(),
  perMonthValue: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type Month = z.infer<typeof monthEnum>;
export type CreateInvestmentGoal = z.infer<typeof createInvestmentGoalBody>;
export type UpdateInvestmentGoal = z.infer<typeof updateInvestmentGoalBody>;
export type InvestmentGoalParams = z.infer<typeof investmentGoalParams>;
export type ListInvestmentGoalsFilters = z.infer<
  typeof listInvestmentGoalsQuery
>;
export type InvestmentGoalEntity = z.infer<typeof investmentGoalEntity>;

export type InvestmentGoalResponse = InvestmentGoalEntity;
