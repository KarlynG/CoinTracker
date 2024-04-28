using Ardalis.Result;
using Ardalis.SharedKernel;
using CoinTracker.Core.Abstract;
using CoinTracker.Core.Aggregates.UserAggregate;

namespace CoinTracker.UseCases.Users.List;
public class ListUserQueryHandler(IReadRepository<User> repository) : IQueryHandler<ListUserQuery, Result<BasePaginatedResponse<User>>>
{
  public async Task<Result<BasePaginatedResponse<User>>> Handle(ListUserQuery request, CancellationToken cancellationToken)
  {
    try
    {
      var result = await repository.ListAsync(cancellationToken);

      if (result.Count == 0)
      {
        return Result.NotFound();
      }

      var response = new BasePaginatedResponse<User>(request.Skip, request.Take, result, repository.CountAsync(cancellationToken).Result);
      return response;
    }
    catch (Exception ex)
    {
      return Result.Error(ex.Message);

    }
  }
}
