using FastEndpoints;
using FluentValidation;

namespace CoinTracker.Web.Endpoints.Transactions;

public class DeleteTransactionValidator : Validator<DeleteTransactionRequest>
{
  public DeleteTransactionValidator()
  {
    RuleFor(x => x.TransactionId)
      .NotEmpty();
  }
}

