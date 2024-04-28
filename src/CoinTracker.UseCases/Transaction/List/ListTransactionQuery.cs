using CoinTracker.Core.Abstract;
using CoinTracker.Core.Aggregates.TransactionAggregate;
using CoinTracker.Core.Enums;

namespace CoinTracker.UseCases.Transaction.List;
public class ListTransactionQuery(Guid budgetId, ExpenseCategories? category, TransactionType? type) : BaseListQuery<BudgetTransaction>
{
  public Guid BudgetId { get; } = budgetId;
  public ExpenseCategories? Category { get; } = category;
  public TransactionType? Type { get; set; } = type;
}
