using Ardalis.Specification;

namespace CoinTracker.Core.Aggregates.UserAggregate.Specifications;
public class GetUserByFirebaseId : Specification<User>, ISingleResultSpecification<User>
{
  public GetUserByFirebaseId(string firebaseId)
  {
    Query.Where(x => x.FirebaseId == firebaseId);
  }
}
