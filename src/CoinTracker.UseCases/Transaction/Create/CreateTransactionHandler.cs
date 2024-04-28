using Ardalis.Result;
using Ardalis.SharedKernel;
using CoinTracker.Core.Aggregates.TransactionAggregate;

namespace CoinTracker.UseCases.Transaction.Create;
public class CreateTransactionHandler(IRepository<BudgetTransaction> transactionRepository)
  : ICommandHandler<CreateTransactionCommand, Result<BudgetTransaction>>
{
  public async Task<Result<BudgetTransaction>> Handle(CreateTransactionCommand request, CancellationToken cancellationToken)
  {
    var result = await transactionRepository.AddAsync(request.Transaction, cancellationToken);
    return result;
  }
}
