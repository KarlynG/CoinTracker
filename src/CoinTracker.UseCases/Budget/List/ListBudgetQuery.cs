using CoinTracker.Core.Abstract;
using CoinTracker.Core.Aggregates.UserAggregate;
using CoinTracker.Core.Enums;

namespace CoinTracker.UseCases.Budget.List;
public class ListBudgetQuery : BaseListQuery<UserBudget>
{
  public const string Route = "Budget/{FirebaseId}";
  public static string BuildRoute(string firebaseId) => Route.Replace("{FirebaseId}", firebaseId);
  public string FirebaseId { get; set; } = string.Empty;
  public Currencies? Currency { get; set; }
}
