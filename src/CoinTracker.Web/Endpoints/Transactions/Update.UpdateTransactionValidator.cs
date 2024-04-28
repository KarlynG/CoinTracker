using FastEndpoints;
using FluentValidation;

namespace CoinTracker.Web.Endpoints.Transactions;

public class UpdateTransactionValidator : Validator<UpdateTransactionRequest>
{
  public UpdateTransactionValidator()
  {
    RuleFor(x => x.Transaction)
     .NotEmpty()
     .WithMessage("Transaction is required.");

    RuleFor(x => x.Transaction.Id)
      .NotEmpty()
      .WithMessage("TransactionId is required.");

    RuleFor(x => x.Transaction.Amount)
      .NotEmpty()
      .WithMessage("Amount is required.");

    RuleFor(x => x.Transaction.Currency)
      .NotNull()
      .WithMessage("Currency is required.");

    RuleFor(x => x.Transaction.Description)
      .NotEmpty()
      .WithMessage("Description is required.");

    RuleFor(x => x.Transaction.Date)
      .NotEmpty()
      .WithMessage("Date is required.");

    RuleFor(x => x.Transaction.Category)
      .NotNull()
      .WithMessage("Category is required.");
  }
}

