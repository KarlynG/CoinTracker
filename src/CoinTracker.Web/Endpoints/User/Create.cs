using Ardalis.Result;
using CoinTracker.Core.Interfaces;
using CoinTracker.UseCases.Users;
using CoinTracker.UseCases.Users.Create;
using FastEndpoints;
using FirebaseAdmin.Auth;
using MediatR;
using autoMapper = AutoMapper;

namespace CoinTracker.Web.Endpoints.User;
public class Create(IMediator mediator, autoMapper.IMapper mapper, IFirebaseAuthService firebase) : Endpoint<CreateUserRequest, UserDto>
{
  public override void Configure()
  {
    Post("User");
  }
  
  public override async Task HandleAsync(
    CreateUserRequest request,
    CancellationToken cancellationToken)
  {
    try
    {
      // Validate FirebaseId exists
      Result<UserRecord> firebaseUser = await firebase.GetUser(request.FirebaseId);
      if(firebaseUser.Errors.Any())
      {
        AddError(x => x.FirebaseId, $"The User with the firebaseID: {request.FirebaseId} was not found");
        await SendErrorsAsync(cancellation: cancellationToken);
        return;
      }
      var result = await mediator.Send(new CreateUserCommand(request.FirebaseId!,
      request.Name, request.LastName), cancellationToken);

      if (result.IsSuccess)
      {
        Response = mapper.Map<UserDto>(result.Value);
      }
    }
    catch (Exception ex)
    {
      AddError(x => x.FirebaseId, ex.Message);
      await SendErrorsAsync(cancellation: cancellationToken);
    }
  }
}
