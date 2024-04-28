using Ardalis.Result;
using Ardalis.SharedKernel;
using CoinTracker.Core.Abstract;
using CoinTracker.Core.Aggregates.UserAggregate;
using CoinTracker.Core.Aggregates.UserAggregate.Specifications;

namespace CoinTracker.UseCases.Budget.List;
public class ListBudgetQueryHandler(IReadRepository<User> repository) : IQueryHandler<ListBudgetQuery, Result<BasePaginatedResponse<UserBudget>>>
{
  public async Task<Result<BasePaginatedResponse<UserBudget>>> Handle(ListBudgetQuery request, CancellationToken cancellationToken)
  {
    try
    {
      GetUserBudgetsWithSpec spec = new(request.FirebaseId);
      var result = await repository.FirstOrDefaultAsync(spec, cancellationToken);
      if (result == null)
        return Result.NotFound();

      int totalRecords = result.Budgets
        .Where(budget => !request.Currency.HasValue || budget.Currency == request.Currency).Count();

      if (request.Skip!.Value != 0 && request.Take!.Value != 0)
      {
        result.Budgets = result.Budgets
          .Where(budget => !request.Currency.HasValue || budget.Currency == request.Currency)
          .Skip((request.Skip!.Value - 1) * request.Take!.Value)
          .Take(request.Take.Value).ToList();
      }

      var response = new BasePaginatedResponse<UserBudget>(
        request.Skip,
        request.Take,
        result.Budgets,
        totalRecords);
      return response;
    }
    catch (Exception ex)
    {
      return Result.Error(ex.Message);
    }
  }
}
