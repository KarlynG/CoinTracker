using Ardalis.Result;
using CoinTracker.Core.Interfaces;
using CoinTracker.UseCases.Budget.Delete;
using FastEndpoints;
using MediatR;

namespace CoinTracker.Web.Endpoints.Budget;

public class Delete(IMediator mediator, IBudgetService budgetService) : Endpoint<DeleteBudgetRequest>
{
  public override void Configure()
  {
    Delete(DeleteBudgetRequest.Route);
  }

  public override async Task HandleAsync(
    DeleteBudgetRequest request,
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
      var command = new DeleteBudgetCommand(request.BudgetId, request.UserId);
      var result = await mediator.Send(command, cancellationToken);

      if (result.Status == ResultStatus.NotFound)
      {
        await SendNotFoundAsync(cancellationToken);
        return;
      }

      if (result.IsSuccess)
      {
        await SendNoContentAsync(cancellationToken);
      };
    }
    catch (Exception ex)
    {
      AddError(x => x.BudgetId, ex.Message);
      await SendErrorsAsync(cancellation: cancellationToken);
    }
  }
}
