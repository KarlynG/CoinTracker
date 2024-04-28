using Ardalis.Result;
using Ardalis.SharedKernel;
using CoinTracker.Core.Aggregates.TransactionAggregate;

namespace CoinTracker.UseCases.Transaction.Delete;
public class DeleteTransactionHandler(IRepository<BudgetTransaction> repository) : ICommandHandler<DeleteTransactionCommand, Result>
{
  public async Task<Result> Handle(DeleteTransactionCommand request, CancellationToken cancellationToken)
  {
    BudgetTransaction? existingTransaction = await repository.GetByIdAsync(request.TransactionId, cancellationToken);
    if (existingTransaction is null)
      return Result.NotFound();

    await repository.DeleteAsync(existingTransaction, cancellationToken);
    return Result.Success();
  }
}
