import { Month } from '../schemas/investment-goal.js';
export type { Month };

export class InvestmentGoal {
  id: string;
  name: string;
  months: Month[];
  totalValue: number;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    id: string,
    name: string,
    months: Month[],
    totalValue: number,
    createdAt: Date,
    updatedAt: Date
  ) {
    this.id = id;
    this.name = name;
    this.months = months;
    this.totalValue = totalValue;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
