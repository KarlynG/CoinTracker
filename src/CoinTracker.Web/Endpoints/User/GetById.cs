using Ardalis.Result;
using CoinTracker.UseCases.Users;
using CoinTracker.UseCases.Users.GetById;
using FastEndpoints;
using MediatR;
using autoMapper = AutoMapper;

namespace CoinTracker.Web.Endpoints.User;

public class GetById(IMediator _mediator, autoMapper.IMapper mapper) : Endpoint<GetByIdUserRequest, UserDto>
{
  public override void Configure()
  {
    Get(GetByIdUserRequest.Route);
  }

  public override async Task HandleAsync(GetByIdUserRequest request, CancellationToken cancellationToken)
  {
    try
    {

      var result = await _mediator.Send(new GetByIdUserCommand(request.FirebaseId), cancellationToken);

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

      var user = mapper.Map<UserDto>(result.Value);

      if (result.IsSuccess)
      {
        Response = user;
      }
    }
    catch (Exception ex)
    {
      AddError(ex.Message);
      await SendErrorsAsync(cancellation: cancellationToken);
    }
  }
}
