using Ardalis.Result;
using Ardalis.SharedKernel;
using CoinTracker.Core.Aggregates.UserAggregate;

namespace CoinTracker.UseCases.Users.Update;
public class UpdateUserCommand(Guid id, string firstName, string lastName) : ICommand<Result<User>>  
{
  public Guid Id { get; set; } = id;
  public string FirstName { get; set; } = firstName;
  public string LastName { get; set; } = lastName;
}
