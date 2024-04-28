using FastEndpoints;
using FluentValidation;

namespace CoinTracker.Web.Endpoints.User;

public class DeleteUserValidator : Validator<DeleteUserRequest>
{
  public DeleteUserValidator()
  {
    RuleFor(x => x.FirebaseId)
      .NotEmpty();
  }
}
