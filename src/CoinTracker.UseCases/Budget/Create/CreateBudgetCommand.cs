using Ardalis.Result;
using Ardalis.SharedKernel;
using CoinTracker.Core.Aggregates.UserAggregate;
using CoinTracker.Core.Enums;

namespace CoinTracker.UseCases.Budget.Create;
public class CreateBudgetCommand : ICommand<Result<UserBudget>>
{
  public string FirebaseId { get; init; } = string.Empty;
  public decimal FullAmount { get; init; }
  public Currencies Currency { get; init; }
  public string Name { get; init; } = string.Empty;
  public decimal? Limit { get; init; }
  public LimitPeriod LimitPeriod { get; init; }
}
