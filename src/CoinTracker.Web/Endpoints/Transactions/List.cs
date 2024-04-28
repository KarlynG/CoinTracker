using Ardalis.Result;
using CoinTracker.Core.Abstract;
using CoinTracker.Core.Interfaces;
using CoinTracker.UseCases.Transaction;
using CoinTracker.UseCases.Transaction.List;
using FastEndpoints;
using MediatR;

namespace CoinTracker.Web.Endpoints.Transactions;

public class List(IMediator _mediator, IBudgetService budgetService, AutoMapper.IMapper mapper) : Endpoint<ListTransactionRequest, BasePaginatedResponse<BudgetTransactionDto>>
{
  public override void Configure()
  {
    Get(ListTransactionRequest.Route);
    Summary(s =>
    {
      s.ExampleRequest = new ListTransactionRequest()
      {
        BudgetId = new Guid("075dd712-c019-41b0-006d-08dc48f5e8e6"),
        FirebaseId = ""
      };
    });
  }
  public override async Task HandleAsync(ListTransactionRequest query, CancellationToken cancellationToken)
  {
    try
    {
      var budgetIsAssociatedWithUser = await budgetService.CheckIfBudgetIsAssociatedWithUser(query.BudgetId, query.FirebaseId, cancellationToken);
      if (!budgetIsAssociatedWithUser.Value)
      {
        AddError(x => x.FirebaseId, $"The User: {query.FirebaseId} is not associated with the budget: {query.BudgetId}");
        await SendErrorsAsync(cancellation: cancellationToken);
        return;
      }

      ListTransactionQuery transactionQuery =
        new(query.BudgetId, query.Category, query.Type) { Skip = query.Skip, Take = query.Take };
      var result = await _mediator.Send(transactionQuery, cancellationToken);

      if (result.Errors.Any())
      {
        AddError(x => x.BudgetId, result.Errors.First());
        await SendErrorsAsync(cancellation: cancellationToken);
        return;
      }
      if (result.IsSuccess)
      {
        var transactionsResponseDto = mapper.Map<BasePaginatedResponse<BudgetTransactionDto>>(result.Value);
        Response = transactionsResponseDto;
      }
    }
    catch (Exception ex)
    {
      AddError(x => x.BudgetId, ex.Message);
      await SendErrorsAsync(cancellation: cancellationToken);
    }
  }
}
