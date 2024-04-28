using Ardalis.Result;
using Ardalis.SharedKernel;
using CoinTracker.Core.Aggregates.UserAggregate;

namespace CoinTracker.UseCases.Budget.GetById;
public class GetBudgetByIdQuery : IQuery<Result<UserBudget>>
{
  public const string Route = "Budget/{budgetId:Guid}/User/{firebaseId}";
  public static string BuildRoute(string firebaseId) => Route.Replace("{firebaseId}", firebaseId);
  public string FirebaseId { get; set; } = string.Empty;
  public Guid BudgetId { get; set; }
}
