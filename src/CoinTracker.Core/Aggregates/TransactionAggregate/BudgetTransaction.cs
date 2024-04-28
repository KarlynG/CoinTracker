using Ardalis.SharedKernel;
using CoinTracker.Core.Abstract;
using CoinTracker.Core.Aggregates.RecurringTransactions;
using CoinTracker.Core.Aggregates.UserAggregate;
using CoinTracker.Core.Enums;

namespace CoinTracker.Core.Aggregates.TransactionAggregate;
public class BudgetTransaction : BaseEntity, IAggregateRoot
{
  public Guid BudgetId { get; set; }
  public UserBudget? Budget { get; init; }
  public decimal Amount { get; set; } 
  public Currencies Currency { get; set; } 
  public DateTimeOffset Date { get; set; }
  public string Description { get; set; } = string.Empty;
  public ExpenseCategories Category { get; set; }
  public RecurringTransaction? RecurringTransaction { get; set; }
  public void AddDateTime(DateTimeOffset time)
  {
    Date = time.ToUniversalTime();
  }
  public void UpdateTransaction(BudgetTransaction transactionRequest)
  {
    BudgetTransaction transaction = this;
    transaction.Amount = transactionRequest.Amount;
    transaction.Currency = transactionRequest.Currency;
    transaction.Date = transactionRequest.Date;
    transaction.Description = transactionRequest.Description;
    transaction.Category = transactionRequest.Category;
    transaction.BudgetId = transactionRequest.BudgetId;
    transaction.RecurringTransaction = transactionRequest.RecurringTransaction;
  }
}
