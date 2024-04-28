import { BudgetTransaction } from "../../models/transactions/budgetTransaction.model";
import BaseCrudService from "../base.service";

let instance: TransactionService;

class TransactionService extends BaseCrudService<BudgetTransaction> {
  constructor() {
    super("Transaction");

    if (!instance) {
      instance = this;
    }
  }
}

const transactionService = Object.freeze(new TransactionService());

export default transactionService;
