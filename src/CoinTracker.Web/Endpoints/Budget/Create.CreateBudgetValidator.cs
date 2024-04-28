using CoinTracker.UseCases.Budget.Create;
using FastEndpoints;
using FluentValidation;

namespace CoinTracker.Web.Endpoints.Budget;

public class CreateBudgetValidator : Validator<CreateBudgetCommand>
{
  public CreateBudgetValidator()
  {
    RuleFor(x => x.FirebaseId)
     .NotEmpty()
     .WithMessage("FirebaseId is required.");

    RuleFor(x => x.FullAmount)
      .NotEmpty()
      .WithMessage("FullAmount is required.");

    RuleFor(x => x.Currency)
      .NotNull()
      .WithMessage("Currency is required.");

    RuleFor(x => x.Name)
      .NotEmpty()
      .WithMessage("Name is required.");

    RuleFor(x => x.LimitPeriod)
      .NotNull()
      .WithMessage("LimitPeriod is required.");
  }
}
