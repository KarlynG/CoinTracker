using CoinTracker.Core.Abstract;
using CoinTracker.Core.Aggregates.TransactionAggregate;
using CoinTracker.Core.Enums;

namespace CoinTracker.Core.Aggregates.UserAggregate;
public class UserBudget : BaseEntity
{
  public Guid UserId { get; set; }
  public decimal FullAmount { get; set; }
  public Currencies Currency { get; set; }
  public string Name { get; set; } = string.Empty;
  public decimal Limit { get; set; }
  public LimitPeriod LimitPeriod { get; set; }
  public ICollection<BudgetTransaction>? Transactions { get; set; }
}
