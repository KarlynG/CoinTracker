using Ardalis.Result;
using Ardalis.SharedKernel;
using CoinTracker.Core.Aggregates.UserAggregate;
using CoinTracker.Core.Aggregates.UserAggregate.Specifications;

namespace CoinTracker.UseCases.Budget.GetById;
public class GetBudgetByIdQueryHandler(IReadRepository<User> repository) : IQueryHandler<GetBudgetByIdQuery, Result<UserBudget>>
{
  public async Task<Result<UserBudget>> Handle(GetBudgetByIdQuery request, CancellationToken cancellationToken)
  {
    try
    {
      GetUserBudgetByIdSpec spec = new(request.FirebaseId, request.BudgetId);
      var result = await repository.FirstOrDefaultAsync(spec, cancellationToken);
      if (result == null)
        return Result.NotFound();

      if(result.Budgets.FirstOrDefault() == null)
        return Result.NotFound();

      var response = Result.Success(result.Budgets.FirstOrDefault());

      return response!;
    }
    catch (Exception ex)
    {
      return Result.Error(ex.Message);
    }
  }
}

