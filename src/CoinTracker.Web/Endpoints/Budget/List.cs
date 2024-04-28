using Ardalis.Result;
using CoinTracker.Core.Abstract;
using CoinTracker.UseCases.Budget;
using CoinTracker.UseCases.Budget.List;
using FastEndpoints;
using MediatR;

namespace CoinTracker.Web.Endpoints.Budget;

public class List(IMediator mediator, AutoMapper.IMapper mapper) : Endpoint<ListBudgetQuery, BasePaginatedResponse<BudgetDto>>
{
  public override void Configure()
  {
    Get(ListBudgetQuery.Route);
  }

  public override async Task HandleAsync(ListBudgetQuery query, CancellationToken cancellationToken)
  {
    try
    {
      var result = await mediator.Send(query, cancellationToken);

      if (result.Status == ResultStatus.NotFound)
      {
        AddError(x => x.FirebaseId, $"No user found with the id: {query.FirebaseId}");
        await SendErrorsAsync(cancellation: cancellationToken);
        return;
      }
      if (result.Errors.Any())
      {
        AddError(x => x.FirebaseId, result.Errors.First());
        await SendErrorsAsync(cancellation: cancellationToken);
        return;
      }
      if (result.IsSuccess)
      {
        var budgetDtoResult = mapper.Map<BasePaginatedResponse<BudgetDto>>(result.Value);
        Response = budgetDtoResult;
      }
    }
    catch (Exception ex)
    {
      AddError(x => x.FirebaseId, ex.Message);
      await SendErrorsAsync(cancellation: cancellationToken);
    }
  }
}
