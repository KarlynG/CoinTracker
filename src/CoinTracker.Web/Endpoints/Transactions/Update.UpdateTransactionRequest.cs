using CoinTracker.UseCases.Transaction;

namespace CoinTracker.Web.Endpoints.Transactions;

public class UpdateTransactionRequest
{
  public const string Route = "Transaction/{TransactionId:Guid}";
  public static string BuildRoute(int budgetId) => Route.Replace("{TransactionId:Guid}", budgetId.ToString());
  public Guid TransactionId { get; set; }
  public Guid UserId { get; set; }
  public BudgetTransactionDto Transaction { get; set; } = new();
}
