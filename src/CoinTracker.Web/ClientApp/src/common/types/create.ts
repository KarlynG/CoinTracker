import { Budget } from "../../models";
import { BudgetTransaction } from "../../models/transactions/budgetTransaction.model";

// Define the PropertyName type based on the type parameter T
type PropertyName<T> = 
T extends BudgetTransaction ? "transaction" :
T extends Budget ? "budget" : "data";

// Define the Create interface normally
export interface Create<T> {
  data: Partial<T>;
}

// Define the Update structure as a type alias using a mapped type
export type Update<T> = {
  userId: string;
} & { [P in PropertyName<T>]: Partial<T> };
