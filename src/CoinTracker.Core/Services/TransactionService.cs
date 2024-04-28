using Ardalis.Result;
using Ardalis.SharedKernel;
using CoinTracker.Core.Aggregates.TransactionAggregate;
using CoinTracker.Core.Aggregates.TransactionAggregate.Specifications;
using CoinTracker.Core.Interfaces;

namespace CoinTracker.Core.Services;
public class TransactionService(IRepository<BudgetTransaction> repository) : ITransactionService
{
  public async Task<Result<bool>> CheckIfTransactionIsAssociatedWithUser(Guid transactionId, Guid userId, CancellationToken cancellationToken)
  {
    GetUserByTransactionIdSpec spec = new(transactionId);
    BudgetTransaction? transaction = await repository.FirstOrDefaultAsync(spec, cancellationToken);
    return transaction?.Budget?.UserId == userId;
  }
}
