using Ardalis.Result;
using Ardalis.SharedKernel;
using CoinTracker.Core.Aggregates.TransactionAggregate;

namespace CoinTracker.UseCases.Transaction.Update;
public class UpdateTransactionHandler(IRepository<BudgetTransaction> repository)
  : ICommandHandler<UpdateTransactionCommand, Result<BudgetTransaction>>
{
  public async Task<Result<BudgetTransaction>> Handle(UpdateTransactionCommand request, CancellationToken cancellationToken)
  {
    BudgetTransaction? existingTransaction = await repository.GetByIdAsync(request.Transaction.Id, cancellationToken);
    if (existingTransaction is null)
      return Result.NotFound();

    existingTransaction.UpdateTransaction(request.Transaction);
    await repository.UpdateAsync(existingTransaction, cancellationToken);

    return Result.Success(existingTransaction);
  }
}
