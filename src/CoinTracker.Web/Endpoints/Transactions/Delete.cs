using Ardalis.Result;
using CoinTracker.Core.Interfaces;
using CoinTracker.UseCases.Transaction.Delete;
using FastEndpoints;
using MediatR;

namespace CoinTracker.Web.Endpoints.Transactions;

public class Delete(IMediator mediator) : Endpoint<DeleteTransactionRequest>
{
  public override void Configure()
  {
    Delete(DeleteTransactionRequest.Route);
  }

  public override async Task HandleAsync(
    DeleteTransactionRequest request,
    CancellationToken cancellationToken)
  {
    try
    {
      var command = new DeleteTransactionCommand(request.TransactionId);
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
      AddError(x => x.TransactionId, ex.Message);
      await SendErrorsAsync(cancellation: cancellationToken);
    }
  }
}

