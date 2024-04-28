using CoinTracker.UseCases.Budget;
using CoinTracker.UseCases.Users;

namespace CoinTracker.Web.Endpoints.User;

public class UpdateUserRequest
{
  public const string Route = "User/Update/{userId:Guid}";
  public static string BuildRoute(int userId) => Route.Replace("{userId:Guid}", userId.ToString());
  public Guid UserId { get; set; }
  public string FirstName { get; set; } = string.Empty;
  public string LastName { get; set; } = string.Empty;
}
