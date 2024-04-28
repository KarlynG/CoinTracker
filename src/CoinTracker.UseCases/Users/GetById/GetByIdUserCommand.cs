using Ardalis.Result;
using Ardalis.SharedKernel;
using CoinTracker.Core.Aggregates.UserAggregate;

namespace CoinTracker.UseCases.Users.GetById;
public class GetByIdUserCommand(string firebaseId) : ICommand<Result<User>>
{
  public string FirebaseId { get; } = firebaseId;
}
