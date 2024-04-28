using CoinTracker.Core.Enums;
using CoinTracker.UseCases.Transaction.Create.Dtos;

namespace CoinTracker.UseCases.Transaction;
public class BudgetTransactionDto : CreateTransactionDto
{
  public Guid Id { get; init; }
  public Currencies Currency { get; init; }
  public TransactionType Type { get; init; }
}
