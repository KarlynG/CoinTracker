using FastEndpoints;
using FluentValidation;

namespace CoinTracker.Web.Endpoints.Budget;

public class UpdateBudgetValidator : Validator<UpdateBudgetRequest>
{
  public UpdateBudgetValidator()
  {
    RuleFor(x => x.Budget)
     .NotEmpty()
     .WithMessage("Budget is required.");

    RuleFor(x => x.Budget.Id)
      .NotEmpty()
      .WithMessage("BudgetId is required.");

    RuleFor(x => x.Budget.FullAmount)
      .NotEmpty()
      .WithMessage("FullAmount is required.");

    RuleFor(x => x.Budget.Currency)
      .NotNull()
      .WithMessage("Currency is required.");

    RuleFor(x => x.Budget.Name)
      .NotEmpty()
      .WithMessage("Name is required.");

    RuleFor(x => x.Budget.LimitPeriod)
      .NotNull()
      .WithMessage("LimitPeriod is required.");
  }
}
