import { Currency } from "../../common/enums/currency.enum";
import { LimitPeriod } from "../../common/enums/limitPeriod.enum";
import { BaseEntity } from "../baseEntity.model";
import { BudgetTransaction } from "../transactions/budgetTransaction.model";

export interface Budget extends BaseEntity {
  firebaseId?: string;
  fullAmount: number;
  name: string;
  limit: number;
  currency: Currency;
  limitPeriod: LimitPeriod;
  expendedAmount?: number;
  transactions?: BudgetTransaction[];
}