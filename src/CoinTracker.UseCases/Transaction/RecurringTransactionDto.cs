using CoinTracker.Core.Enums;

namespace CoinTracker.UseCases.Transaction;
public class RecurringTransactionDto
{
  public Guid Id { get; set; }
  public RecurrenceFrequency Frequency { get; set; }
  public int Interval { get; set; }
  public DateTimeOffset NextOccurrence { get; set; }
  public bool IsActive { get; set; }
}
