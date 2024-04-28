using Ardalis.Result;

namespace CoinTracker.Core.Interfaces;
public interface ITransactionService
{
  Task<Result<bool>> CheckIfTransactionIsAssociatedWithUser(Guid transactionId, Guid userId, CancellationToken cancellationToken);
}
