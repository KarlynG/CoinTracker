using Ardalis.Result;
using Ardalis.SharedKernel;
using CoinTracker.Core.Aggregates.UserAggregate;

namespace CoinTracker.UseCases.Users.Update;
internal class UpdateUserHandler(IRepository<User> repository) : ICommandHandler<UpdateUserCommand, Result<User>>
{
  public async Task<Result<User>> Handle(UpdateUserCommand request, CancellationToken cancellationToken)
  {

    var existingUser = await repository.GetByIdAsync(request.Id, cancellationToken);

    if (existingUser == null)
    {
      return Result.NotFound();
    }

    existingUser.UpdateUser(request.FirstName, request.LastName);
    await repository.UpdateAsync(existingUser, cancellationToken);

    return Result.Success(existingUser);
  }
}
