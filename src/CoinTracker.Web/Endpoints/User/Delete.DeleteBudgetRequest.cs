namespace CoinTracker.Web.Endpoints.User;

public record DeleteUserRequest
{
  public const string Route = "User/{FirebaseId}";
  public static string BuildRoute(string firebaseId) => Route.Replace("{FirebaseId}", firebaseId);
  public string FirebaseId { get; set; } = string.Empty;
}
