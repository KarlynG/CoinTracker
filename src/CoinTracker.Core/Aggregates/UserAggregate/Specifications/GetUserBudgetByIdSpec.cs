using Ardalis.Specification;

namespace CoinTracker.Core.Aggregates.UserAggregate.Specifications;
public class GetUserBudgetByIdSpec : Specification<User>, ISingleResultSpecification<User>
{
  public GetUserBudgetByIdSpec(string firebaseId, Guid budgetId)
  {
    Query
    .Where(x => x.FirebaseId == firebaseId)
    .Include(x => x.Budgets.Where(budget => budget.Id == budgetId))
    .ThenInclude(budget => budget.Transactions);
  }
}
