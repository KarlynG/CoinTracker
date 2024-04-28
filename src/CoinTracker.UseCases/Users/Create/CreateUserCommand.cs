using Ardalis.Result;
using Ardalis.SharedKernel;
using CoinTracker.Core.Aggregates.UserAggregate;

namespace CoinTracker.UseCases.Users.Create;
/// <summary>
/// Create a new User.
/// </summary>
/// <param name="FirebaseId"></param>
/// /// <param name="Name"></param>
public record CreateUserCommand(string FirebaseId, string Name, string? LastName) : ICommand<Result<User>>;
