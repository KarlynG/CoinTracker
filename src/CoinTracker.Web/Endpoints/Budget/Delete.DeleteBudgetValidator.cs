using FastEndpoints;
using FluentValidation;

namespace CoinTracker.Web.Endpoints.Budget;

public class DeleteBudgetValidator : Validator<DeleteBudgetRequest>
{
  public DeleteBudgetValidator()
  {
    RuleFor(x => x.BudgetId)
      .NotEmpty();
  }
}
