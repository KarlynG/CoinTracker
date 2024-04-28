using Ardalis.Specification;
using CoinTracker.Core.Enums;

namespace CoinTracker.Core.Aggregates.TransactionAggregate.Specifications;
public class GetTransactionByBudgetId : Specification<BudgetTransaction>
{
  public GetTransactionByBudgetId(Guid budgetId, ExpenseCategories? category, TransactionType? type, int? skip, int? take)
  {
    Query
      .Where(x => x.BudgetId == budgetId)
      .Include(x => x.RecurringTransaction);

    if (category != null)
    {
      Query.Where(y => y.Category == category);
    }

    if (type != null)
    {
      Query.Where(y => type.Value == TransactionType.Recurrent ? y.RecurringTransaction != null : y.RecurringTransaction == null);
    }

    if ((skip != null) && (take != null))
    {
      Query
        .Skip((skip.Value - 1) * take.Value)
        .Take(take.Value);
    }
  }
}
