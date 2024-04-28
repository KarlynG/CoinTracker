using CoinTracker.Core.Enums;

namespace CoinTracker.Web.Endpoints.Transactions;

public class ListTransactionRequest
{
  public const string Route = "Transaction/Budget/{budgetId:Guid}/User/{firebaseId}";
  public static string BuildRoute(Guid budgetId, string firebaseId)
  {
    _ = Route.Replace("{budgetId:guid}", budgetId.ToString());
    _ = Route.Replace("{firebaseId}", firebaseId);
    return Route;
  }
  public Guid BudgetId { get; init; }
  public string FirebaseId { get; init; } = string.Empty;
  public ExpenseCategories? Category { get; set; }
  public TransactionType? Type { get; set; }
  public int? Skip { get; set; } = 1;
  public int? Take { get; set; } = 10;
}
