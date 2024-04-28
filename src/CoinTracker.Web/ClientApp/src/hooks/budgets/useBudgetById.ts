import { useQuery } from '@tanstack/react-query';
import budgetService from '../../services/budgets/budget.service';

function useBudgetById(firebaseId: string, budgetId: string, params?: object) {

    return useQuery({
        queryKey: ['budgetById', firebaseId, budgetId, params],
        queryFn: () => budgetService.getById(budgetId, params, `/User/${firebaseId}`),
        refetchOnWindowFocus: false,
        placeholderData: (prev) => prev,
      });
}

export default useBudgetById;
