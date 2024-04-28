using Ardalis.Result;

namespace CoinTracker.Core.Interfaces;

public interface IBudgetService
{
  public Task<Result<bool>> CheckIfBudgetExists(Guid budgetId, CancellationToken cancellationToken);
  public Task<Result<bool>> CheckIfBudgetIsAssociatedWithUser(Guid budgetId, Guid userId, CancellationToken cancellationToken);
  Task<Result<bool>> CheckIfBudgetIsAssociatedWithUser(Guid budgetId, string firebaseId, CancellationToken cancellationToken);
}
