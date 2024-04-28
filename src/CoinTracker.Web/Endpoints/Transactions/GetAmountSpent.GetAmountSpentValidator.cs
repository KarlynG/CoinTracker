using FastEndpoints;
using FluentValidation;

namespace CoinTracker.Web.Endpoints.Transactions;

public class GetAmountSpentValidator : Validator<GetAmountSpentRequest>
{
  public GetAmountSpentValidator()
  {
    RuleFor(x => x.UserId)
     .NotEmpty()
     .WithMessage("UserId is required.");

    RuleFor(x => x.BudgetId)
     .NotEmpty()
     .WithMessage("BudgetId is required.");
  }
}
