using Ardalis.Specification;

namespace CoinTracker.Core.Aggregates.TransactionAggregate.Specifications;
public class GetTransactionSpentByBudgetIdSpec : Specification<BudgetTransaction>
{
  public GetTransactionSpentByBudgetIdSpec(Guid budgetId)
  {
    DateTime firstDayOfCurrentMonth = new(DateTime.Now.Year, DateTime.Now.Month, 1);
    DateTime firstDayOfNextMonth = firstDayOfCurrentMonth.AddMonths(1);

    Query.Where(x => x.BudgetId == budgetId && x.Date >= firstDayOfCurrentMonth && x.Date < firstDayOfNextMonth);
  }
}
