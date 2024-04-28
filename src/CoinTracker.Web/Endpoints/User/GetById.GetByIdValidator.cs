using CoinTracker.Infrastructure.Data.Config;
using FastEndpoints;
using FluentValidation;

namespace CoinTracker.Web.Endpoints.User;

public class GetByIdValidator : Validator<GetByIdUserRequest>
{
  public GetByIdValidator()
  {
    RuleFor(x => x.FirebaseId)
    .NotEmpty()
    .WithMessage("FirebaseId is required.")
    .MinimumLength(28)
    .MaximumLength(DataSchemaConstants.DEFAULT_NAME_LENGTH);
  }
}
