using Ardalis.Result;
using Ardalis.SharedKernel;
using CoinTracker.Core.Aggregates.UserAggregate;

namespace CoinTracker.UseCases.Budget.Update;
public class UpdateBudgetCommand(UserBudget budget) : ICommand<Result<UserBudget>>
{
  public UserBudget Budget { get; set; } = budget;
}
