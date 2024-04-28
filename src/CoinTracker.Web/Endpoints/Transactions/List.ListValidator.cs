using CoinTracker.UseCases.Transaction.List;
using FastEndpoints;
using FluentValidation;

namespace CoinTracker.Web.Endpoints.Transactions;

public class ListValidator : Validator<ListTransactionRequest>
{
  public ListValidator()
  {
    RuleFor(x => x.FirebaseId)
     .NotEmpty()
     .WithMessage("FirebaseId is required.");

    RuleFor(x => x.BudgetId)
     .NotEmpty()
     .WithMessage("BudgetId is required.");
  }
}
