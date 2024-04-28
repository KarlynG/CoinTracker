using Ardalis.Result;
using CoinTracker.Core.Interfaces;
using CoinTracker.UseCases.Transaction;
using CoinTracker.UseCases.Transaction.GetAmountSpent;
using CoinTracker.UseCases.Transaction.GetAmountSpent.Dtos;
using FastEndpoints;
using MediatR;

namespace CoinTracker.Web.Endpoints.Transactions;

public class GetAmountSpent(IMediator _mediator, AutoMapper.IMapper mapper, IBudgetService budgetService) : Endpoint<GetAmountSpentRequest, GetCharTransactionsByBudget>
{
  public override void Configure()
  {
    Get(GetAmountSpentRequest.Route);
    Summary(s =>
    {
      s.ExampleRequest = new GetAmountSpentRequest()
      {
        BudgetId = new Guid("075dd712-c019-41b0-006d-08dc48f5e8e6"),
        UserId = new Guid("538c1d67-b1d1-48b9-6cf3-08dc47864b48")
      };
    });
  }
  public override async Task HandleAsync(GetAmountSpentRequest query, CancellationToken cancellationToken)
  {
    try
    {
      var budgetIsAssociatedWithUser = await budgetService.CheckIfBudgetIsAssociatedWithUser(query.BudgetId, query.UserId, cancellationToken);
      if (!budgetIsAssociatedWithUser.Value)
      {
        AddError(x => x.UserId, $"The User: {query.UserId} is not associated with the budget: {query.BudgetId}");
        await SendErrorsAsync(cancellation: cancellationToken);
        return;
      }

      GetAmountSpentQuery transactionQuery = new(query.BudgetId);
      var result = await _mediator.Send(transactionQuery, cancellationToken);

      List<BudgetTransactionDto> transactionsDto = mapper.Map<List<BudgetTransactionDto>>(result.Value);
      GetCharTransactionsByBudget getCharTransactions = new(transactionsDto);
      var resultCharTransactions = Result.Success(getCharTransactions);

      if (result.Status == ResultStatus.NotFound)
      {
        await SendNotFoundAsync(cancellationToken);
        return;
      }
      if (result.Errors.Any())
      {
        AddError(x => x.BudgetId, result.Errors.First());
        await SendErrorsAsync(cancellation: cancellationToken);
        return;
      }
      if (result.IsSuccess)
      {
        Response = resultCharTransactions;
      }
    }
    catch (Exception ex)
    {
      AddError(x => x.BudgetId, ex.Message);
      await SendErrorsAsync(cancellation: cancellationToken);
    }
  }
}
