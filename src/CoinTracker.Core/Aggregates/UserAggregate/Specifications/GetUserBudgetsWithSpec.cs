using Ardalis.Specification;

namespace CoinTracker.Core.Aggregates.UserAggregate.Specifications;
public class GetUserBudgetsWithSpec : Specification<User>, ISingleResultSpecification<User>
{
  public GetUserBudgetsWithSpec(string firebaseId)
  {
    var currentMonth = DateTime.Now.Month;
    var currentYear = DateTime.Now.Year;
    Query
      .Where(x => x.FirebaseId == firebaseId)
      .Include(x => x.Budgets)
      .ThenInclude(budget => budget.Transactions
      .Where(transaction => transaction.CreatedDate.Month == currentMonth && transaction.CreatedDate.Year == currentYear)
      .OrderByDescending(transaction => transaction.CreatedDate)
      .Take(10))
      .ThenInclude(x => x.RecurringTransaction);
  }
}
