using Ardalis.Result;
using Ardalis.SharedKernel;
using CoinTracker.Core.Aggregates.UserAggregate;
using CoinTracker.Core.Aggregates.UserAggregate.Specifications;

namespace CoinTracker.UseCases.Users.Create;
public class CreateUserHandler(IRepository<User> repository)
  : ICommandHandler<CreateUserCommand, Result<User>>
{
  public async Task<Result<User>> Handle(CreateUserCommand request,
    CancellationToken cancellationToken)
  {
    GetUserByFirebaseId spec = new(request.FirebaseId);
    var userExist = await repository.FirstOrDefaultAsync(spec, cancellationToken);
    if (userExist != null)
      return userExist;

    var newUser = new User(request.FirebaseId, request.Name);
    if (!string.IsNullOrEmpty(request.LastName))
    {
      newUser.SetLastName(request.LastName);
    }
    var createdItem = await repository.AddAsync(newUser, cancellationToken);

    return createdItem;
  }
}
