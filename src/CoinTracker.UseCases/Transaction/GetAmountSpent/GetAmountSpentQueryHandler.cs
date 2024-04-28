using Ardalis.Result;
using Ardalis.SharedKernel;
using CoinTracker.Core.Aggregates.TransactionAggregate;
using CoinTracker.Core.Aggregates.TransactionAggregate.Specifications;

namespace CoinTracker.UseCases.Transaction.GetAmountSpent;
public class GetAmountSpentQueryHandler(IReadRepository<BudgetTransaction> repository) : IQueryHandler<GetAmountSpentQuery, Result<List<BudgetTransaction>>>
{
  public async Task<Result<List<BudgetTransaction>>> Handle(GetAmountSpentQuery request, CancellationToken cancellationToken)
  {
    try
    {
      GetTransactionSpentByBudgetIdSpec spec = new(request.BudgetId);
      List<BudgetTransaction> result = await repository.ListAsync(spec, cancellationToken);
      return Result.Success(result);
    }
    catch (Exception ex)
    {
      return Result.Error(ex.Message);
    }
  }
}
