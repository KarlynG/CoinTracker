using Ardalis.Result;
using Ardalis.SharedKernel;
using CoinTracker.Core.Aggregates.UserAggregate;
using CoinTracker.Core.Aggregates.UserAggregate.Specifications;
using CoinTracker.Core.Interfaces;

namespace CoinTracker.Core.Services;
public class BudgetService(IRepository<User> repository) : IBudgetService
{
  public async Task<Result<bool>> CheckIfBudgetExists(Guid budgetId, CancellationToken cancellationToken)
  {
    GetUserByBudgetId spec = new(budgetId);
    var result = await repository.FirstOrDefaultAsync(spec, cancellationToken);
    return result?.Budgets.FirstOrDefault() == null;
  }

  public async Task<Result<bool>> CheckIfBudgetIsAssociatedWithUser(Guid budgetId, Guid userId, CancellationToken cancellationToken)
  {
    GetUserByBudgetId spec = new(userId);
    var result = await repository.FirstOrDefaultAsync(spec, cancellationToken);
    var budgetExist = (bool)result?.Budgets.Any(budget => budget.Id == budgetId)!;
    return budgetExist;
  }

  public async Task<Result<bool>> CheckIfBudgetIsAssociatedWithUser(Guid budgetId, string firebaseId, CancellationToken cancellationToken)
  {
    GetUserByFirebaseIdWithBudgets spec = new(firebaseId);
    var result = await repository.FirstOrDefaultAsync(spec, cancellationToken);
    var budgetExist = (bool)result?.Budgets.Any(budget => budget.Id == budgetId)!;
    return budgetExist;
  }
}
