using Ardalis.Result;
using CoinTracker.Core.Aggregates.TransactionAggregate;
using CoinTracker.Core.Interfaces;
using CoinTracker.UseCases.Transaction;
using CoinTracker.UseCases.Transaction.Update;
using FastEndpoints;
using MediatR;

namespace CoinTracker.Web.Endpoints.Transactions;

public class Update(IMediator mediator, AutoMapper.IMapper mapper, ITransactionService transactionService) : Endpoint<UpdateTransactionRequest, BudgetTransactionDto>
{
  public override void Configure()
  {
    Put(UpdateTransactionRequest.Route);
  }
  public override async Task HandleAsync(
    UpdateTransactionRequest request,
    CancellationToken cancellationToken)
  {
    try
    {
      var TransactionIsAssociatedWithUser = await transactionService.CheckIfTransactionIsAssociatedWithUser(request.TransactionId, request.UserId, cancellationToken);
      if (!TransactionIsAssociatedWithUser.Value)
      {
        AddError(x => x.UserId, $"The User: {request.UserId} is not associated with the Transaction: {request.TransactionId}");
        await SendErrorsAsync(cancellation: cancellationToken);
        return;
      }
      var Transaction = mapper.Map<BudgetTransaction>(request.Transaction);
      var result = await mediator.Send(new UpdateTransactionCommand(Transaction), cancellationToken);
      if (result.Status == ResultStatus.NotFound)
      {
        AddError(x => x.Transaction, $"No Transaction found with the id: {request.TransactionId}");
        await SendNotFoundAsync(cancellationToken);
        return;
      }
      if (result.IsSuccess)
      {
        Response = mapper.Map<BudgetTransactionDto>(result.Value);
      }
    }
    catch (Exception ex)
    {
      AddError(x => x.TransactionId, ex.Message);
      await SendErrorsAsync(cancellation: cancellationToken);
    }
  }
}
