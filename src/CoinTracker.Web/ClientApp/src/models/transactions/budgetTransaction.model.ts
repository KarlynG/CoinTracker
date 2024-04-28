import { Currency, ExpenseCategories, TransactionType } from "../../common/enums";
import { RecurrenceFrequency } from "../../common/enums/recurrence.frequency.enum";

export interface CreateTransactionDto {
  budgetId?: string;
  amount: number;
  date: Date;
  description: string;
  category: ExpenseCategories;
  recurringTransaction?: RecurringTransactionDto;
}

export interface BudgetTransaction extends CreateTransactionDto {
  id?: string;
  userId?: string;
  currency?: Currency;
  type?: TransactionType;
}

export interface RecurringTransactionDto {
  frequency: RecurrenceFrequency;
  interval: number;
  nextOccurrence: Date;
  isActive: boolean;
}
