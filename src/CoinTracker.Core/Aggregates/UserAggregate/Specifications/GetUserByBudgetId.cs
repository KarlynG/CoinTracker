using Ardalis.Specification;

namespace CoinTracker.Core.Aggregates.UserAggregate.Specifications;
public class GetUserByBudgetId : Specification<User>, ISingleResultSpecification<User>
{
  public GetUserByBudgetId(Guid userId)
  {
    Query.Where(x => x.Id == userId).Include(x => x.Budgets);
  }
}
