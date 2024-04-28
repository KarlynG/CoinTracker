

namespace CoinTracker.Web.Endpoints.User;

public class GetByIdUserRequest
{
  public const string Route = "User/{firebaseId}";
  public static string BuildRoute(string firebaseId) => Route.Replace("{firebaseId}", firebaseId);
  public string FirebaseId { get; init; } = string.Empty;
}
