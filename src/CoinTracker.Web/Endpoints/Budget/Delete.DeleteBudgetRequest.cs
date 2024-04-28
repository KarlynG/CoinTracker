namespace CoinTracker.Web.Endpoints.Budget;

public record DeleteBudgetRequest
{
  public const string Route = "Budget/{BudgetId:guid}/User/{UserId:Guid}";
  public static string BuildRoute(Guid budgetId, Guid userId)
  {
    _ = Route.Replace("{BudgetId:guid}", budgetId.ToString());
    _ = Route.Replace("{UserId:guid}", userId.ToString());
    return Route;
  }
  public Guid BudgetId { get; set; }
  public Guid UserId { get; set; }
}
