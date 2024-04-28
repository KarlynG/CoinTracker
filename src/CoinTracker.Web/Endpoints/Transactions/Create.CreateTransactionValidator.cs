using CoinTracker.UseCases.Transaction.Create.Dtos;
using FastEndpoints;
using FluentValidation;

namespace CoinTracker.Web.Endpoints.Transactions;

public class CreateTransactionValidator : Validator<CreateTransactionDto>
{
  public CreateTransactionValidator()
  {
    RuleFor(x => x.UserId)
      .NotEmpty()
      .WithMessage("UserId is required.");

    RuleFor(x => x.BudgetId)
      .NotEmpty()
      .WithMessage("BudgetId is required.");

    RuleFor(x => x.Amount)
      .NotEmpty()
      .WithMessage("Amount is required.");

    RuleFor(x => x.Category)
      .NotNull()
      .WithMessage("Category is required.");

    RuleFor(x => x.Description)
      .NotEmpty()
      .WithMessage("Description is required.");
  }
}
