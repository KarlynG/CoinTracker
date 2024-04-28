using Ardalis.SharedKernel;
using CoinTracker.Core.Abstract;
using CoinTracker.Core.Enums;

namespace CoinTracker.Core.Aggregates.RecurringTransactions;
public class RecurringTransaction : BaseEntity, IAggregateRoot
{
  public Guid BudgetTransactionId { get; set; }
  public RecurrenceFrequency Frequency { get; set; }
  public int Interval { get; set; }
  public DateTimeOffset NextOccurrence { get; set; }
  public bool IsActive { get; set; }
}
