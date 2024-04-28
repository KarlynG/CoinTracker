namespace CoinTracker.Web.Endpoints.Transactions;

public class GetAmountSpentRequest
{
  public const string Route = "Transaction/Char/Budget/{budgetId:Guid}";
  public static string BuildRoute(Guid budgetId) => Route.Replace("{budgetId:Guid}", budgetId.ToString());
  public Guid BudgetId { get; init; }
  public Guid UserId { get; init; }
}
