using Ardalis.Result;
using Ardalis.SharedKernel;
using CoinTracker.Core.Abstract;
using CoinTracker.Core.Aggregates.TransactionAggregate;
using CoinTracker.Core.Aggregates.TransactionAggregate.Specifications;

namespace CoinTracker.UseCases.Transaction.List;
public class ListTransactionQueryHandler(IReadRepository<BudgetTransaction> repository) : IQueryHandler<ListTransactionQuery, Result<BasePaginatedResponse<BudgetTransaction>>>
{
  public async Task<Result<BasePaginatedResponse<BudgetTransaction>>> Handle(ListTransactionQuery request, CancellationToken cancellationToken)
  {
    try
    {
      GetTransactionByBudgetId spec = new(request.BudgetId, request.Category, request.Type, request.Skip, request.Take);
      var result = await repository.ListAsync(spec, cancellationToken);
      var response = new BasePaginatedResponse<BudgetTransaction>(request.Skip, request.Take, result, repository.CountAsync(spec, cancellationToken).Result);
      return response;
    }
    catch (Exception ex)
    {
      return Result.Error(ex.Message);
    }
  }
}
