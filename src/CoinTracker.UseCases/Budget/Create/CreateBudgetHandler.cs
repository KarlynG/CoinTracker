using Ardalis.Result;
using Ardalis.SharedKernel;
using Ardalis.Specification;
using CoinTracker.Core.Aggregates.UserAggregate;
using CoinTracker.Core.Aggregates.UserAggregate.Specifications;

namespace CoinTracker.UseCases.Budget.Create;
public class CreateBudgetHandler(IRepository<User> repository)
  : ICommandHandler<CreateBudgetCommand, Result<UserBudget>>
{
  public async Task<Result<UserBudget>> Handle(CreateBudgetCommand request, CancellationToken cancellationToken)
  {
    var spec = new GetUserByFirebaseId(request.FirebaseId);
    var user = await repository.FirstOrDefaultAsync(spec, cancellationToken);
    if (user == null)
    {
      return Result.NotFound();
    }
    user.AddBudget(request.FullAmount, request.Currency, request.Name, request.Limit, request.LimitPeriod);
    await repository.UpdateAsync(user, cancellationToken);

    return user.Budgets.First();
  }
}
