using Ardalis.Result;
using Ardalis.SharedKernel;
using CoinTracker.Core.Aggregates.TransactionAggregate;

namespace CoinTracker.UseCases.Transaction.GetAmountSpent;
public class GetAmountSpentQuery(Guid budgetId) : IQuery<Result<List<BudgetTransaction>>>
{
  public Guid BudgetId { get; } = budgetId;
}

