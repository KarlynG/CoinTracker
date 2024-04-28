using Ardalis.Result;
using Ardalis.SharedKernel;
using CoinTracker.Core.Aggregates.UserAggregate;
using CoinTracker.Core.Aggregates.UserAggregate.Specifications;
using CoinTracker.Core.Interfaces;

namespace CoinTracker.UseCases.Users.Delete;
public class DeleteUserHandler(IRepository<User> repository, IFirebaseAuthService firebaseAuthService) : ICommandHandler<DeleteUserCommand, Result>
{
  public async Task<Result> Handle(DeleteUserCommand request, CancellationToken cancellationToken)
  {
    var spec = new GetUserByFirebaseId(request.FirebaseId);
    var existingUser = await repository.FirstOrDefaultAsync(spec, cancellationToken);
    if (existingUser == null)
    {
      return Result.NotFound();
    }
    await firebaseAuthService.DeleteUser(existingUser.FirebaseId, cancellationToken);
    await repository.DeleteAsync(existingUser, cancellationToken);
    return Result.Success();
  }
}
