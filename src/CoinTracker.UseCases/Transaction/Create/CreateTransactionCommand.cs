using Ardalis.Result;
using Ardalis.SharedKernel;
using CoinTracker.Core.Aggregates.TransactionAggregate;

namespace CoinTracker.UseCases.Transaction.Create;
public class CreateTransactionCommand : ICommand<Result<BudgetTransaction>>
{
  public BudgetTransaction Transaction { get; init; } = new();
}
