namespace CoinTracker.Web.Endpoints.User;

public class ListUserRequest
{
  public const string Route = "User";
  public int? Skip { get; set; } = 1;
  public int? Take { get; set; } = 10;
}
