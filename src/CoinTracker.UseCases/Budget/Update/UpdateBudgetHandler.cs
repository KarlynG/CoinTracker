using Ardalis.Result;
using Ardalis.SharedKernel;
using CoinTracker.Core.Aggregates.UserAggregate;
using CoinTracker.Core.Aggregates.UserAggregate.Specifications;

namespace CoinTracker.UseCases.Budget.Update;
public class UpdateBudgetHandler(IRepository<User> repository)
  : ICommandHandler<UpdateBudgetCommand, Result<UserBudget>>
{
  public async Task<Result<UserBudget>> Handle(UpdateBudgetCommand request, CancellationToken cancellationToken)
  {
    GetUserByBudgetId spec = new(request.Budget.UserId);

    var existingUser = await repository.FirstOrDefaultAsync(spec, cancellationToken);

    if (!existingUser!.Budgets.Any(x => x.Id == request.Budget.Id))
    {
      return Result.NotFound();
    }
    existingUser.UpdateBudget(request.Budget);
    await repository.UpdateAsync(existingUser, cancellationToken);

    return Result.Success(existingUser.Budgets.FirstOrDefault()!);
  }
}
