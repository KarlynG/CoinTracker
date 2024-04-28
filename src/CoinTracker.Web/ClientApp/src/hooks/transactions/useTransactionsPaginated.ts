import { useQuery } from '@tanstack/react-query';
import transactionService from '../../services/transactions/transaction.service';

function useTransactionsPaginated(budgetId: string, firebaseId: string, skip: number = 1, take: number = 10, params?: object) {

    return useQuery({
        queryKey: ['transactionsPaginated', skip, take, params],
        queryFn: () => transactionService.getAllWithPagination(`/Budget/${budgetId}/User/${firebaseId}`, skip, take, params),
        refetchOnWindowFocus: false,
        placeholderData: (prev) => prev,
      });
}

export default useTransactionsPaginated;
