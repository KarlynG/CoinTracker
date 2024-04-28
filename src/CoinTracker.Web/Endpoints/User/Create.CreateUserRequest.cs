using System.ComponentModel.DataAnnotations;

namespace CoinTracker.Web.Endpoints.User;

public class CreateUserRequest
{
  [Required]
  public string FirebaseId { get; set; } = string.Empty;
  public string Name { get; set; } = string.Empty;
  public string? LastName { get; set; }
}
