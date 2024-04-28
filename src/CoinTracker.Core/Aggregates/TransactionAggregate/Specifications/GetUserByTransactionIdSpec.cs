using Ardalis.Specification;

namespace CoinTracker.Core.Aggregates.TransactionAggregate.Specifications;
public class GetUserByTransactionIdSpec : Specification<BudgetTransaction>, ISingleResultSpecification<BudgetTransaction>
{
  public GetUserByTransactionIdSpec(Guid transactionId)
  {
    Query
      .Where(UserTransaction => UserTransaction.Id == transactionId)
      .Include(x => x.Budget);
  }
}
