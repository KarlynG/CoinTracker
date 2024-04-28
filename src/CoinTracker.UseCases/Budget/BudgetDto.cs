using CoinTracker.Core.Enums;
using CoinTracker.UseCases.Transaction;

namespace CoinTracker.UseCases.Budget;
public class BudgetDto
{
  public Guid Id { get; init; }
  public Guid UserId { get; set; }
  public DateTimeOffset CreatedDate { get; set; }
  public decimal FullAmount { get; init; }
  public Currencies Currency { get; init; }
  public string Name { get; init; } = string.Empty;
  public decimal Limit { get; init; }
  public LimitPeriod LimitPeriod { get; init; }
  public ICollection<BudgetTransactionDto>? Transactions { get; set; }
  public decimal ExpendedAmount { get; set; }
}
