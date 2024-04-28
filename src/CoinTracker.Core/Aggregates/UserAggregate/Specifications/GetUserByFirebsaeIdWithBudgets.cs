using Ardalis.Specification;

namespace CoinTracker.Core.Aggregates.UserAggregate.Specifications;
public class GetUserByFirebaseIdWithBudgets : Specification<User>, ISingleResultSpecification<User>
{
  public GetUserByFirebaseIdWithBudgets(string firebaseId)
  {
    Query.Where(x => x.FirebaseId == firebaseId).Include(x => x.Budgets);
  }
}
