using Ardalis.Specification;

namespace CoinTracker.Core.Aggregates.RecurringTransactions.Specifications;
public class GetRecurringTransactions: Specification<RecurringTransaction>
{
  public GetRecurringTransactions()
  {
    var currentDate = DateTimeOffset.Now.ToUniversalTime();
    Query
      .Where(rt => rt.NextOccurrence <= currentDate && rt.IsActive == true);
  }
}
