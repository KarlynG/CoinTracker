using CoinTracker.UseCases.Budget.List;
using FastEndpoints;
using FluentValidation;

namespace CoinTracker.Web.Endpoints.Budget;

public class ListValidator : Validator<ListBudgetQuery>
{
  public ListValidator()
  {
    RuleFor(x => x.FirebaseId)
     .NotEmpty()
     .WithMessage("FirebaseId is required.");
  }
}
