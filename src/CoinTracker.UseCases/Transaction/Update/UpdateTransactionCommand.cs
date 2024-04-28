using Ardalis.Result;
using Ardalis.SharedKernel;
using CoinTracker.Core.Aggregates.TransactionAggregate;

namespace CoinTracker.UseCases.Transaction.Update;

public class UpdateTransactionCommand(BudgetTransaction transaction) : ICommand<Result<BudgetTransaction>>
{
  public BudgetTransaction Transaction { get; set; } = transaction;
}
