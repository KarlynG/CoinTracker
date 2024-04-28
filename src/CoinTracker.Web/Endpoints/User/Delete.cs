using Ardalis.Result;
using CoinTracker.UseCases.Users.Delete;
using FastEndpoints;
using MediatR;

namespace CoinTracker.Web.Endpoints.User;

public class Delete(IMediator mediator) : Endpoint<DeleteUserRequest>
{
  public override void Configure()
  {
    Delete(DeleteUserRequest.Route);
  }

  public override async Task HandleAsync(
    DeleteUserRequest request,
    CancellationToken cancellationToken)
  {
    try
    {
      var command = new DeleteUserCommand(request.FirebaseId);
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
      AddError(ex.Message);
      await SendErrorsAsync(cancellation: cancellationToken);
    }
  }
}
