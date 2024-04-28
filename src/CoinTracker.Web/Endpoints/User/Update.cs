using Ardalis.Result;
using CoinTracker.UseCases.Users;
using CoinTracker.UseCases.Users.Update;
using FastEndpoints;
using MediatR;
using autoMapper = AutoMapper;

namespace CoinTracker.Web.Endpoints.User;

public class Update(IMediator mediator, autoMapper.IMapper mapper) : Endpoint<UpdateUserRequest, UserDto>
{
  public override void Configure()
  {
    Put(UpdateUserRequest.Route);
  }

  public override async Task HandleAsync(UpdateUserRequest request, CancellationToken cancellationToken)
  {
    try
    {

      var result = await mediator.Send(new UpdateUserCommand(request.UserId, request.FirstName, request.LastName), cancellationToken);
      if (result.Status == ResultStatus.NotFound)
      {
        AddError(x => x.UserId, $"No user found with the id: {request.UserId}");
        await SendNotFoundAsync(cancellationToken);
        return;
      }
      if (result.IsSuccess)
      {
        Response = mapper.Map<UserDto>(result.Value);
      }
    }
    catch (Exception ex)
    {
      AddError(x => x.UserId, ex.Message);
      await SendErrorsAsync(cancellation: cancellationToken);
    }
  }
}
