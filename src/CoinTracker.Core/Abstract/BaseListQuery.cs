using Ardalis.Result;
using Ardalis.SharedKernel;

namespace CoinTracker.Core.Abstract;
public class BaseListQuery<TEntity> : IQuery<Result<BasePaginatedResponse<TEntity>>>
{
  public int? Skip { get; set; } = 1;
  public int? Take { get; set; } = 10;
}
