import { Budget } from "../../models/budgets/budget.model";
import BaseCrudService from "../base.service";

let instance: BudgetService;

class BudgetService extends BaseCrudService<Budget> {
  constructor() {
    super("Budget");

    if (!instance) {
      instance = this;
    }
  }
}

const budgetService = Object.freeze(new BudgetService());

export default budgetService;
