using CoinTracker.Core.Enums;

namespace CoinTracker.UseCases.Transaction.Create.Dtos;
public class CreateTransactionDto
{
  public Guid BudgetId { get; set; }
  public Guid UserId { get; set; }
  public decimal Amount { get; set; }
  public DateTimeOffset? Date { get; set; }
  public string Description { get; set; } = string.Empty;
  public ExpenseCategories Category { get; set; }
  public RecurringTransactionDto? RecurringTransaction { get; set; }
}
