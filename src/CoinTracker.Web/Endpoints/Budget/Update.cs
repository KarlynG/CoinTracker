using Ardalis.Result;
using CoinTracker.Core.Aggregates.UserAggregate;
using CoinTracker.Core.Interfaces;
using CoinTracker.UseCases.Budget;
using CoinTracker.UseCases.Budget.Update;
using FastEndpoints;
using MediatR;
using autoMapper = AutoMapper;

namespace CoinTracker.Web.Endpoints.Budget;

public class Update(IMediator mediator, autoMapper.IMapper mapper, IBudgetService budgetService) : Endpoint<UpdateBudgetRequest, BudgetDto>
{
  public override void Configure()
  {
    Put(UpdateBudgetRequest.Route);
  }
  public override async Task HandleAsync(
    UpdateBudgetRequest request,
    CancellationToken cancellationToken)
  {
    try
    {
      var budgetIsAssociatedWithUser = await budgetService.CheckIfBudgetIsAssociatedWithUser(request.BudgetId, request.UserId, cancellationToken);
      if(!budgetIsAssociatedWithUser.Value)
      {
        AddError(x => x.UserId, $"The User: {request.UserId} is not associated with the budget: {request.BudgetId}");
        await SendErrorsAsync(cancellation: cancellationToken);
        return;
      }
      var budget = mapper.Map<UserBudget>(request.Budget);
      var result = await mediator.Send(new UpdateBudgetCommand(budget), cancellationToken);
      if (result.Status == ResultStatus.NotFound)
      {
        AddError(x => x.Budget, $"No budget found with the id: {request.BudgetId}");
        await SendNotFoundAsync(cancellationToken);
        return;
      }
      if (result.IsSuccess)
      {
        Response = mapper.Map<BudgetDto>(result.Value);
      }
    }
    catch (Exception ex)
    {
      AddError(x => x.BudgetId, ex.Message);
      await SendErrorsAsync(cancellation: cancellationToken);
    }
  }
}
