using Ardalis.Result;
using Ardalis.SharedKernel;
using CoinTracker.Core.Aggregates.UserAggregate;
using CoinTracker.Core.Aggregates.UserAggregate.Specifications;

namespace CoinTracker.UseCases.Budget.Delete;
public class DeleteBudgetHandler(IRepository<User> repository) : ICommandHandler<DeleteBudgetCommand, Result>
{
  public async Task<Result> Handle(DeleteBudgetCommand request, CancellationToken cancellationToken)
  {
    GetUserByBudgetId spec = new(request.UserId);

    var existingUser = await repository.FirstOrDefaultAsync(spec, cancellationToken);

    if (!existingUser!.Budgets.Any(x => x.Id == request.BudgetId))
    {
      return Result.NotFound();
    }
    existingUser.DeleteBudget();
    await repository.UpdateAsync(existingUser, cancellationToken);
    return Result.Success();
  }
}
