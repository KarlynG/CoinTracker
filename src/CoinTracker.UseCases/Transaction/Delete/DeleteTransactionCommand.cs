using Ardalis.Result;
using Ardalis.SharedKernel;

namespace CoinTracker.UseCases.Transaction.Delete;
public record DeleteTransactionCommand(Guid TransactionId) : ICommand<Result>;
