using Ardalis.Result;
using CoinTracker.Core.Abstract;
using CoinTracker.UseCases.Users.List;
using FastEndpoints;
using MediatR;

namespace CoinTracker.Web.Endpoints.User;

public class List(IMediator _mediator) : Endpoint<ListUserRequest, BasePaginatedResponse<CoinTracker.Core.Aggregates.UserAggregate.User>>
{
  public override void Configure()
  {
    Get(ListUserRequest.Route);
  }

  public override async Task HandleAsync(ListUserRequest query, CancellationToken cancellationToken)
  {
    try
    { 
      ListUserQuery listUserQuery = new() { Skip = query.Skip, Take = query.Take };

      var result = await _mediator.Send(listUserQuery, cancellationToken);

      if (result.Status == ResultStatus.NotFound)
      {
        await SendNotFoundAsync(cancellationToken);
        return;
      }
      if (result.Errors.Any())
      {
        AddError(result.Errors.First());
        await SendErrorsAsync(cancellation: cancellationToken);
        return;
      }
      if (result.IsSuccess)
      {
        Response = result.Value;
      }
    }
    catch (Exception ex)
    {
      AddError(ex.Message);
      await SendErrorsAsync(cancellation: cancellationToken);
    }
  }
}
