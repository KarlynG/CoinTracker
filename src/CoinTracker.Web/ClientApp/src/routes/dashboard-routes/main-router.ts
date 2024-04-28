import Budgets from "../../pages/budgets";
import BudgetDetails from "../../pages/budgets/details";
import Home from "../../pages/home";
import Settings from "../../pages/settings";

export const mainRouter = [
  {
    path: "/",
    element: Home,
  },
  {
    path: "/budgets",
    element: Budgets,
  },
  {
    path: "/budgets/:id",
    element: BudgetDetails,
  },
  {
    path: "/settings",
    element: Settings,
  },
];
