using Ardalis.Result;
using Ardalis.SharedKernel;
using CoinTracker.Core.Aggregates.UserAggregate;
using CoinTracker.Core.Aggregates.UserAggregate.Specifications;

namespace CoinTracker.UseCases.Users.GetById;
public class GetUserByIdHandler(IReadRepository<User> repository) : ICommandHandler<GetByIdUserCommand, Result<User>>
{
  public async Task<Result<User>> Handle(GetByIdUserCommand request, CancellationToken cancellationToken)
  {
    try
    {
      var spec = new GetUserByFirebaseId(request.FirebaseId);
      var result = await repository.FirstOrDefaultAsync(spec, cancellationToken);

      if (result == null)
      {
        return Result.NotFound();
      }

      var response = new Result<User>(result);
      return response;
    }
    catch (Exception)
    {

      throw;
    }
  }
}
