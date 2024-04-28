using CoinTracker.Infrastructure.Data.Config;
using FastEndpoints;
using FluentValidation;

namespace CoinTracker.Web.Endpoints.User;

public class CreateUserValidator : Validator<CreateUserRequest>
{
  public CreateUserValidator()
  {
    RuleFor(x => x.FirebaseId)
     .NotEmpty()
     .WithMessage("FirebaseId is required.")
     .MinimumLength(28)
     .MaximumLength(DataSchemaConstants.DEFAULT_NAME_LENGTH);

    RuleFor(x => x.Name)
      .NotEmpty()
      .WithMessage("Name is required.")
      .MinimumLength(2)
      .MaximumLength(DataSchemaConstants.DEFAULT_NAME_LENGTH);
  }
}

