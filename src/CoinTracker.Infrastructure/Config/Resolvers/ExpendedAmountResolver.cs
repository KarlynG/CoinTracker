using AutoMapper;
using CoinTracker.Core.Aggregates.UserAggregate;
using CoinTracker.UseCases.Budget;

namespace CoinTracker.Infrastructure.Config.Resolvers;
public class ExpendedAmountResolver : IValueResolver<UserBudget, BudgetDto, decimal>
{
  public decimal Resolve(UserBudget source, BudgetDto destination, decimal destMember, ResolutionContext context)
  {
    if (source.Transactions == null)
      return 0;

    return source.Transactions.Sum(transaction => transaction.Amount);
  }
}
