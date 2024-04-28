namespace CoinTracker.UseCases.Users;
public class UserDto
{
  public Guid Id { get; set; }
  public string FirebaseId { get; set; } = string.Empty;
  public string Name { get; set; } = string.Empty;
  public string LastName { get; set; } = string.Empty;
  public decimal TotalSpentMonth { get; set; }
  public decimal TotalSpentYear { get; set; }
  public decimal TotalSpentEver { get; set; }
}
