using CoinTracker.UseCases.Budget;

namespace CoinTracker.Web.Endpoints.Budget;

public class UpdateBudgetRequest
{
  public const string Route = "Budget/{BudgetId:Guid}";
  public static string BuildRoute(int budgetId) => Route.Replace("{budgetId:Guid}", budgetId.ToString());
  public Guid BudgetId { get; set; }
  public Guid UserId { get; set; }
  public BudgetDto Budget { get; set; } = new();
}
