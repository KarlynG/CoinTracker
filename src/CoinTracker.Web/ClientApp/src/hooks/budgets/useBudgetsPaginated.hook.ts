import { useQuery } from '@tanstack/react-query';
import budgetService from '../../services/budgets/budget.service';

function useBudgetsPaginated(firebaseId: string, skip: number = 1, take: number = 10, params?: object) {

    return useQuery({
        queryKey: ['budgetsPaginated', skip, take, params],
        queryFn: () => budgetService.getAllWithPagination(`/${firebaseId}`, skip, take, params),
        refetchOnWindowFocus: false,
        placeholderData: (prev) => prev,
      });
}

export default useBudgetsPaginated;
