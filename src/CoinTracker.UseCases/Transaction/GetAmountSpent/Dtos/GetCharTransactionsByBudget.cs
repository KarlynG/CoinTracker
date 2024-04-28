using CoinTracker.Core.Aggregates.TransactionAggregate;

namespace CoinTracker.UseCases.Transaction.GetAmountSpent.Dtos;
public class GetCharTransactionsByBudget
{
  public GetCharTransactionsByBudget(List<BudgetTransactionDto> transactions)
  {
    Transactions = transactions;
    TotalTransactionsAmount = Transactions.Sum(x => x.Amount);
  }
  public decimal TotalTransactionsAmount { get; set; }
  public ICollection<BudgetTransactionDto> Transactions { get; set; }
}
